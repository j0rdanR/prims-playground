<script>
  import Stepper from './Stepper.svelte';
  import Statistics from './Statistics.svelte';
  import { steps } from '../../../stores/stepper';
</script>

<div class="w-full h-full flex-1 flex flex-col gap-4 justify-between">
  <Statistics />
  
  {#if $steps.length > 0}
    <Stepper />
  {:else}
    <div class="text-center select-none">
      <p class="text-xs text-gray-400">Generate a table in the config tab to solve</p>
    </div>
  {/if}
</div>