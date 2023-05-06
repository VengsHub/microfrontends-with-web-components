import { onMount, onDestroy } from 'svelte';
import { readable } from 'svelte/store';

export const onMount$ = readable(
    false,
    (set) => onMount(() => set(true))
);

export const onDestroy$ = readable(
    false,
    (set) => onDestroy(() => set(true))
);
