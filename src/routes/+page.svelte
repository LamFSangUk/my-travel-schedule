<script lang="ts">
  import { onMount } from 'svelte';
  import { Accordion, AccordionItem } from 'svelte-collapsible';
  import type { PageServerData } from "./$types";

  // Load schedules data
  export let data: PageServerData;

  let { destinations, tabs } = data;

  let activeCity = destinations[0].city;

  // Reactive variable to track the active tab
  let activeTab = tabs[0].name;

  // Get date and weather information
  let currentDateTime = null;
  let weatherData = null;
  let city = 'Seoul'; // Default city

  function formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onMount(async() => {
    // Set currentDateTime when user load the page
    currentDateTime = new Date();
    let startDate = new Date(tabs[0].name);
    let endDate = new Date(tabs[tabs.length-1].name)
    
    if (startDate <= currentDateTime && currentDateTime <= endDate){
      activeTab = formatDate(currentDateTime);
    }

    // Get weather info
    // const openWeatherApiKey=import.meta.env.VITE_OPENWEATHER_MAP_API_KEY

    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`
    // );
    // weatherData = await response.json();
  });

</script>

<style>
  :global(body) {
    font-family: 'Noto Sans KR', sans-serif;
  }
  /* Tabs Style */
  .tabs-container {
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent line breaks */
    border-bottom: 2px solid #ddd;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .tabs-container::-webkit-scrollbar {
    display: none;
  }

  .title {
    font-family: Impact, Charcoal, sans-serif;
    font-size: 36pt;
    color: #575951;
    margin: 1rem;
  }

  .tabs {
    width: 100%;
    display: inline-flex; /* Ensure tabs are inline */
    margin-bottom: 1rem;
    border-bottom: 2px solid #ddd;
  }

  .tab {
    padding: 1rem 2rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    font-family: Impact, Charcoal, sans-serif;
    font-size: 24pt;
    font-weight: normal;
    color: #575951;
  }

  .tab:hover {
    background-color: #f4f4f4;
  }

  .tab.active {
    border-bottom: 2px solid #575951;
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

  .accordion-item:hover {
    background-color: #f4f4f4;
  }

  :global(.accordion-item) {
    width: 100%;
    border-bottom: 1px solid rgb(100, 120, 140);
  }

  :global(.accordion-item-header) {
    width: 100%;
  }
  
  .header {
    display: flex;
    width: 100%;
    font-size: 14pt;
    align-items: center;
  }

  .header > .start-time {
    width: 22%;
    max-width: 280px;
    color:#981D35;
    margin: 1rem;
    font-weight: bold;
  }

  .header > .short-desc {
    width: 100%;
    color:#958B82;
    margin: 1rem;
    text-align: left;
    font-weight: bold;
  }

  .body {
    width: 100%;
    font-size: 14pt;
  }

  .body > .desc {
    width: 100%;
    margin: 16px 16px;
    font-weight: 700;
  }
  
  .memo {
    width: 100%;
  }

  .memo > ul {
    margin: 4px 16px;
  }

  .memo > ul > li {
    width: 100%;
    margin: 8px 0px;
  }

  .memo-title {
    margin-left: 24px;
    font-weight: bold;
  }

  .transportation {
    display: flex;
    width: 100%;
    padding: 0px 6px;
    font-size: 14pt;
  }

  .trans-name {
    font-weight: 700;
    margin: 8px 0px;

  }

  .ride {
    margin-left: 24px;
  }

  .ride-name {
    font-weight: bold;
  }

  .ride-start, .ride-end  {
    margin: 4px 0px;
  }

  .transportation > .duration {
    width: 22%;
    max-width: 280px;
  }

  .meal-option {
    margin: 4px 16px;
  }

  .meal-option-title {
    color:#981D35;
    font-weight: bold;
  }

  .meal-option-item {
    margin: 4px 16px;
  }

  .meal-option-item > p {
    margin: 8px;
  }

  /* vertical arrows */
  .line-vertical {
    width: 2px; /* line-width */
    height: 100%; /* line length */
    margin-left: 50%;
    margin-top: 0%;
    float: left;
  }

  .line-vertical, .line-horizontal {
    position: relative;
    background: #A47451;
  }

  .arrow-down:before {
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
  }

  .arrow-down:before {
    left: -4px;
  }

  .arrow-down:before {
    bottom: -15px;
    border-top: 15px solid #A47451;
  } 


</style>

<!-- Tabs -->
<div>
  <div class="title">
    {activeCity}
  </div>
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
</div>


<!-- Tab Content -->
<div class="tab-content">
  {#each tabs as { name, schedules }}
    {#if name === activeTab}
      <Accordion>
        <!-- Schedule List -->
        {#each schedules as schedule, idx}
          {#if schedule.type === "tour"}
            <div class={schedule.type}>
              <AccordionItem key={idx}>
                <div slot="header" class="header">
                  <div class="start-time">{schedule.start_time}</div>
                  <div class="short-desc">{schedule.short_desc}</div>
                </div>
                <div slot="body" class="body">
                  {#if schedule.desc}
                  <div class="desc">
                    {schedule.desc}
                  </div>
                  {/if}
                  {#if schedule.memo && schedule.memo.length > 0}
                    <div class="memo">
                      <div class="memo-title">Memo</div>
                      <ul>
                        {#each schedule.memo as memo}
                          <li>{memo}</li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                </div>
              </AccordionItem>
            </div>
          {:else if schedule.type === "transportation"}
            <div class={schedule.type}>
              <div class="duration">
                <div class="line-vertical arrow-down"></div>
              </div>
              <div>
                <ul>
                {#each schedule.options as trans_option, option_idx}
                  <li>
                    <div class="trans-name">
                      {#if schedule.options.length > 1}
                        {`OPTION ${option_idx + 1}: ${trans_option.name}`}
                      {:else}
                        {trans_option.name}
                      {/if}
                    </div>
                    <div class="seq">
                      {#each trans_option.seq as ride}
                        <div class="ride">
                          <li class="ride-name">
                            {ride.name}
                          </li>
                          <div class="ride-start">
                            {`탑승: ${ride.start}`}
                          </div>
                          <div class="ride-end">
                            {`하차: ${ride.dest}`}
                          </div>
                        </div>
                      {/each}
                    </div>
                  </li>
                {/each}
                </ul>
              </div>
            </div>
          {:else if schedule.type === "meal"}
            <div class={schedule.type}>
              <AccordionItem key={idx}>
                <div slot="header" class="header">
                  <div class="start-time">{schedule.start_time}</div>
                  <div class="short-desc">{schedule.short_desc}</div>
                </div>
                <div slot="body" class="body">
                  <div class="meal-option">
                    {#each schedule.options as meal_option, meal_idx}
                      <div class="meal-option-title">{`OPTION ${meal_idx+1}`}</div>
                      <div class="meal-option-item"><p>{meal_option.name}</p><p>{meal_option.kind}</p></div>
                    {/each}
                  </div>
                </div>
              </AccordionItem>
            </div>
          {/if}
        {/each}
      </Accordion>
    {/if}
  {/each}
</div>
