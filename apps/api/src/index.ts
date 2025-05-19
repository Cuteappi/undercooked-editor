import http from "node:http";
import { WebSocketServer } from "ws";
import { IDisposable, spawn } from "node-pty";
import { createServer } from "./server";
import fs from "node:fs";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;
const app = createServer();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const shell = process.platform === "win32" ? "cmd.exe" : "bash";
let mainSender: IDisposable;

wss.on("connection", (ws) => {
	const ptyProcess = spawn(shell, [], {
		name: "xterm-color",
		env: process.env,
		cwd: process.env.HOME || process.env.USERPROFILE,
	});

	ptyProcess.write("cd playground\n");

	ws.on("message", (message) => {
		console.log(`received: ${message}`);

		const data = JSON.parse(message.toString());

		if (data.type === "command") {
			ptyProcess.write(data.data);
		} else if (data.type === "newfile") {
			ptyProcess.write(`touch ${data.data}\n`);
		}
	});

	ws.on("close", () => {
		console.log("closed ws");
	});

	mainSender = ptyProcess.onData((data) => {
		if (data.startsWith("open")) {
			if (!mainSender) return;
			mainSender.dispose();
			mainSender = ptyProcess.onData((newdata) => {
				ws.send(
					JSON.stringify({
						type: "open",
						data: [
							data.split(" ")[1].concat("\n").concat(newdata),
							fs.readFileSync(newdata, "utf-8"),
						],
					}),
				);
			});
			ptyProcess.write("pwd\n");
			mainSender.dispose();
			mainSender = ptyProcess.onData((msg) => {
				const message = JSON.stringify({
					type: "data",
					data: msg,
				});

				ws.send(message);
			});
		}
		const message = JSON.stringify({
			type: "data",
			data,
		});

		ws.send(message);
	});
});

server.listen(port, () => {
	console.log(`api running on ${port}`);
});
