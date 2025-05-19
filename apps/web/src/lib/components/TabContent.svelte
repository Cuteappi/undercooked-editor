<script lang="ts">
    import { tabState } from "../State/TabState.svelte";
    import MonacoEditor from "./MonacoEditor.svelte";
    import WelcomeSplashScreen from "./WelcomeSplashScreen.svelte";
    import { inferLanguage } from "../utils/inferLanguage";
    import { ws } from "../utils/websocket";

    $effect(() => {
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "open") {
                tabState.checkIfTabExists(data.data);
            }
        };
    });
</script>

{#if tabState.active.id === "Welcome"}
    <WelcomeSplashScreen />
{:else}
    <MonacoEditor
        language={inferLanguage(tabState.active.title)}
        theme="vs-dark"
        value={tabState.active.content}
    />
{/if}
