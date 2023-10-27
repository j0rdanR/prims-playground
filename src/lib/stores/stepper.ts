import { readable, writable } from 'svelte/store';


export const step = writable<number>(0);
export const steps = writable<any[]>([]);