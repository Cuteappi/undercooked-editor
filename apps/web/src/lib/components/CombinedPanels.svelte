<script lang="ts">
    import { ResizablePaneGroup, ResizablePane, ResizableHandle } from "$lib/components/ui/resizable";
    // import CustomSideBar from "./CustomSideBar.svelte";
    import MonacoEditor from "./MonacoEditor.svelte";
    import XTerminal from "./XTerminal.svelte";
    // import FileContextMenu from "./FileContextMenu.svelte";
    // import TabSystem from "./TabSystem.svelte";
    import TabBar from "./TabBar.svelte";
    import TabContent from "./TabContent.svelte";

    interface EditorTab {
        id: string;
        title: string;
        path: string;
        isModified: boolean;
        active: boolean;
    }
</script>

<ResizablePaneGroup direction="vertical">
    <ResizablePane
        defaultSize={65}
        class="border-none"
    >
        <div class="h-full w-full">
            <TabBar />
            <TabContent />
        </div>
    </ResizablePane>
    <ResizableHandle style="background-color: rgba(255, 255, 255, 0.2); height: 1.5px; border: none;" />
    <ResizablePane
        defaultSize={35}
        class="border-none"
    >
        <XTerminal />
    </ResizablePane>
</ResizablePaneGroup>
