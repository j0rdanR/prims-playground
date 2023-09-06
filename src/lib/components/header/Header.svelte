<script>
  import { Code, Github, HelpCircle, Keyboard } from 'lucide-svelte';
  import IconButton from '../ui/IconButton.svelte';
  import HelpDialog from './HelpDialog.svelte';
</script>

<header class="h-12 min-h-[48px] pl-3 pr-1 flex items-center justify-between bg-white border-b">
  <p class="flex gap-1 select-none">
    <span class="font-bold text-blue-500">Prims</span>
    <span class="text-gray-700">Playground</span>
  </p>

  <div class="flex gap-0.5">
    <IconButton
      icon={Code}
      tooltip="Source code"
    />
    <IconButton
      icon={Keyboard}
      tooltip="Shortcuts"
    />
    <HelpDialog />
  </div>
</header>