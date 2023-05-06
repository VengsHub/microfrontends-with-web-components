<script lang="ts">
  import Fa from 'svelte-fa';
  import { faBars, faSquare } from '@fortawesome/free-solid-svg-icons';
  import { writable } from 'svelte/store';
  import { tabs } from '$lib/tab-management-store';
  import Hoverable from '$lib/Hoverable.svelte';

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

  $: tabsAreOverflowing = [...$tabs].length > maxVisibleTabs;
</script>

{#if !isMobile}
    <div bind:this={$menuBarWidth} class="menu-bar white-text">
        <button>
            <Fa icon={faBars}></Fa>
        </button>

        <nav class="tab-bar">
            {#each $tabs as tab, index}
                <Hoverable let:hovering={hovered}>
                    <div class="tab"
                         class:active={index === activeTabIndex}
                         style="width: {tabShouldShrink}">
                        <Fa icon={faSquare}></Fa>
                    </div>
                </Hoverable>
            {/each}
        </nav>
    </div>
{/if}


<style lang="scss">
  .menu-bar {
    height: 48px;
    background-color: var(--blue900);
    display: flex;

    .flyout-menu-button {
      width: 56px;
      border-right: 1px solid var(--white30);
      flex-shrink: 0;
    }

    .tab-bar {
      display: flex;
      align-items: center;

      .tab {
        height: 100%;
        padding: 14px 12px;
        border-right: 1px solid var(--white30);
        display: flex;
        align-items: center;
        grid-gap: 8px;

        fa-icon {
          width: 20px;
          display: flex;
          justify-content: center;
        }

        span {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .close-tab-button {
          margin-left: auto;
        }

        &:hover {
          background-color: var(--blue800);
        }

        &.active {
          background-color: var(--blue600);

          &:hover {
            background-color: var(--blue500);
          }

          // when pressed
          &:active {
            background-color: var(--blue700);
          }
        }

        .tab-preview {
          width: 215px;
          height: 80px;
          background-color: var(--blue900);
          border-radius: 12px;
          padding: 8px;
          position: absolute;
          margin-left: -4px;
          top: 56px;
          display: flex;
          grid-gap: 4px;

          fa-icon {
            margin: 4px;
          }

          div {
            display: flex;
            flex-direction: column;
          }
        }
      }

      .new-tab-button {
        width: 48px;
        height: 100%;
      }
    }

    .overflow-menu-button {
      width: max-content;
      height: 100%;
      padding: 12px;
      display: flex;
      grid-gap: 8px;

      span {
        white-space: nowrap;
      }
    }

    .action-buttons {
      margin-left: auto;
      display: flex;
      align-items: center;

      button {
        width: 48px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .profile-image {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }

  .menu-bar-mobile {
    height: 100%;

    .tab {
      width: 100%;
      height: 48px;
      position: fixed;
      top: 0;
      background-color: var(--blue600);
      padding: 12px;
      display: flex;
      grid-gap: 12px;
      align-items: center;

      .tab-count {
        width: 70px;
        height: 24px;
        margin-left: auto;
        background-color: var(--blue500);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:hover {
        background-color: var(--blue500);
      }

      // when pressed
      &:active {
        background-color: var(--blue700);
      }
    }

    .action-buttons {
      width: 100%;
      height: 64px;
      position: fixed;
      bottom: 0;
      background-color: var(--blue900);
      display: flex;
      justify-content: space-evenly;

      button {
        height: 100%;
        flex-grow: 1;
      }
    }
  }

  button {
    background-color: transparent;
    z-index: 1;

    &:hover {
      background-color: var(--blue800);
    }

    // when pressed
    &:active {
      background-color: var(--blue600);
    }

    &.active {
      background-color: var(--white);
    }
  }
</style>
