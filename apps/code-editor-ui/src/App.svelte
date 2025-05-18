<script lang="ts">
    import "./app.pcss";

    import CombinedPanels from "./lib/components/CombinedPanels.svelte";
    import Menubar from "./lib/components/ui/menubar/menubar.svelte";
    import { SidebarProvider } from "./lib/components/ui/sidebar";
</script>

<main class="h-screen w-screen flex flex-col">
    <Menubar />
    <CombinedPanels />
</main>

<style lang="pcss">
</style>
