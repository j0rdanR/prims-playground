<script>
  import Stepper from './Stepper.svelte';
  import Statistics from './Statistics.svelte';
  import { steps } from '../../../stores/stepper';
</script>

<div class="h-full flex flex-col justify-between">
  <Statistics />
  {#if $steps.length > 0}
    <Stepper />
  {:else}
    <div class="text-center select-none">
      <p class="text-xs text-gray-400">Generate a table in the config tab to solve</p>
    </div>
  {/if}
</div>