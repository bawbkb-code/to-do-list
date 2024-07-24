const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8000;

let todos = [];
let currentId = 1;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Todo List App!');
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

// จะรับข้อมูลเป็น json {"content":"..."} แบบนี้เท่านั้น
app.post('/todos', (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    const newTodo = {
        id: currentId++,
        content: content
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(204).send();
});


app.listen(port, () => {
    console.log('Listening on port: ' + port);
});
