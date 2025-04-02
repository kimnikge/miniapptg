<script lang="ts">
  import { WebApp } from '@twa-dev/sdk';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  async function login() {
    const user = WebApp.initData;
    if (!user) return;

    const { data, error } = await supabase
      .from('users')
      .upsert({
        telegram_id: user.id.toString(),
        nickname: user.username,
        role: 'worker'
      })
      .select()
      .single();

    if (error) {
      console.error('Error:', error);
      return;
    }

    goto('/portfolio');
  }
</script>

<main class="container">
  <h1>Добро пожаловать в MiniAppTG</h1>
  <p>Войдите, чтобы начать</p>
  <button on:click={login}>Войти через Telegram</button>
</main>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
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
