<script lang="ts">
    import { X } from "lucide-svelte";
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import * as Tabs from "$lib/components/ui/tabs";

    export let tabs: { id: string; title: string; path: string; isModified: boolean }[] = [];
    export let activeTabId: string | undefined = undefined;

    function closeTab(id: string, event?: Event) {
        if (event) event.stopPropagation();
        const index = tabs.findIndex((tab) => tab.id === id);
        if (index !== -1) {
            tabs = tabs.filter((tab) => tab.id !== id);
            if (activeTabId === id) {
                activeTabId = tabs[Math.min(index, tabs.length - 1)]?.id;
            }
        }
    }
</script>

<div class="flex flex-col h-full">
    <Tabs.Root
        bind:value={activeTabId}
        class="h-full"
    >
        <div class="border-b border-[#333] overflow-x-auto">
            <Tabs.List class="flex h-[35px] bg-[#252526] min-w-max">
                {#each tabs as tab (tab.id)}
                    <ContextMenu.Root>
                        <ContextMenu.Trigger>
                            <Tabs.Trigger
                                value={tab.id}
                                class="group relative flex h-[35px] min-w-[140px] max-w-[200px] items-center border-r border-[#333] bg-[#252526] px-3 text-[13px] text-[#969696] outline-none transition-colors hover:bg-[#2a2a2a] data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-white"
                            >
                                <div class="flex w-full items-center gap-2">
                                    <span class="truncate">{tab.title}</span>
                                    {#if tab.isModified}
                                        <span class="text-xs text-[#969696] shrink-0">●</span>
                                    {/if}
                                </div>
                                <button
                                    type="button"
                                    class="ml-2 shrink-0 rounded p-0.5 opacity-0 transition-opacity hover:bg-[#333] group-hover:opacity-100"
                                    on:click={(e) => closeTab(tab.id, e)}
                                    aria-label="Close {tab.title}"
                                >
                                    <X class="h-3 w-3" />
                                </button>
                            </Tabs.Trigger>
                        </ContextMenu.Trigger>
                        <ContextMenu.Content
                            class="min-w-[200px] rounded-md bg-[#2d2d2d] p-1 text-[13px] text-[#cccccc] shadow-md"
                        >
                            <ContextMenu.Item
                                class="flex h-8 cursor-default items-center justify-between rounded px-2 outline-none transition-colors hover:bg-[#094771] hover:text-white"
                                onselect={() => closeTab(tab.id)}
                            >
                                Close
                                <span class="text-xs text-[#858585]">Ctrl+W</span>
                            </ContextMenu.Item>
                            <ContextMenu.Item
                                class="flex h-8 cursor-default items-center rounded px-2 outline-none transition-colors hover:bg-[#094771] hover:text-white"
                            >
                                Close Others
                            </ContextMenu.Item>
                            <ContextMenu.Item
                                class="flex h-8 cursor-default items-center rounded px-2 outline-none transition-colors hover:bg-[#094771] hover:text-white"
                            >
                                Close to the Right
                            </ContextMenu.Item>
                            <ContextMenu.Item
                                class="flex h-8 cursor-default items-center rounded px-2 outline-none transition-colors hover:bg-[#094771] hover:text-white"
                            >
                                Close All
                            </ContextMenu.Item>
                            <ContextMenu.Separator class="my-1 h-px bg-[#505050]" />
                            <ContextMenu.Item
                                class="flex h-8 cursor-default items-center rounded px-2 outline-none transition-colors hover:bg-[#094771] hover:text-white"
                            >
                                Copy Path
                            </ContextMenu.Item>
                            <ContextMenu.Item
                                class="flex h-8 cursor-default items-center rounded px-2 outline-none transition-colors hover:bg-[#094771] hover:text-white"
                            >
                                Copy Relative Path
                            </ContextMenu.Item>
                            <ContextMenu.Item
                                class="flex h-8 cursor-default items-center rounded px-2 outline-none transition-colors hover:bg-[#094771] hover:text-white"
                            >
                                Reveal in File Explorer
                            </ContextMenu.Item>
                        </ContextMenu.Content>
                    </ContextMenu.Root>
                {/each}
            </Tabs.List>
        </div>
        <Tabs.Content
            value={activeTabId!}
            class="flex-1 outline-none bg-[#1e1e1e]"
        >
            <slot />
        </Tabs.Content>
    </Tabs.Root>
</div>
