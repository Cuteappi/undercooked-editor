<script lang="ts">
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import { ContextMenuShortcut } from "$lib/components/ui/context-menu";
</script>

<ContextMenu.Root>
    <ContextMenu.Trigger>
        <slot />
    </ContextMenu.Trigger>
    <ContextMenu.Content class="context-menu-content">
        <ContextMenu.Item class="context-menu-item">
            New Text File
            <ContextMenuShortcut>Ctrl+N</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">
            New File...
            <ContextMenuShortcut>Ctrl+Alt+Windows+N</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">
            New Window
            <ContextMenuShortcut>Ctrl+Shift+N</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Sub>
            <ContextMenu.SubTrigger class="context-menu-sub-trigger"
                >New Window with Profile</ContextMenu.SubTrigger
            >
            <ContextMenu.SubContent class="context-menu-sub-content">
                <ContextMenu.Item class="context-menu-item">Default Profile</ContextMenu.Item>
            </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator class="context-menu-separator" />

        <ContextMenu.Item class="context-menu-item">
            Open File...
            <ContextMenuShortcut>Ctrl+O</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">
            Open Folder...
            <ContextMenuShortcut>Ctrl+K Ctrl+O</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">Open Workspace from File...</ContextMenu.Item>
        <ContextMenu.Sub>
            <ContextMenu.SubTrigger class="context-menu-sub-trigger">Open Recent</ContextMenu.SubTrigger>
            <ContextMenu.SubContent class="context-menu-sub-content">
                <ContextMenu.Item class="context-menu-item">Recent Files</ContextMenu.Item>
            </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator class="context-menu-separator" />

        <ContextMenu.Item class="context-menu-item">Add Folder to Workspace...</ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">Save Workspace As...</ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">Duplicate Workspace</ContextMenu.Item>

        <ContextMenu.Separator class="context-menu-separator" />

        <ContextMenu.Item class="context-menu-item">
            Save
            <ContextMenuShortcut>Ctrl+S</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">
            Save As...
            <ContextMenuShortcut>Ctrl+Shift+S</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item text-muted-foreground">
            Save All
            <ContextMenuShortcut>Ctrl+K S</ContextMenuShortcut>
        </ContextMenu.Item>

        <ContextMenu.Separator class="context-menu-separator" />

        <ContextMenu.Sub>
            <ContextMenu.SubTrigger class="context-menu-sub-trigger">Share</ContextMenu.SubTrigger>
            <ContextMenu.SubContent class="context-menu-sub-content">
                <ContextMenu.Item class="context-menu-item">Share Link</ContextMenu.Item>
            </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Item class="context-menu-item">Auto Save</ContextMenu.Item>

        <ContextMenu.Sub>
            <ContextMenu.SubTrigger class="context-menu-sub-trigger">Preferences</ContextMenu.SubTrigger>
            <ContextMenu.SubContent class="context-menu-sub-content">
                <ContextMenu.Item class="context-menu-item">Settings</ContextMenu.Item>
            </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator class="context-menu-separator" />

        <ContextMenu.Item class="context-menu-item">Revert File</ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">
            Close Editor
            <ContextMenuShortcut>Ctrl+F4</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">
            Close Folder
            <ContextMenuShortcut>Ctrl+K F</ContextMenuShortcut>
        </ContextMenu.Item>
        <ContextMenu.Item class="context-menu-item">
            Close Window
            <ContextMenuShortcut>Alt+F4</ContextMenuShortcut>
        </ContextMenu.Item>

        <ContextMenu.Separator class="context-menu-separator" />

        <ContextMenu.Item class="context-menu-item">Exit</ContextMenu.Item>
    </ContextMenu.Content>
</ContextMenu.Root>

<style>
    :global(.context-menu-content) {
        background-color: rgb(45, 45, 45);
        color: rgb(204, 204, 204);
        border: none;
        padding: 6px 0;
        min-width: 280px;
    }

    :global(.context-menu-item) {
        padding: 6px 16px;
        font-size: 13px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
        margin: 2px 0;
    }

    :global(.context-menu-item[data-disabled]) {
        color: rgb(153, 153, 153);
    }

    :global(.context-menu-item:hover:not([data-disabled])) {
        background-color: rgb(9, 71, 113);
        color: rgb(255, 255, 255);
    }

    :global(.context-menu-item:hover:not([data-disabled]) .context-menu-shortcut) {
        color: rgb(255, 255, 255);
    }

    :global(.context-menu-separator) {
        background-color: rgb(80, 80, 80);
        margin: 4px 0;
        height: 1px;
    }

    :global(.context-menu-shortcut) {
        color: rgb(153, 153, 153);
        font-size: 13px;
        margin-left: auto;
    }

    :global(.context-menu-sub-trigger) {
        padding: 6px 16px;
        font-size: 13px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    :global(.context-menu-sub-trigger:hover) {
        background-color: rgb(9, 71, 113);
        color: rgb(255, 255, 255);
    }

    :global(.context-menu-sub-content) {
        background-color: rgb(45, 45, 45);
        color: rgb(204, 204, 204);
        border: none;
        padding: 4px 0;
        margin-left: 1px;
    }
</style>
