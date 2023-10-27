<script lang="ts">
  import HeaderIcon from './HeaderIcon.svelte';
  import { HelpCircle } from 'lucide-svelte';
</script>

<HeaderIcon
  trigger={{
    icon: HelpCircle,
    tooltip: 'Help'
  }}
>
  <svelte:fragment slot="title">
    Help and info
  </svelte:fragment>
  <svelte:fragment slot="description">
    About this application
  </svelte:fragment>
</HeaderIcon>