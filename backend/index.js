const express = require('express');
const app = express()
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//import another method 
const dbConnect = require('./db/dbConnect')
const User = require('./db/dbUser')
const auth = require('./auth')

app.use(express.json())
app.use(cors())

app.get('/auth', auth, (req, res) => {
    return res.json({ message: "You are authorized to access me" })
})

app.post('/register', (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hasedPassword) => {
            const user = new User({
                email: req.body.email,
                password: hasedPassword
            })
            user.save()
                .then((result) => {
                    res.status(201).send({
                        message: 'User create success',
                        result,
                    })
                })
                .catch((e) => {
                    res.status(500).send({
                        message: 'Error create user',
                        e
                    })
                })
        })
        .catch((e) => {
            res.status(500).send({
                message: 'password was not hash',
                e
            })
        })
})

app.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password)
                .then((pass) => {
                    if (!pass) {
                        return res.status(400).send({
                            message: 'password not match',
                            error
                        })
                    }

                    const token = jwt.sign({
                        userId: user._id,
                        userEmail: user.email,
                    },
                        'RENDOM TOKEN',
                        { expiresIn: '24h' });

                    res.status(200).send({
                        message: 'login success',
                        email: user.email,
                        token,
                    })
                })
                .catch((e) => {
                    res.status(500).send({
                        message: "password does not match",
                        e
                    })
                })
        })
        .catch((e) => {
            res.status(500).send({
                message: 'Email not found',
                e
            })
        })
})

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndRemove(userId)
        .then(() => {
            res.status(200).send({
                message: 'User deleted successfully',
            });
        })
        .catch((e) => {
            res.status(500).send({
                message: 'Error deleting user',
                error: e,
            });
        });
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;

    const updatedUser = {
        email: req.body.email,
        password: req.body.password,
    };

    User.findByIdAndUpdate(userId, updatedUser, { new: true })
        .then((result) => {
            res.status(200).send({
                message: 'User updated successfully',
                result,
            });
        })
        .catch((e) => {
            res.status(500).send({
                message: 'Error updating user',
                error: e,
            });
        });
});

dbConnect();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
})

app.listen('3000', () => {
    console.log('listen port 3000');
})