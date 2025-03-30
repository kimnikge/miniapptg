import { Bot, GrammyError, HttpError } from 'grammy';
import { supabase } from '../lib/supabase';

// Токен вашего бота, полученный от @BotFather
const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN';

// URL вашего веб-приложения
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://your-webapp-url.com';

// Создаем экземпляр бота
const bot = new Bot(BOT_TOKEN);

// Обработчик команды /start
bot.command('start', async (ctx) => {
  await ctx.reply('Привет! Это мини-приложение на Telegram WebApp.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Открыть приложение', web_app: { url: WEBAPP_URL } }],
      ],
    },
  });
});

// Обработка ошибок
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
  
  if (err instanceof GrammyError) {
    console.error('Ошибка в запросе к Telegram API:', err.description);
  } else if (err instanceof HttpError) {
    console.error('Ошибка при подключении к Telegram API:', err);
  } else {
    console.error('Неизвестная ошибка:', err);
  }
});

// Функция для запуска бота
export async function startBot() {
  try {
    console.log('Запуск бота...');
    await bot.start();
  } catch (error) {
    console.error('Ошибка при запуске бота:', error);
  }
}

// Экспорт экземпляра бота для использования в других местах
export { bot }; 