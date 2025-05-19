<script lang="ts">
    import { onMount } from "svelte";
    import { Terminal } from "@xterm/xterm";
    import { FitAddon } from "@xterm/addon-fit";
    import "@xterm/xterm/css/xterm.css";
    import ANSII from "figlet/importable-fonts/ANSI Shadow.js";

    import figlet from "figlet";

    figlet.parseFont("ANSI Shadow", ANSII);

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

        terminal.writeln("\n \n");

        // Ensure terminal is ready before writing
        figlet.text(
            "Undercooked\nEditor",
            {
                font: "ANSI Shadow",
                horizontalLayout: "full",
                width: terminal.cols,
                whitespaceBreak: false,
            },
            (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Write each line of the ASCII art
                const lines = data!.split("\n");
                lines.forEach((line) => {
                    terminal.writeln(line);
                });
            }
        );

        return () => {
            terminal.dispose();
            resizeObserver.disconnect();
        };
    });
</script>

<div class="terminal-wrapper">
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
