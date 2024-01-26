const express = require('express');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(0).required(),
    city: Joi.string().min(1).max(30)
});

let uniqueID = 1;
const app = express();
const pathDB = path.join(__dirname, 'users.json');

app.get('/users', (req, res) => {
    res.send(fs.readFileSync(pathDB));
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathDB));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    };
});

app.post('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathDB));
    uniqueID += 1;

    users.push({
        id: uniqueID,
        ...req.body
    });
    fs.writeFileSync(pathDB, JSON.stringify(users, null, 2));
    res.send({ id: uniqueID });
});

app.get('/users', (req, res) => {
    res.send(fs.readFileSync(pathDB));
});

app.put('/users/:id', (req, res) => {
    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    };
    const users = JSON.parse(fs.readFileSync(pathDB));
    let user = users.find((user) => user.id === Number(req.params.id));
    // let user = users.find((user) => user.id === Number(req.params.id)); use with coment in if

    if (user) {
        // user = {
        //     ...user,
        //     ...req.body
        // };
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(pathDB, JSON.stringify(users, null, 2));
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    };
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathDb));
    let user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFileSync(pathDb, JSON.stringify(users, null, 2));
    } else {
        res.status(404);
        res.send({ user: null });
    }
});



const port = 3000;

app.listen(port, () => { console.log(`Sever started at port ${port}`); });