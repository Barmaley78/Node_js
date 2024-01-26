const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const pathJSON = path.join(__dirname, "counters.json");

if (fs.existsSync(pathJSON)) {
    const counters = [{
            page: "/",
            count: 0
        },
        {
            page: "/about",
            count: 0
        },
    ]
    fs.writeFileSync(pathJSON, JSON.stringify(counters, null, 2), (error) => {
        if (error) return console.log(error);
    });
}

app.get('/', (req, res) => {
    fs.readFileSync(pathJSON, "utf-8", (error, data) => {
        if (error) return console.log(error);
        let page = JSON.parse(data, "utf-8");
        page[0].count += 1;
        fs.writeFileSync(pathJSON, JSON.stringify(page, null, 2), (error) => {
            if (error) return console.log(error);
        });
        res.send(`
         <h1>Main Page</h1>
         <p>Visits ${page[0].count}</p>
         <a href="/about">Go to About Page</a>
      `);
    });
});

app.get('/about', (req, res) => {
    fs.readFileSync(pathJSON, "utf-8", (error, data) => {
        if (error) return console.log(error);
        let page = JSON.parse(data, "utf-8");
        page[1].count += 1;
        fs.writeFileSync(pathJSON, JSON.stringify(page, null, 2), (error) => {
            if (error) return console.log(error);
        });
        res.send(`
         <h1>About Page</h1>
         <p>Visits ${page[1].count}</p>
         <a href="/">Go to Main Page</a>
      `);
    });
});

app.listen(3000, () => console.log("Server started at port 3000"));