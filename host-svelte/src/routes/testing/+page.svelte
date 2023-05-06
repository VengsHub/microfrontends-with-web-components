<script lang="ts">
  import { writable } from 'svelte/store';
  import { tabs } from '$lib/tab-management-store';

  let activeTabIndex = 0;
  let hoveredTabIndex = -1;

  const menuBarWidth = writable();
  $: isMobile = $menuBarWidth <= 480;

  const flyoutMenuButtonWidth = 58;
  const newTabButtonWidth = 48;
  const actionButtonsWidth = 4 * 48;
  $: tabBarWidth = $menuBarWidth - flyoutMenuButtonWidth - newTabButtonWidth - actionButtonsWidth;

  $: tabWidth = $menuBarWidth > 1440 ? 280 : $menuBarWidth > 1024 ? 184 : 136;

  $: tabShouldShrink = [...$tabs].length * tabWidth > tabBarWidth;

  const shrunkTabWidth = 44;
  $: maxVisibleTabs = (tabBarWidth - tabWidth) / shrunkTabWidth;

  $: console.log('width', $menuBarWidth);

  $: tabsAreOverflowing = $tabs > maxVisibleTabs;
</script>

<div bind:clientWidth={$menuBarWidth}>Testing</div>
