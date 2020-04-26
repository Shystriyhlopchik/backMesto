# backMesto
## RU

_v2.11.3 - Добавлены проверка валидации, обработка ошибок и сбор логов._

backMesto &mdash; создание бекенда для проекта Mesto, созданный в рамках спринтов 13-15 учебной программы [Яндекс.Практикума](https://praktikum.yandex.ru/profile/web-developer/). В качестве БД используется MongoDB.

### домен
    http://andreeffdimka.ru/

### ip DNS-сервера
    84.201.157.39

### Возможности сервера
1. Зарегистрировать нового пользователя: POST http://localhost:3000/signup 
2. Залогиниться: POST http://localhost:3000/signin 
3. Получить страницу в корне сайта (страница в данный момент отсутствует): http://localhost:3000/
4. Получить JSON файл со всеми пользователми: GET http://localhost:3000/users
5. Получить JSON файл со всеми карточками: GET http://localhost:3000/cards
6. Получить JSON с данными конкретного пользователя: GET http://localhost:3000/users/id
7. Создать карточку: POST http://localhost:3000/cards
8. Удалить карточку, если её создал текущий пользователь: DELETE http://localhost:3000/cards/id
9. Обновить профиль текущего пользователя: PATCH http://localhost:3000/users/me
10. Обновить аватар текущего пользователя: PATCH http://localhost:3000/users/me/avatar

### В планах
1. Возможность добавления лайка
2. Возможность убрать лайк


### Как запустить его локально

    Клонировать репозиторий

$> git clone https://github.com/Shystriyhlopchik/backMesto

    Установить зависимости

$> npm install

    На локальной машине должна быть установлена MongoDB. Инструкцию по установке можно найти на официальном сайте.    

    Установленную MongoDB необходимо запустить с помощью команды:

$> mongod

    Для запуска проекта в режиме разработки

$> npm run dev

    Для запуска проекта

$> npm run start


### Использованные технологии
+ Node.js
+ Express.js
+ MongoDB
+ Mongose
.


[To top/Наверх](#backMesto)
