<script lang="ts">
    import {
        Sidebar,
        SidebarContent,
        SidebarHeader,
        SidebarMenu,
        SidebarMenuItem,
        SidebarMenuButton,
        SidebarProvider,
    } from "$lib/components/ui/sidebar";
    import * as Tabs from "$lib/components/ui/tabs";
    import GitPanel from "./GitPanel.svelte";

    const items = [
        { name: "Item 1", qty: 1 },
        { name: "Item 2", qty: 2 },
        { name: "Item 3", qty: 3 },
    ];
</script>

<SidebarProvider
    class="flex h-auto min-h-full"
    style="--sidebar-width: 100%;"
>
    <Sidebar
        collapsible="none"
        class="flex-auto h-auto"
    >
        <Tabs.Root
            value="File Explorer"
            class="flex-auto"
        >
            <SidebarHeader>
                <Tabs.List>
                    <Tabs.Trigger value="File Explorer">File Explorer</Tabs.Trigger>
                    <Tabs.Trigger value="Git">Git</Tabs.Trigger>
                </Tabs.List>
            </SidebarHeader>

            <Tabs.Content value="File Explorer">
                <SidebarContent class="flex-auto items-center justify-center">
                    <SidebarMenu>
                        {#each items as item}
                            <SidebarMenuItem>
                                <SidebarMenuButton>{item.name} x {item.qty}</SidebarMenuButton>
                            </SidebarMenuItem>
                        {/each}
                    </SidebarMenu>
                </SidebarContent>
            </Tabs.Content>

            <Tabs.Content value="Git">
                <SidebarContent class="flex-auto items-center justify-center"><GitPanel /></SidebarContent>
            </Tabs.Content>
        </Tabs.Root>
    </Sidebar>
</SidebarProvider>

<style lang="pcss">
</style>
