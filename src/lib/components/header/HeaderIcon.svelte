<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { fade, fly } from 'svelte/transition';
  import IconButton from '../ui/IconButton.svelte';
  import { X } from 'lucide-svelte';

  export let trigger: { icon: any, tooltip: string };
</script>

<Dialog.Root>

  <Dialog.Trigger asChild let:builder>
    <IconButton
      builderAction={builder.action} {...builder}
      icon={trigger.icon}
      tooltip={trigger.tooltip}
    />
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 backdrop-blur-sm bg-black/40"
      transition={fade}
      transitionConfig={{duration: 150}}
    />
    <Dialog.Content
      class="dialog-content-container"
      transition={fly}
      transitionConfig={{duration: 200, y: -10}}
    >
      <Dialog.Title class="text-xl font-semibold tracking-tight"><slot name="title"/></Dialog.Title>
      <Dialog.Description class="mb-5 mt-1 leading-normal text-gray-600"><slot name="description"/></Dialog.Description>

      <slot />

      <Dialog.Close class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full p-1 text-gray-800 hover:bg-gray-100 focus:shadow-gray-400">
        <X class="w-4 h-4" />
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>