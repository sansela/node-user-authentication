const express = require('express')
const bcrypt = require('bcrypt')
const app = express();

app.use(express.json())

let users = [];

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt() //10 or any integer can be password for strong salt and in turn strong password
        // const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const hashedPassword = await bcrypt.hash(req.body.password, 10) //alternative way
        users.push({name: req.body.name, password: hashedPassword})
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    
    const user = users.find((user) => user.name === req.body.name)
    if(user == null) {
        res.status(400).send('User Not Found')
    }

    try {
       if(await bcrypt.compare(req.body.password, user.password)) {
           res.send('Login Successful!')
       }
       else {
           res.send('Un authorized login')
       }

    }
    catch {
        res.status(500).send()
    }
})

app.listen(3000, ()=> console.log('app started successfully'));