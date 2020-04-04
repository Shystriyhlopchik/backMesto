const express = require('express');
const routes = require('./routes/routes.js');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})