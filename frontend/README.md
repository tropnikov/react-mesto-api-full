# Mesto React with authorization and registration

## Обзор
Фронтенд [проекта Mesto](https://github.com/tropnikov/mesto) на React с авторизацией и регистрацией пользователей и продолжение/расширение предыдущего [проекта](https://github.com/tropnikov/mesto-react). Основной контент доступен только после регистрации и авторизации.

## Функциональность:
- Авторизация осуществляется через логин-пароль и `JWT`-токен, который сохраняется в `localStorage`.
- Основной контент закрыт через `ProtectedRoute`.
- При попытке входа без авторизации происходит редирект на страницу логина.
- Токен проверяется на валидность на сервере.

## Стек
- HTML
- CSS: flexbox, grid, animations, media queries
- JavaScript
- React: функциональные компоненты, хуки, React Router, context
- Create React App
- БЭМ
- API calls via Promises
- ООП
- Npm


## Посмотреть

Ссылка на Pages: https://tropnikov.github.io/react-mesto-auth

### Локальное демо
- Клонировать репозиторий `git clone git@github.com:tropnikov/react-mesto-auth.git`

- Выполнить в директории репозитория `npm i`
- Запустить проект в браузере по умолчанию: `npm start`  

## Планы
- Валидация форм
- Попап подтверждения удаления карточки
- Индикация загрузки через спинер
- Почистить/переиспользовать стили
- Обновление мобильной версии и добавление бургер-меню
- ~~Исправить роутинг на gh pages~~ *switched to HashRouter*

