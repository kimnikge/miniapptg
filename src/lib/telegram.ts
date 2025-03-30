interface TelegramWebApp {
  WebApp: {
    initData: string;
    initDataUnsafe: {
      user?: {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
      };
      start_param?: string;
    };
    ready: () => void;
    expand: () => void;
    close: () => void;
  };
}

declare global {
  interface Window {
    Telegram: TelegramWebApp;
  }
}

export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
} | null;

// Функция для проверки наличия WebApp
export function isTelegramWebAppAvailable(): boolean {
  return typeof window !== 'undefined' && 'Telegram' in window;
}

// Функция для получения данных пользователя
export function getTelegramUser(): TelegramUser {
  if (isTelegramWebAppAvailable() && window.Telegram.WebApp.initDataUnsafe.user) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
}

// Инициализация WebApp
export function initTelegramWebApp() {
  if (isTelegramWebAppAvailable()) {
    window.Telegram.WebApp.ready();
  }
}

// Получение параметра запуска
export function getStartParam() {
  if (isTelegramWebAppAvailable()) {
    return window.Telegram.WebApp.initDataUnsafe.start_param;
  }
  return null;
} 