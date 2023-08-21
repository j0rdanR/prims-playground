<script lang="ts">
  import { writable } from 'svelte/store';
  import Section from '../Section.svelte';
  import Slider from '../../ui/Slider.svelte';

  import { newScenario } from '../../../utils';
  import { densityParam, rangeParam, sizeParam } from '../../../stores/params';

</script>

<div class="h-full flex flex-col justify-between">
  <div class="flex flex-col gap-4">
    <Section title="Size">
      <Slider min={3} max={12} default={[6]} store={sizeParam} />
    </Section>
    <Section title="Density">
      <Slider step={5} default={[50]} store={densityParam} />
    </Section>
    <Section title="Range">
      <Slider min={0} max={300} step={5} default={[20, 100]} store={rangeParam} />
    </Section>
  </div>

  <div class="flex items-center justify-end">
    <button class="btn border text-sm rounded-lg text-gray-600" on:click={newScenario}>Generate</button>
  </div>
</div>