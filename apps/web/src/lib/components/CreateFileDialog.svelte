<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { tabState } from "../State/TabState.svelte";

    export let open = false;
    let fileName = "";

    function handleSubmit() {
        if (fileName.trim()) {
            tabState.addTab(fileName, `/src/${fileName}`);
            fileName = "";
            open = false;
        }
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Portal>
        <Dialog.Overlay
            class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in-0 duration-100"
        />
        <Dialog.Content
            class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[#1e1e1e] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg"
        >
            <Dialog.Header>
                <Dialog.Title class="text-lg font-semibold text-white">Create New File</Dialog.Title>
                <Dialog.Description class="text-sm text-gray-400">
                    Enter the name of your new file below.
                </Dialog.Description>
            </Dialog.Header>

            <form
                class="flex flex-col gap-4"
                on:submit|preventDefault={handleSubmit}
            >
                <div class="grid gap-2">
                    <label
                        for="fileName"
                        class="text-sm font-medium text-gray-200"
                    >
                        File Name
                    </label>
                    <input
                        id="fileName"
                        bind:value={fileName}
                        class="flex h-10 w-full rounded-lg border border-gray-600 bg-[#2d2d2d] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="example.ts"
                    />
                </div>

                <Dialog.Footer class="flex justify-end gap-3">
                    <Dialog.Close
                        class="inline-flex h-10 items-center justify-center rounded-lg bg-[#2d2d2d] px-4 py-2 text-sm font-medium text-gray-200 ring-offset-background transition-colors hover:bg-[#3d3d3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Cancel
                    </Dialog.Close>
                    <button
                        type="submit"
                        class="inline-flex h-10 items-center justify-center rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 ring-offset-background transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Create
                    </button>
                </Dialog.Footer>
            </form>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
