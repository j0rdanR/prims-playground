import { writable } from 'svelte/store';


export const sizeParam = writable<number[]>([0]);
export const densityParam = writable<number[]>([0]);
export const rangeParam = writable<number[]>([0]);