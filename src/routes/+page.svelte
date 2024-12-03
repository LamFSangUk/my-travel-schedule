<script lang="ts">
  import { onMount } from 'svelte';
  import { Accordion, AccordionItem } from 'svelte-collapsible';
  import type { PageServerData } from "./$types";

  // Load schedules data
  export let data: PageServerData;

  let { tabs } = data;

  // Reactive variable to track the active tab
  let activeTab = tabs[0].name;

  // Get today date
  let currentDateTime = null;

  function formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Set currentDateTime when user load the page
  onMount(() => {

    currentDateTime = new Date();
    let startDate = new Date(tabs[0].name);
    let endDate = new Date(tabs[tabs.length-1].name)
    
    if (startDate <= currentDateTime && currentDateTime <= endDate){
      activeTab = formatDate(currentDateTime);
    }
  });

</script>

<style>
  /* Tabs Style */
  .tabs-container {
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent line breaks */
    border-bottom: 2px solid #ddd;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .tabs {
    display: inline-flex; /* Ensure tabs are inline */
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

  /* Card Style */
  :global(.accordion) {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }

  :global(.accordion-item) {
    border-bottom: 1px solid rgb(100, 120, 140);
  }
  
  :global(.card) {
    margin-top: 1em;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }

  .header {
    display: flex;
  }

  .header > .start-time {
    color:#007acc;
  }

  .header > .short-desc {
    margin: 1em;
  }

</style>

<!-- Tabs -->
<div class="tabs-container">
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
</div>

<!-- Tab Content -->
<div class="tab-content">
  {#each tabs as { name, schedules }}
    {#if name === activeTab}
      <Accordion>
        <!-- Schedule List -->
        {#each schedules as schedule, idx}
          <AccordionItem key={idx}>
            <div slot="header" class="header">
              <h2 class="start-time">{schedule.start_time}</h2>
              <h2 class="short-desc">{schedule.short_desc}</h2>
            </div>
            <p slot="body">{schedule.short_desc}</p>
          </AccordionItem>
        {/each}
      </Accordion>
    {/if}
  {/each}
</div>
