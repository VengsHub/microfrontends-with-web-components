import { writable } from 'svelte/store';

export interface Tab {
  name: string;
  description: string;
  footnote: string;
}

function createTabs(initial: Tab[] = []) {
  const { subscribe, set, update } = writable<Tab[]>(initial);

  return {
    subscribe,
    addTab: (newTab: Tab) => update(tabs => tabs.concat(newTab)),
    removeTab: (indexToRemove: number) => update(tabs =>
        tabs.filter((_, index) => index !== indexToRemove)
    )
  };
}

export const tabs = createTabs([
  {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
  {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
  {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'},
  {name: 'Tab Name', description: 'Supplemental Info', footnote: 'Footnote'}
]);
