<script>
  import IconButton from '../../../components/ui/IconButton.svelte';
  import { SkipForward, SkipBack, StepForward, StepBack } from 'lucide-svelte';
  import { step, steps } from '../../../stores/stepper';

  $: percent = $step / ($steps.length-1) * 100;
  let circumference = 30 * 2 * Math.PI;
</script>

<div class="bg-white border-t">
  <div class="px-2 pt-2.5 pb-2 flex items-center justify-between">
    <div class="flex-1 flex gap-0.5">
      <IconButton
        icon={SkipBack}
        tooltip="Skip to Start"
        disabled={$step === 0}
        on:click={()=>$step = 0}
      />
      <IconButton
        icon={StepBack}
        tooltip="Previous step"
        disabled={$step === 0}
        on:click={()=>$step -= 1}
      />
    </div>
    <div class="flex-1 text-center">
      <p class="text-lg font-mono text-gray-700">
        {$step}/{$steps.length -1}
      </p>
    </div>
    <div class="flex-1 flex justify-end gap-0.5">
      <IconButton
        icon={StepForward}
        tooltip="Next step"
        disabled={$step === $steps.length-1}
        on:click={()=>$step += 1}
        />
        <IconButton
        icon={SkipForward}
        tooltip="Skip to End"
        disabled={$step === $steps.length-1}
        on:click={()=>$step = $steps.length-1}
      />
    </div>
  </div>
  
  <div class="w-full">
    <div class="h-1 bg-blue-500 transition-[width] duration-300" style="width: {percent}%;"></div>
  </div>
</div>