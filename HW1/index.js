const http = require('http');
let indexPageVisitCounter = 0;
let aboutPageVisitCounter = 0;
const server = http.createServer((req, res) => {
    console.log('Запрос получен');

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        indexPageVisitCounter++;
        res.end(
            `<h1>Добро пожаловать на мой сайт!</h1>
            <a href="/about">Обо мне</a>
            <p>Вы вошли на эту страницу ${indexPageVisitCounter} раз</p>
            `);
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        aboutPageVisitCounter++;
        res.end(
            `
            <h1>Обо мне</h1>
            <a href="/">Главная</a>
            <p>Вы вошли на эту страницу ${aboutPageVisitCounter} раз</p>

            `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`
        <h1>404</h1>
        <br>
        <h3>Страница не найдена!</h3>
        `);
    };


});
const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});