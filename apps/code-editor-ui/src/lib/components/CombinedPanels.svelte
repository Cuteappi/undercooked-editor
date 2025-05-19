<script lang="ts">
    import { ResizablePaneGroup, ResizablePane, ResizableHandle } from "$lib/components/ui/resizable";
    import CustomSideBar from "./CustomSideBar.svelte";
    import MonacoEditor from "./MonacoEditor.svelte";
    import Terminal from "./Terminal.svelte";
    import FileContextMenu from "./FileContextMenu.svelte";
    import TabSystem from "./TabSystem.svelte";

    let tabs = [
        { id: '1', title: 'index.ts', path: '/src/index.ts', isModified: false },
        { id: '2', title: 'App.svelte', path: '/src/App.svelte', isModified: true },
        { id: '3', title: 'styles.css', path: '/src/styles.css', isModified: false }
    ];
    let activeTabId = '1';
</script>

<ResizablePaneGroup
    direction="horizontal"
    class="rounded-lg border"
    style="height: auto;"
>
    <ResizablePane
        defaultSize={25}
        maxSize={40}
        minSize={15}
    >
        <FileContextMenu>
            <CustomSideBar />
        </FileContextMenu>
    </ResizablePane>

    <ResizableHandle class="border-none" />

    <ResizablePane defaultSize={75}>
        <ResizablePaneGroup direction="vertical">
            <ResizablePane
                defaultSize={65}
                class="border-none"
            >
                <div class="h-full w-full">
                    <TabSystem bind:tabs bind:activeTabId>
                        <MonacoEditor
                            value="// Write your code here"
                            language="javascript"
                            theme="vs-dark"
                        />
                    </TabSystem>
                </div>
            </ResizablePane>
            <ResizableHandle class="border-none" />
            <ResizablePane
                defaultSize={35}
                class="border-none"
            >
                <Terminal />
            </ResizablePane>
        </ResizablePaneGroup>
    </ResizablePane>
</ResizablePaneGroup>
