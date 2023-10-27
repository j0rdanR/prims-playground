<script lang="ts">
  import HeaderIcon from './HeaderIcon.svelte';
  import { Keyboard } from 'lucide-svelte';
  import ShortcutItem from './ShortcutItem.svelte';
</script>

<HeaderIcon
  trigger={{
    icon: Keyboard,
    tooltip: 'Keyboard shortcuts'
  }}
>
  <svelte:fragment slot="title">
    Keyboard shortcuts
  </svelte:fragment>
  <svelte:fragment slot="description">
    Control the playground using your keyboard
  </svelte:fragment>

  <hr class="md:hidden mb-6">

  <div class="flex flex-col desktop-padding max-h-[50vh] overflow-auto">
    <ShortcutItem name="Generate new example" keybind="Ctrl/&#8984; + G" />
    <ShortcutItem name="Skip to start" keybind="Ctrl/&#8984; + &#x2190;" />
    <ShortcutItem name="Skip to end" keybind="Ctrl/&#8984; + &#x2192;" />
    <ShortcutItem name="Jump back 3 steps" keybind="Shift + Alt + &#x2190;" />
    <ShortcutItem name="Jump forward 3 steps" keybind="Shift + Alt + &#x2192;" />
    <ShortcutItem name="Previous step" keybind="Shift + &#x2190;" />
    <ShortcutItem name="Next step" keybind="Shift + &#x2192;" />
  </div>
</HeaderIcon>


<style lang="postcss">
  .desktop-padding {
    @apply md:p-4 md:border md:rounded-md;
  }
</style>