<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as monaco from "monaco-editor";

    let editorContainer: HTMLElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let mounted = false;

    // Props
    export let value = "";
    export let language = "javascript";
    export let theme = "vs-dark";
    export let readOnly = false;

    // Create a store to handle value changes
    $: if (editor && value !== editor.getValue()) {
        editor.setValue(value);
    }

    onMount(() => {
        if (typeof window === "undefined") return;
        mounted = true;

        // Wait for the container to be mounted
        setTimeout(() => {
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
                fontSize: 14,
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
        class="h-full w-full"
    ></div>
{/if}

<style>
    div {
        border: 0px solid var(--border-color, #333);
    }
</style>
