<script lang="ts">
    import { onMount } from "svelte";
    import { Terminal } from "@xterm/xterm";
    import { FitAddon } from "@xterm/addon-fit";
    import "@xterm/xterm/css/xterm.css";
    import TerminalIcon from "@lucide/svelte/icons/terminal";
    import { ws } from "../utils/websocket";

    let terminalElement: HTMLElement;
    let terminal: Terminal;

    onMount(() => {
        terminal = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            fontFamily: '"Cascadia Code", Menlo, monospace',
            scrollOnUserInput: false,
            theme: {
                background: "#1e1e1e",
                foreground: "#d4d4d4",
                cursor: "#d4d4d4",
                selectionBackground: "#264f78",
                black: "#1e1e1e",
                red: "#f44747",
                green: "#6a9955",
                yellow: "#d7ba7d",
                blue: "#569cd6",
                magenta: "#c586c0",
                cyan: "#4ec9b0",
                white: "#d4d4d4",
            },
        });

        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);

        terminal.open(terminalElement);
        fitAddon.fit();

        const resizeObserver = new ResizeObserver(() => {
            fitAddon.fit();
        });
        resizeObserver.observe(terminalElement);

        return () => {
            terminal.dispose();
            resizeObserver.disconnect();
            ws.close();
        };
    });

    $effect(() => {
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "data") terminal.write(data.data);
        };
    });

    $effect(() => {
        if (!terminalElement) return;
        console.log("terminalElement");
        terminal.onKey((e) => {
            ws.send(
                JSON.stringify({
                    type: "command",
                    data: e.key,
                })
            );
        });
    });
</script>

<div class="terminal-wrapper">
    <div class="terminal-header">
        <TerminalIcon size={18} />
        <span>Terminal</span>
    </div>
    <div
        class="terminal-container overflow-y-auto"
        bind:this={terminalElement}
    ></div>
</div>

<style>
    .terminal-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #1e1e1e;
        border-radius: 4px;
        overflow: hidden;
    }

    .terminal-header {
        display: flex;
        align-items: center;
        padding: 8px;
        background-color: #252526;
        color: #d4d4d4;
        font-size: 14px;
    }

    .terminal-header span {
        margin-left: 8px;
    }

    .terminal-container {
        flex-grow: 1;
        padding: 8px;
    }

    .terminal-container::-webkit-scrollbar,
    .terminal-container {
        scrollbar-width: none;
        scrollbar-color: transparent transparent;
    }

    :global(.xterm) {
        height: 100%;
    }
</style>
