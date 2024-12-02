<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let { tabs } = data;

  // Reactive variable to track the active tab
  let activeTab = tabs[0].name;
</script>

<style>
  .tabs {
    display: flex;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ddd;
  }

  .tab {
    padding: 1rem 2rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  .tab:hover {
    background-color: #f4f4f4;
  }

  .tab.active {
    border-bottom: 2px solid #007acc;
    font-weight: bold;
  }

  .tab-content {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>

<!-- Tabs -->
<div class="tabs">
  {#each tabs as { name }}
    <div
      class="tab {name === activeTab ? 'active' : ''}"
      on:click={() => (activeTab = name)}
    >
      {name}
    </div>
  {/each}
</div>

<!-- Tab Content -->
<div class="tab-content">
  {#each tabs as { name, schedules }}
    {#if name === activeTab}
      <p>{schedules}</p>
    {/if}
  {/each}
</div>
