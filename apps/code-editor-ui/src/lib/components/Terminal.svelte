<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Terminal as Xterm } from "@xterm/xterm";
    import { FitAddon } from "@xterm/addon-fit";
    import { WebLinksAddon } from "@xterm/addon-web-links";
    import { Plus, X } from "lucide-svelte";

    let terminalContainer: HTMLElement;
    let terminals: { id: number; name: string; terminal: Xterm; fitAddon: FitAddon }[] = [];
    let activeTerminalId = 0;
    let nextTerminalId = 1;

    function createTerminal() {
        const terminal = new Xterm({
            theme: {
                background: "#1e1e1e",
                foreground: "#d4d4d4",
                cursor: "#d4d4d4",
                cursorAccent: "#1e1e1e",
            },
            fontSize: 14,
            fontFamily: "Consolas, 'Courier New', monospace",
            cursorBlink: true,
            cursorStyle: "block",
        });

        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.loadAddon(new WebLinksAddon());

        const id = nextTerminalId++;
        terminals = [
            ...terminals,
            {
                id,
                name: `Terminal ${id}`,
                terminal,
                fitAddon,
            },
        ];
        activeTerminalId = id;

        // Wait for the next tick to ensure the DOM is updated
        setTimeout(() => {
            const element = document.getElementById(`terminal-${id}`);
            if (element) {
                terminal.open(element);
                fitAddon.fit();
                terminal.focus();
                terminal.write("\x1b[1;32m$ \x1b[0m");
                
                // Handle keyboard input
                terminal.onData((data) => {
                    terminal.write(data);
                });
            }
        });
    }

    function closeTerminal(id: number) {
        const index = terminals.findIndex((t) => t.id === id);
        if (index !== -1) {
            terminals[index].terminal.dispose();
            terminals = terminals.filter((t) => t.id !== id);
            if (activeTerminalId === id) {
                activeTerminalId = terminals.length > 0 ? terminals[terminals.length - 1].id : 0;
            }
        }
    }

    function switchTerminal(id: number) {
        activeTerminalId = id;
        // Ensure proper sizing after switching
        setTimeout(() => {
            const terminal = terminals.find((t) => t.id === id);
            if (terminal) {
                terminal.fitAddon.fit();
                terminal.terminal.focus();
            }
        });
    }

    // Create initial terminal
    onMount(() => {
        createTerminal();

        // Handle window resize
        const resizeObserver = new ResizeObserver(() => {
            terminals.forEach(({ fitAddon }) => fitAddon.fit());
        });

        if (terminalContainer) {
            resizeObserver.observe(terminalContainer);
        }

        return () => {
            resizeObserver.disconnect();
        };
    });

    onDestroy(() => {
        terminals.forEach(({ terminal }) => terminal.dispose());
    });
</script>

<div
    class="flex h-full flex-col"
    bind:this={terminalContainer}
>
    <!-- Terminal tabs -->
    <div class="flex items-center border-b border-[#333] bg-[#252526] px-2">
        {#each terminals as { id, name }}
            <div
                class="group flex items-center gap-2 px-3 py-1 cursor-pointer {activeTerminalId === id
                    ? 'bg-[#1e1e1e] text-white'
                    : 'text-[#969696] hover:bg-[#2a2a2a]'}"
                on:click={() => switchTerminal(id)}
                on:keydown={e => e.key === 'Enter' && switchTerminal(id)}
                role="tab"
                tabindex="0"
                aria-selected={activeTerminalId === id}
            >
                <span>{name}</span>
                <div
                    class="opacity-0 group-hover:opacity-100"
                    on:click|stopPropagation={() => closeTerminal(id)}
                    on:keydown|stopPropagation={e => e.key === 'Enter' && closeTerminal(id)}
                    role="button"
                    tabindex="0"
                    aria-label="Close terminal {name}"
                >
                    <X class="h-3 w-3" />
                </div>
            </div>
        {/each}
        <button
            class="ml-1 p-1 text-[#969696] hover:bg-[#2a2a2a]"
            on:click={createTerminal}
        >
            <Plus class="h-4 w-4" />
        </button>
    </div>

    <!-- Terminal instances -->
    <div class="relative flex-1">
        {#each terminals as { id }}
            <div
                id="terminal-{id}"
                class="absolute inset-0 {activeTerminalId === id ? 'block' : 'hidden'}"
            ></div>
        {/each}
    </div>
</div>

<style>
    :global(.xterm) {
        padding: 8px;
    }
    :global(.xterm-viewport) {
        overflow-y: auto !important;
    }
</style>
