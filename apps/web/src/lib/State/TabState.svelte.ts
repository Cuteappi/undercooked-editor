import { Guid } from "guid-typescript";
import { ws } from "../utils/websocket";

type Id = Guid | "Welcome";
class Tab {
	id: Id;
	title: string;
	path: string;
	content: string;

	constructor(
		id: Id = "Welcome",
		title: string = "Welcome",
		path: string = "",
		content: string = "",
	) {
		this.id = id;
		this.title = title;
		this.path = path;
		this.content = content;
	}
}

const DefaultTab = new Tab("Welcome");

class TabState {
	active: Tab = $state(DefaultTab);
	Tabs: Tab[] = $state([DefaultTab]);

	makeActive(id: Id) {
		this.active = this.Tabs.find((tab) => tab.id === id) || DefaultTab;
	}

	addTab(title: string, path: string, content: string = "") {
		ws.send(
			JSON.stringify({
				type: "newfile",
				data: title,
			}),
		);
		const newTab = new Tab(Guid.create(), title, path);
		this.Tabs.push(newTab);
		this.makeActive(newTab.id);
	}

	// updateContent(id: Id, content: string) {
	// 	const tab = this.Tabs.find((tab) => tab.id === id);
	// 	if (tab) {
	// 		tab.content = content;
	// 		tab.isModified = true;
	// 	}
	// }

	removeTab(id: Id) {
		this.Tabs = this.Tabs.filter((tab) => tab.id !== id);
		if (this.active.id === id) {
			this.makeActive(this.Tabs[this.Tabs.length - 1].id);
		}
	}

	checkIfTabExists(data: any) {
		const title = data[0].split(" ")[0];
		const path = data[0].split(" ")[1];

		const tabExists = this.Tabs.some(
			(tab) => tab.title === title && tab.path === path,
		);
		if (tabExists) {
			this.makeActive(
				this.Tabs.find((tab) => tab.title === title && tab.path === path)!.id,
			);
		} else {
			console.log(title, path, "file doesn't exist");
		}
	}
}

export const tabState = new TabState();
