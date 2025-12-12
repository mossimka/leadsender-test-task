# Telegram Channels Management (Test Task)

Веб-приложение для фейкового управления Telegram каналами с возможностью добавления, редактирования, удаления и поиска.

**Компания:** LeadSender LLC

## Демо

**Live Demo:** [https://leadsender-test-task.vercel.app/](https://leadsender-test-task.vercel.app/)

## Технологии

- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery 3.7.1
- LocalStorage
- Vite

## Функциональность

- Добавление новых каналов
- Редактирование названий каналов
- Удаление каналов с подтверждением
- Поиск в реальном времени
- Сохранение данных в LocalStorage
- Анимированные модальные окна
- Адаптивный дизайн

## Установка и запуск

### Требования

- Node.js 14+
- npm или yarn

### Локальный запуск

```bash
git clone https://github.com/mossimka/leadsender-test-task.git
cd leadsender-test-task
npm install
npm run dev
```

Откройте браузер по адресу: `http://localhost:5173`

### Сборка для продакшна

```bash
npm run build
```

Файлы будут в папке `dist/`.

Предпросмотр сборки:

```bash
npm run preview
```

## Структура проекта

```
leadsender-task/
├── index.html
├── package.json
├── src/
│   ├── main.js
│   ├── state.js
│   ├── constants.js
│   ├── styles.css
│   ├── components/channelTable.js
│   ├── services/channelService.js
│   └── utils/storage.js
└── public/assets/
```

## Лицензия

MIT

## Автор

Maxim Sarsekeyev
