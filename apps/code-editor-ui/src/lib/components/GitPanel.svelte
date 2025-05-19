<script lang="ts">
    import { onMount } from "svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input"; // If you need simple input fields
    import { Textarea } from "$lib/components/ui/textarea";
    import * as Accordion from "$lib/components/ui/accordion";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Badge } from "$lib/components/ui/badge";

    // Icons (you might need to install lucide-svelte: npm install lucide-svelte)
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import GitCommitVertical from "lucide-svelte/icons/git-commit-vertical";
    import GitMerge from "lucide-svelte/icons/git-merge"; // For branches/sync
    import RotateCcw from "lucide-svelte/icons/rotate-ccw"; // For refresh
    import Plus from "lucide-svelte/icons/plus";
    import Minus from "lucide-svelte/icons/minus";
    import Trash2 from "lucide-svelte/icons/trash-2";

    // Mock data - replace with actual Git data later
    let stagedFiles = [
        { id: "1", path: "src/lib/components/FileA.svelte", status: "M" },
        { id: "2", path: "src/App.svelte", status: "A" },
    ];
    let unstagedFiles = [
        { id: "3", path: "src/lib/utils.ts", status: "M" },
        { id: "4", path: "README.md", status: "D" }, // D for Deleted
    ];
    let untrackedFiles = [{ id: "5", path: "new-feature.ts", status: "??" }];

    let commitMessage = "";
    let currentBranch = "main";
    let isLoading = true;

    onMount(async () => {
        // Simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 700));
        isLoading = false;
        // In a real app, you'd call your Git service here
    });

    function getStatusBadgeInfo(status: string): {
        letter: string;
        variant: "default" | "destructive" | "secondary" | "outline";
        tooltip: string;
    } {
        switch (status) {
            case "A":
                return { letter: "A", variant: "default", tooltip: "Added" };
            case "M":
                return { letter: "M", variant: "secondary", tooltip: "Modified" };
            case "D":
                return { letter: "D", variant: "destructive", tooltip: "Deleted" };
            case "??":
                return { letter: "U", variant: "outline", tooltip: "Untracked" };
            default:
                return { letter: status, variant: "outline", tooltip: "Changed" };
        }
    }

    // Placeholder actions
    const handleStage = (fileId: string) => console.log("Stage:", fileId);
    const handleUnstage = (fileId: string) => console.log("Unstage:", fileId);
    const handleDiscard = (fileId: string) => console.log("Discard:", fileId);
    const handleCommit = () => {
        if (!commitMessage.trim()) return;
        console.log("Committing to", currentBranch, ":", commitMessage);
        commitMessage = ""; // Clear message
    };
</script>

<div class="flex flex-col h-full text-sm">
    <!-- Header: Branch and Actions -->
    <div class="flex items-center justify-between p-2 border-b">
        <Button
            variant="ghost"
            size="sm"
            class="flex items-center"
        >
            <GitMerge class="w-4 h-4 mr-2" />
            <span>{currentBranch}</span>
        </Button>
        <div class="flex items-center space-x-1">
            <Button
                variant="ghost"
                size="icon"
                title="Refresh Status"
                onclick={() => {
                    isLoading = true;
                }}
            >
                <RotateCcw class="w-4 h-4" />
            </Button>
            <!-- Add more actions like Pull, Push, etc. -->
        </div>
    </div>

    <!-- Commit Area -->
    <div class="p-2 border-b">
        <Textarea
            placeholder="Commit message (Ctrl+Enter to commit)"
            bind:value={commitMessage}
            rows={3}
            class="mb-2 w-full"
            on:keydown={(e) => {
                if (e.ctrlKey && e.key === "Enter") handleCommit();
            }}
        />
        <Button
            onclick={handleCommit}
            disabled={!commitMessage.trim() || isLoading}
            class="w-full"
        >
            Commit to {currentBranch}
        </Button>
    </div>

    <!-- File Changes Sections -->
    {#if isLoading}
        <div class="flex-1 flex items-center justify-center p-4">Loading changes...</div>
    {:else}
        <ScrollArea class="flex-1">
            <Accordion.Root
                type="multiple"
                class="w-full"
                value={["changes", "staged"]}
            >
                {#if stagedFiles.length > 0}
                    <Accordion.Item value="staged">
                        <Accordion.Trigger class="px-2 py-1.5 text-xs font-medium"
                            >Staged Changes ({stagedFiles.length})</Accordion.Trigger
                        >
                        <Accordion.Content class="text-xs">
                            <ul class="divide-y divide-border">
                                {#each stagedFiles as file (file.id)}
                                    <li class="flex items-center justify-between p-1.5 group hover:bg-muted">
                                        <span
                                            class="truncate"
                                            title={file.path}>{file.path}</span
                                        >
                                        <div class="flex items-center space-x-1">
                                            <Badge
                                                variant={getStatusBadgeInfo(file.status).variant}
                                                class="px-1.5 py-0.5 text-xs"
                                                title={getStatusBadgeInfo(file.status).tooltip}
                                                >{getStatusBadgeInfo(file.status).letter}</Badge
                                            >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                title="Unstage File"
                                                onclick={() => handleUnstage(file.id)}
                                                class="opacity-0 group-hover:opacity-100"
                                            >
                                                <Minus class="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </li>
                                {/each}
                            </ul>
                        </Accordion.Content>
                    </Accordion.Item>
                {/if}

                {#if unstagedFiles.length > 0}
                    <Accordion.Item value="changes">
                        <Accordion.Trigger class="px-2 py-1.5 text-xs font-medium"
                            >Changes ({unstagedFiles.length})</Accordion.Trigger
                        >
                        <Accordion.Content class="text-xs">
                            <ul class="divide-y divide-border">
                                {#each unstagedFiles as file (file.id)}
                                    <li class="flex items-center justify-between p-1.5 group hover:bg-muted">
                                        <span
                                            class="truncate"
                                            title={file.path}>{file.path}</span
                                        >
                                        <div class="flex items-center space-x-1">
                                            <Badge
                                                variant={getStatusBadgeInfo(file.status).variant}
                                                class="px-1.5 py-0.5 text-xs"
                                                title={getStatusBadgeInfo(file.status).tooltip}
                                                >{getStatusBadgeInfo(file.status).letter}</Badge
                                            >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                title="Stage File"
                                                onclick={() => handleStage(file.id)}
                                                class="opacity-0 group-hover:opacity-100"
                                            >
                                                <Plus class="w-3.5 h-3.5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                title="Discard Changes"
                                                onclick={() => handleDiscard(file.id)}
                                                class="opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 class="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </li>
                                {/each}
                            </ul>
                        </Accordion.Content>
                    </Accordion.Item>
                {/if}

                {#if untrackedFiles.length > 0}
                    <Accordion.Item value="untracked">
                        <Accordion.Trigger class="px-2 py-1.5 text-xs font-medium"
                            >Untracked ({untrackedFiles.length})</Accordion.Trigger
                        >
                        <Accordion.Content class="text-xs">
                            <ul class="divide-y divide-border">
                                {#each untrackedFiles as file (file.id)}
                                    <li class="flex items-center justify-between p-1.5 group hover:bg-muted">
                                        <span
                                            class="truncate"
                                            title={file.path}>{file.path}</span
                                        >
                                        <div class="flex items-center space-x-1">
                                            <Badge
                                                variant={getStatusBadgeInfo(file.status).variant}
                                                class="px-1.5 py-0.5 text-xs"
                                                title={getStatusBadgeInfo(file.status).tooltip}
                                                >{getStatusBadgeInfo(file.status).letter}</Badge
                                            >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                title="Stage File"
                                                onclick={() => handleStage(file.id)}
                                                class="opacity-0 group-hover:opacity-100"
                                            >
                                                <Plus class="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </li>
                                {/each}
                            </ul>
                        </Accordion.Content>
                    </Accordion.Item>
                {/if}

                {#if !isLoading && stagedFiles.length === 0 && unstagedFiles.length === 0 && untrackedFiles.length === 0}
                    <div class="p-4 text-center text-muted-foreground text-xs">No changes detected.</div>
                {/if}
            </Accordion.Root>
        </ScrollArea>
    {/if}
</div>

<style lang="pcss">
    :global(button[size="sm"]) {
        @apply h-6 w-6 p-0 flex items-center justify-center;
    }
</style>
