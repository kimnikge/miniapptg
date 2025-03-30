<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { initTelegramWebApp, getTelegramUser, isTelegramWebAppAvailable, type TelegramUser } from '$lib/telegram';

  let user: TelegramUser = null;
  let isInTelegram = false;
  let isLoading = true;

  onMount(async () => {
    isInTelegram = isTelegramWebAppAvailable();
    
    if (isInTelegram) {
      initTelegramWebApp();
      user = getTelegramUser();
    }
    
    isLoading = false;
  });
</script>

<main>
  <div class="container">
    <h1>Мини-приложение Telegram</h1>
    
    {#if isLoading}
      <p>Загрузка...</p>
    {:else if isInTelegram}
      {#if user}
        <div class="user-info">
          <h2>Привет, {user.first_name}!</h2>
          <p>Telegram ID: {user.id}</p>
          {#if user.username}
            <p>Username: @{user.username}</p>
          {/if}
        </div>
      {:else}
        <p>Не удалось получить данные пользователя.</p>
      {/if}
    {:else}
      <p>Это приложение работает только внутри Telegram.</p>
    {/if}
  </div>
</main>

<style>
  .container {
    max-width: 500px;
    margin: 0 auto;
    padding: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h1 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 20px;
  }

  .user-info {
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 16px;
    margin-top: 20px;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    margin: 8px 0;
  }
</style>
