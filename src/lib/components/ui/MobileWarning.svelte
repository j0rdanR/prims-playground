<script>
  import { createDialog, melt } from '@melt-ui/svelte';
  import { onMount } from 'svelte';
  
  const {
    elements: {
      trigger, overlay,
      content, title, description,
      close, portalled,
    },
    states: { open },
  } = createDialog({
    role: 'alertdialog',
    defaultOpen: true,
  });

  onMount(() => {
    $open = localStorage.getItem('mobileWarningAcknowledged') === '1' ? false : true;
  })
</script>


<div use:melt={$portalled} class="md:hidden fixed inset-0 px-2 flex items-center justify-center">
  {#if $open}
    <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/80" />
    <div
      class="z-50 w-full max-w-md p-6 rounded-md bg-white shadow-lg"
      use:melt={$content}
    >
      <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">
        Mobile unsupported
      </h2>
      <p use:melt={$description} class="mb-5 mt-2 leading-normal text-gray-600">
        The playground is not optimised for mobile screens. Certain functionality will not be available.
      </p>
 
      <div class="mt-6 flex justify-end gap-4">
        <button
          class="px-4 py-3 font-medium leading-none text-gray-600 bg-gray-100 rounded-lg"
          use:melt={$close}
          on:m-click={()=>localStorage.setItem('mobileWarningAcknowledged', '1')}
        >
          I understand
        </button>
      </div>
    </div>
  {/if}
</div>
 