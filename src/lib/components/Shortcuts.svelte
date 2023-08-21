<script lang="ts">
  import { step, steps } from '../stores/stepper';
  import { newScenario } from '../utils';
  import { shortcut, type ShortcutEventDetail, type ShortcutTrigger } from '@svelte-put/shortcut';

  const generateNewMatrix: ShortcutTrigger = {
    key: 'g',
    modifier: ['ctrl', 'meta'],
    preventDefault: true,
    callback: newScenario,
  }
  const gotoStart: ShortcutTrigger = {
    key: 'ArrowLeft',
    modifier: ['ctrl', 'meta'],
    preventDefault: true,
    callback: () => {
      $step = 0;
    },
  }
  const prevSkipStep: ShortcutTrigger = {
    key: 'ArrowLeft',
    modifier: [['shift', 'alt']],
    preventDefault: true,
    callback: () => {
      // inc/dec by 2 because combined with the single step function equals 3
      // yes, this is a bit of a hack. no, i'm not going to fix it
      $step > 2 ? ($step -= 2) : ($step = 0);
    },
  }
  const prevStep: ShortcutTrigger = {
    key: 'ArrowLeft',
    modifier: ['shift'],
    preventDefault: true,
    callback: () => {
      $step > 0 && ($step -= 1);
    },
  }
  const nextStep: ShortcutTrigger = {
    key: 'ArrowRight',
    modifier: ['shift'],
    preventDefault: true,
    callback: (detail) => {
      $step < ($steps.length - 1) && $step++
      console.log(detail)
    },
  }
  const nextSkipStep: ShortcutTrigger = {
    key: 'ArrowRight',
    modifier: [['shift', 'alt']],
    preventDefault: true,
    callback: () => {
      // inc/dec by 2 because combined with the single step function equals 3
      // yes, this is a bit of a hack. no, i'm not going to fix it
      $step < ($steps.length - 3) ? ($step += 2) : ($step = $steps.length - 1);
    },
  }
  const gotoEnd: ShortcutTrigger = {
    key: 'ArrowRight',
    modifier: ['ctrl', 'meta'],
    preventDefault: true,
    callback: () => {
      $step = $steps.length - 1;
    },
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: [
      generateNewMatrix,
      prevSkipStep,
      nextSkipStep,
      prevStep,
      nextStep,
      gotoStart,
      gotoEnd
    ]
  }}
/>