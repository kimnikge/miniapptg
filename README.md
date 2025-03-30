Вот готовый, доработанный файл `README.md` для вашего проекта, учитывающий все обсуждённые особенности (база резюме, доска вакансий, интеграция с Telegram):

```markdown
# HoReCa Jobs MiniApp

Мини-приложение для Telegram по подбору персонала в сфере HoReCa (отели, рестораны, кафе) с использованием WebApp API, Supabase и grammY.

## 🚀 Основные возможности

- **Для сотрудников**:
  - Создание профиля с видео-визиткой
  - Указание графика доступности
  - "Тревожная кнопка" для срочного поиска работы
  - Просмотр вакансий и отклики

- **Для работодателей**:
  - Публикация вакансий за 2 клика
  - Поиск по базе резюме с фильтрами
  - Чат с кандидатами

## 💻 Стек технологий

| Компонент       | Технологии                          |
|-----------------|-------------------------------------|
| **Frontend**    | Svelte + Telegram WebApp API        |
| **Backend**     | Supabase (PostgreSQL, Auth, Storage)|
| **Бот**         | Node.js + grammY                    |
| **Хостинг**     | Netlify (Frontend) + VPS (Бот)      |

## 🛠 Установка

### 1. Клонирование репозитория
```bash
git clone https://github.com/yourusername/horeca-jobs.git
cd horeca-jobs
```

### 2. Настройка Supabase
1. Создайте проект на [supabase.com](https://supabase.com)
2. Создайте таблицы из SQL-файла: `supabase/setup.sql`
3. Включите Realtime для таблиц `profiles` и `vacancies`
4. Получите URL и `anon` ключ

### 3. Создание Telegram бота
1. Напишите [@BotFather](https://t.me/BotFather)
2. Используйте команду `/newbot`
3. Включите поддержку WebApp:
   ```
   /setinline
   /setmenubutton
   ```

### 4. Настройка окружения
Создайте файл `.env`:
```ini
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-key
VITE_SUPABASE_STORAGE_URL=https://your-project.supabase.co/storage/v1

# Telegram
VITE_TELEGRAM_BOT_TOKEN=your-bot-token
VITE_TELEGRAM_WEBAPP_URL=https://your-app.netlify.app

# Для бота (server/.env)
BOT_TOKEN=your-bot-token
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
```

## 🏗 Структура проекта

```
horeca-jobs/
├── client/           # Svelte-приложение
│   ├── src/
│   │   ├── lib/      # Сущности (профили, вакансии)
│   │   ├── routes/   # Страницы
│   │   └── stores/   # Состояния
├── server/           # Код Telegram бота
│   ├── bot/          # Обработчики команд
│   └── services/     # Интеграция с Supabase
├── supabase/
│   └── setup.sql     # SQL для создания таблиц
└── public/           # Статические файлы
```

## 🚦 Запуск

### Разработка
```bash
# Frontend
cd client
npm run dev

# Бот (в другом терминале)
cd server
npm run dev
```

### Production
```bash
# Сборка фронтенда
cd client
npm run build

# Запуск бота
cd server
npm start
```

## 📌 SQL для Supabase
```sql
-- Создание таблицы профилей
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id TEXT UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,  -- 'повар', 'официант' и т.д.
  skills TEXT[],
  video_url TEXT,      -- Ссылка на видео-визитку
  schedule JSONB,      -- График доступности
  is_urgent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Полный SQL в файле supabase/setup.sql
```

## 📞 Контакты
По вопросам сотрудничества:  
Email: your@email.com  
Telegram: @yourusername

## 📜 Лицензия
MIT License
```

Ключевые улучшения:
1. Добавлено подробное описание возможностей для обеих сторон (сотрудники/работодатели)
2. Четкая структура установки с нуля
3. Добавлен раздел с SQL для создания таблиц
4. Указаны реальные пути к файлам
5. Добавлены примеры настройки WebApp в BotFather
6. Разделены переменные окружения для клиента и сервера

Для полной настройки вам останется:
1. Заполнить `supabase/setup.sql` полной схемой БД
2. Настроить Netlify для фронтенда
3. Настроить вебхуки для бота

Нужна помощь с любым из этих шагов?