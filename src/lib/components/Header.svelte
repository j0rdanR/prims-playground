<script>
  import { Download, HelpCircle, X } from 'lucide-svelte';
  import { createDialog, melt } from '@melt-ui/svelte';
  import Shortcut from './ui/Shortcut.svelte';

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

  // export let cy;
  // let src;

  // const saveGraph = () => {
  //   if (cy) {
  //     src = cy.png();
  //     const a = document.createElement('a');
  //     a.href = src;
  //     a.download = 'diagram.png';
  //     a.click();
  //   }
  // }
</script>

<header class="w-full min-h-16 h-16 px-4 flex items-center justify-between bg-white border-b">
  <p class="text-lg">
    <span class="font-bold text-blue-500">Prims</span>
    <span class="text-gray-700">Algorithm</span>
  </p>

  <button use:melt={$trigger} class="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors rounded-xl">
    <HelpCircle size={20} />
  </button>

  <div use:melt={$portalled}>
    {#if $open}
      <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
      <div
        class="fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white border p-6 shadow-lg"
        use:melt={$content}
      >
        <h2 use:melt={$title} class="m-0 text-xl font-semibold tracking-tight">
          Help and Information
        </h2>
        <p use:melt={$description} class="mb-5 mt-2 text-zinc-600">
          The app demonstrates how Prim's algorithm works. You can generate a random table, then solve the algorithm step by step.
        </p>

        <div>
          <h3 class="text-lg font-semibold tracking-tight mb-2">Keybindings</h3>
          <table class="keybinds-table gap-2">
            <tr>
              <th>Previous/Next Step</th>
              <td><Shortcut>&larr; (Left Arrow)</Shortcut></td>
              <td><Shortcut>&rarr; (Right Arrow)</Shortcut></td>
            </tr>
            <tr>
              <th>Back/Forward 3 steps</th>
              <td><Shortcut>Shift + &larr;</Shortcut></td>
              <td><Shortcut>Shift + &rarr;</Shortcut></td>
            </tr>
            <tr>
              <th>Go to Start/End</th>
              <td><Shortcut>⌘ + &larr;</Shortcut></td>
              <td><Shortcut>⌘ + &rarr;</Shortcut></td>
            </tr>
            <tr>
              <th>Generate new table</th>
              <td><Shortcut>⌘ + 0</Shortcut></td>
            </tr>
          </table>
        </div>
   

        <button
          use:melt={$close}
          aria-label="close"
          class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
                  items-center justify-center rounded-full p-1 text-magnum-800
                  hover:bg-magnum-100 focus:shadow-magnum-400"
        >
          <X class="square-4" />
        </button>
      </div>
    {/if}
  </div>

  <!-- <button on:click={saveGraph} class="px-2 py-1.5 flex items-center gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
    Graph
    <Download size={18} />
  </button> -->
</header>



<style>
  .keybinds-table tr {@apply
    px-2 py-4
  ;}
  .keybinds-table th {@apply
    w-[18ch]
    text-left text-sm font-normal
  ;}
</style>