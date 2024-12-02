<script>
  // Tabs configuration
  const tabs = ['Home', 'Profile', 'Settings'];

  // Reactive variable to track the active tab
  let activeTab = 'Home';
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
  {#each tabs as tab}
    <div
      class="tab {tab === activeTab ? 'active' : ''}"
      on:click={() => (activeTab = tab)}
    >
      {tab}
    </div>
  {/each}
</div>

<!-- Tab Content -->
<div class="tab-content">
  {#if activeTab === 'Home'}
    <h2>Welcome to the Home tab!</h2>
    <p>This is the home content.</p>
  {:else if activeTab === 'Profile'}
    <h2>Welcome to your Profile tab!</h2>
    <p>This is your profile content.</p>
  {:else if activeTab === 'Settings'}
    <h2>Settings</h2>
    <p>Here you can adjust your preferences.</p>
  {/if}
</div>
