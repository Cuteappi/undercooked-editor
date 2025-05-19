<script lang="ts">
    import { tabState } from "../State/TabState.svelte";
    import CreateFileDialog from "./CreateFileDialog.svelte";
    import { X, Plus } from "@lucide/svelte";

    let dialogOpen = false;
</script>

<div class="tab-bar">
    {#each tabState.Tabs as tab}
        <button
            type="button"
            class="tab {tabState.active.id === tab.id ? 'active' : ''}"
            on:click={() => tabState.makeActive(tab.id)}
            role="tab"
            aria-selected={tabState.active.id === tab.id}
        >
            <span class="tab-title">{tab.title}</span>
            {#if tab.id !== "Welcome"}
                <span
                    class="close-button"
                    on:click|stopPropagation={() => tabState.removeTab(tab.id)}
                    on:keydown|stopPropagation={(e) => e.key === "Enter" && tabState.makeActive(tab.id)}
                    role="button"
                    tabindex="0"
                    aria-label="Close tab"
                >
                    <X size="14" />
                </span>
            {/if}
        </button>
    {/each}
    <button
        type="button"
        class="add-tab-button"
        on:click={() => (dialogOpen = true)}
        aria-label="Add new tab"
    >
        <Plus size="16" />
    </button>
</div>

<CreateFileDialog bind:open={dialogOpen} />

<style>
    .tab-bar {
        display: flex;
        height: 35px;
        background-color: #252526;
        border-bottom: 1px solid #1e1e1e;
        overflow-x: auto;
        scrollbar-width: none;
        position: relative;
    }

    .add-tab-button {
        position: sticky;
        right: 0;
        top: 0;
        background-color: #252526;
        border: none;
        padding: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-tab-button:hover {
        background-color: #2a2a2a;
    }

    .tab-bar {
        display: flex;
        height: 35px;
        background-color: #252526;
        border-bottom: 1px solid #1e1e1e;
        overflow-x: auto;
        scrollbar-width: none;
    }

    .tab-bar::-webkit-scrollbar {
        display: none;
    }

    .tab {
        display: flex;
        align-items: center;
        min-width: 120px;
        max-width: 200px;
        height: 100%;
        padding: 0 8px;
        background-color: #2d2d2d;
        border-right: 1px solid #1e1e1e;
        color: #969696;
        font-size: 13px;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.1s ease;
    }

    .tab:hover {
        background-color: #2a2a2a;
    }

    .tab.active {
        background-color: #1e1e1e;
        color: #ffffff;
        border-top: 1px solid #007acc;
        margin-top: -1px;
    }

    .tab-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 4px;
    }

    .close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        padding: 0;
        margin-left: 4px;
        border: none;
        background: transparent;
        border-radius: 3px;
        opacity: 0.7;
        cursor: pointer;
    }

    .close-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
        opacity: 1;
    }

    /* Hover state for close button */
    .tab:hover .close-button {
        opacity: 0.8;
    }

    .tab.active .close-button {
        opacity: 0.9;
    }
</style>
