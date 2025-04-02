<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  let portfolio = {
    title: '',
    description: '',
    skills: '',
    city: ''
  };

  onMount(async () => {
    const { data: existingPortfolio } = await supabase
      .from('portfolios')
      .select()
      .single();

    if (existingPortfolio) {
      portfolio = existingPortfolio;
    }
  });

  async function savePortfolio() {
    const { error } = await supabase
      .from('portfolios')
      .upsert({
        ...portfolio,
        status: 'pending'
      });

    if (error) {
      console.error('Error:', error);
    }
  }
</script>

<main class="container">
  <h1>Моё портфолио</h1>
  
  <form on:submit|preventDefault={savePortfolio}>
    <div class="field">
      <label for="title">Заголовок</label>
      <input id="title" bind:value={portfolio.title} required>
    </div>

    <div class="field">
      <label for="description">Описание</label>
      <textarea id="description" bind:value={portfolio.description} required></textarea>
    </div>

    <div class="field">
      <label for="skills">Навыки</label>
      <input id="skills" bind:value={portfolio.skills} required>
    </div>

    <div class="field">
      <label for="city">Город</label>
      <input id="city" bind:value={portfolio.city} required>
    </div>

    <button type="submit">Сохранить</button>
  </form>
</main>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .field {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background: #0088cc;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
