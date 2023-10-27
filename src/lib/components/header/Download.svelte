<script lang="ts">
  import HeaderIcon from './HeaderIcon.svelte';
  import { Download } from 'lucide-svelte';
</script>

<HeaderIcon
  trigger={{
    icon: Download,
    tooltip: 'Download generated'
  }}
>
  <svelte:fragment slot="title">
    Download
  </svelte:fragment>
  <svelte:fragment slot="description">
    Save generated assets as images
  </svelte:fragment>

  <p class="italic text-sm font-medium px-3 py-2 rounded-lg bg-amber-100 text-amber-900">Downloading the generated table and graph is not available yet.</p>
</HeaderIcon>