<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as monaco from "monaco-editor";
    import { tabState } from "../State/TabState.svelte";

    let editorContainer: HTMLElement | null = $state(null);
    let editor: monaco.editor.IStandaloneCodeEditor;
    let mounted = $state(false);

    // Props
    let { value = "", language = "javascript", theme = "vs-dark", readOnly = false } = $props();

    $effect(() => {
        if (editor && value !== editor.getValue()) {
            editor.setValue(value);
        }
    });

    onMount(() => {
        if (typeof window === "undefined") return;
        mounted = true;

        // Wait for the container to be mounted
        setTimeout(() => {
            if (!editorContainer) return;
            editor = monaco.editor.create(editorContainer, {
                value,
                language,
                theme,
                readOnly,
                automaticLayout: true, // Enable automatic layout adjustments
                minimap: {
                    enabled: true,
                },
                scrollBeyondLastLine: false,
                fontSize: 16,
                lineNumbers: "on",
                roundedSelection: false,
                scrollbar: {
                    useShadows: false,
                    vertical: "visible",
                    horizontal: "visible",
                    verticalScrollbarSize: 10,
                    horizontalScrollbarSize: 10,
                },
            });

            // Handle content changes
            editor.onDidChangeModelContent(() => {
                const newValue = editor.getValue();
                if (value !== newValue) {
                    value = newValue;
                    tabState.active.content = newValue;
                }
            });
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.dispose();
        }
    });
</script>

{#if mounted}
    <div
        bind:this={editorContainer}
        class="h-full w-full pt-3 bg-[#1e1e1e]"
    ></div>
{/if}

<style>
    div {
        border: 0px solid var(--border-color, #333);
    }
</style>
