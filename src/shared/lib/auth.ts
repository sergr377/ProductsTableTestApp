// Получение токена из localStorage или sessionStorage
import { NavigateFunction } from 'react-router-dom';

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
};

// Сохранение токена в зависимости от чекбокса "запомнить"
export const setAccessToken = (token: string, remember: boolean) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem('accessToken', token);
};

// Удаление токена
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('accessToken');
};

export const handleLogout = (navigate: NavigateFunction) => {
  removeAccessToken(); // очищаем токен из localStorage/sessionStorage
  navigate('/login'); // редирект на страницу входа
};
