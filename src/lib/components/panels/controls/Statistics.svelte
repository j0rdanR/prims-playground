<script>
  import { flip } from 'svelte/animate';
  import { AlertCircle } from 'lucide-svelte';
  import Section from '../Section.svelte';
  import { step, steps } from '../../../stores/stepper';
  import { inferHeadings } from '../../../utils';
  import { fade, scale, slide } from 'svelte/transition';
  import { tweened } from 'svelte/motion';

  $: stepMeta = $steps[$step]?.meta;
  $: stepData = JSON.parse($steps[$step]?.data || '{}');
  $: headers = inferHeadings(stepData?.matrix?.length || 0)

  $: percent = stepData?.values?.length / (headers.length - 1) * 100 || 0;
  let circumference = 30 * 2 * Math.PI;

  let mstLength = tweened(undefined, {
    duration: 200,
    interpolate: (a, b) => (t) => Math.round(((b - a) * t) + a)
  });
  $: $mstLength = stepData?.values?.reduce((a, v) => (a+v.value), 0) || 0;
</script>

<div class="flex flex-col gap-4">
  <Section title="Stage">
    <div class="flex items-start gap-2">
      <svelte:component this={stepMeta?.icon || AlertCircle} size={16} class="text-gray-600 mt-1 min-w-[16px]" />
      <p class="font-mono line-clamp-2">{stepMeta?.title || 'Not Computed'}</p>
    </div>
  </Section>
  
  <Section title="Progress">
    <p class="font-mono flex items-center gap-2">
      <svg class="w-4 h-4 -rotate-90" viewBox="0 0 80 80">
        <circle
          class="text-gray-300"
          stroke-width="10"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          class="{percent === 100 ? 'text-green-600':'text-red-600'} transition-[stroke-dashoffset] duration-300"
          stroke-width="10"
          stroke-dasharray="{circumference}"
          stroke-dashoffset={circumference - percent / 100 * circumference}
          stroke-linecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      {#if stepData?.values?.length / (headers.length - 1) === 1}
        <span class="text-green-700">Complete</span>
      {:else}
        <span class="text-red-700">Incomplete</span>
        <!-- ({Math.round(stepData?.values?.length / (headers.length - 1) * 100)}%) -->
      {/if}
    </p>
  </Section>
  
  <Section title="Pointers">
    <p class="font-mono flex flex-wrap gap-x-[1ch]">
      {#each stepData?.pointers || [] as value (value)}
        <span class="group whitespace-nowrap" transition:slide={{delay: 50, duration: 100, axis: 'x'}}>
          {headers[value]}<span class="group-last-of-type:hidden">,</span>
        </span>
      {:else}
        <span>[]</span>
      {/each}
      <!-- {stepData?.pointers?.map(v => headers[v]).join(', ') || ''} -->
    </p>
  </Section>
  
  <Section title="Values">
    <div class="font-mono flex flex-wrap gap-x-[1ch]">
      {#each stepData?.values || [] as value (value.id)}
        <span class="group whitespace-nowrap" transition:slide={{delay: 50, duration: 100, axis: 'x'}}>
          {value.value}<span class="group-last-of-type:hidden">,</span>
        </span>
      {:else}
        <span>[]</span>
      {/each}
      <!-- {stepData?.values?.map(v => v.value).join(', ') || ''} -->
    </div>
  </Section>
  
  <Section title="MST Length">
    <p class="font-mono text-xl">
      {$mstLength}
      <!-- <span class="inline-block -ml-[1ch] -translate-y-0.5 animate-blink">_</span> -->
    </p>
  </Section>
</div>