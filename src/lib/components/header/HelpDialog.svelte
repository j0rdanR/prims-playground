<script lang="ts">
  import { createDialog, melt } from '@melt-ui/svelte';
  import { X, HelpCircle } from 'lucide-svelte';
  import IconButton from '../ui/IconButton.svelte';
  import { fade, fly, blur } from 'svelte/transition';
 
  const {
    elements: {
      trigger,
      overlay,
      content,
      title,
      description,
      close,
      portalled,
    },
    states: { open },
  } = createDialog();
</script>

<div use:melt={$trigger}>
  <IconButton
    icon={HelpCircle}
    tooltip="Help"
  />
</div>
 
<div use:melt={$portalled}>
  {#if $open}
    <div use:melt={$overlay} class="fixed inset-0 z-50 backdrop-blur bg-black/50" transition:blur={{amount: 2}} />

    <div use:melt={$content} class="dialog-content-container" transition:fly={{duration: 250, y: -10}}>
      <h2 use:melt={$title} class="text-xl font-semibold tracking-tight">
        Help and Information
      </h2>
      <p use:melt={$description} class="mb-5 mt-1 leading-normal text-gray-600">
        Make changes to your profile here. Click save when you're done.
      </p>
 
      
      <div class="mt-6 flex justify-end gap-4">
        <button class="btn border text-sm rounded-lg text-gray-600" use:melt={$close}>Close</button>
      </div>

      <button
        use:melt={$close}
        aria-label="close"
        class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
                items-center justify-center rounded-full p-1 text-gray-800
                hover:bg-gray-100 focus:shadow-gray-400"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  {/if}
</div>