const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

// Загрузка переменных окружения
dotenv.config();

// Создание экземпляра приложения
const app = express();

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
console.log('MongoDB URI:', process.env.MONGO_URI);

// Middleware для обработки JSON
app.use(express.json());

// Подключение маршрутов
app.use('/api', userRoutes);

// Пример маршрута
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});