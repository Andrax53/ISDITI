# Steganography Web Application

Веб-приложение для стеганографии, позволяющее скрывать текстовые сообщения в изображениях. Проект разработан с использованием React для фронтенда и FastAPI для бэкенда.

## Возможности

- Кодирование текстовых сообщений в изображения
- Декодирование скрытых сообщений из изображений
- Поддержка форматов PNG и BMP
- Темная и светлая темы оформления
- Адаптивный дизайн
- Безопасное хранение данных в PostgreSQL

## Технологии

### Frontend
- React.js
- Axios для HTTP-запросов
- CSS с поддержкой тем
- LocalStorage для сохранения настроек

### Backend
- Python 3.x
- FastAPI
- SQLAlchemy ORM
- Pydantic для валидации
- Pillow для обработки изображений
- PostgreSQL

## Требования

### Frontend
- Node.js 14+
- npm или yarn

### Backend
- Python 3.8+
- PostgreSQL 12+
- Виртуальное окружение Python (рекомендуется)

## Установка

### Backend

1. Создайте виртуальное окружение и активируйте его:
```bash
python -m venv venv
source venv/bin/activate  # для Linux/Mac
venv\Scripts\activate     # для Windows
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Создайте файл .env в корне backend директории:
```env
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=steganography
```

4. Примените миграции:
```bash
alembic upgrade head
```

### Frontend

1. Установите зависимости:
```bash
cd frontend
npm install
```

2. Создайте файл .env в корне frontend директории:
```env
REACT_APP_API_URL=http://localhost:8000
```

## Запуск

### Backend
```bash
cd backend
uvicorn main:app --reload
```
Сервер будет доступен по адресу: http://localhost:8000

### Frontend
```bash
cd frontend
npm start
```
Приложение будет доступно по адресу: http://localhost:3000

## API Документация

### Endpoints

#### POST /encode/
Кодирование данных в изображение

**Параметры запроса:**
- file: File (PNG или BMP изображение)
- data: String (текст для кодирования)

**Ответ:**
```json
{
    "id": 1,
    "filename": "encoded_image.png"
}
```

#### GET /decode/{image_id}
Извлечение данных из изображения

**Параметры пути:**
- image_id: Integer (ID закодированного изображения)

**Ответ:**
```json
{
    "data": "Извлеченный текст"
}
```

## Безопасность

- Защита от SQL-инъекций через ORM
- Валидация входных данных с Pydantic
- Защита от XSS-атак
- CORS настройки
- Ограничение размера файлов
- Безопасное хранение учетных данных

## Тестирование

### Запуск тестов бэкенда
```bash
cd backend
pytest
```

### Запуск тестов фронтенда
```bash
cd frontend
npm test
```

## Структура проекта

```
steganography/
├── backend/
│   ├── alembic/
│   ├── routers/
│   │   ├── steganography.py
│   │   └── schemas.py
│   ├── tests/
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```
