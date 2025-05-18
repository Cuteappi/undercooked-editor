<script lang="ts">
    import { ResizablePaneGroup, ResizablePane, ResizableHandle } from "$lib/components/ui/resizable";
    import CustomSideBar from "./CustomSideBar.svelte";
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
        <CustomSideBar />
    </ResizablePane>

    <ResizableHandle />

    <ResizablePane defaultSize={75}>
        <ResizablePaneGroup direction="vertical">
            <ResizablePane defaultSize={65}>
                <div class="flex h-auto items-center justify-center p-6">
                    <span class="font-semibold">Two</span>
                </div>
            </ResizablePane>
            <ResizableHandle />
            <ResizablePane defaultSize={35}>
                <div class="flex h-auto items-center justify-center p-6">
                    <span class="font-semibold">Three</span>
                </div>
            </ResizablePane>
        </ResizablePaneGroup>
    </ResizablePane>
</ResizablePaneGroup>
