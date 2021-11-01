const express = require('express')
//ユーザーモデルのインポート
const User = require('../model/database')

const router = express.Router()

router
    //GET ログインページ
    .get('/login', (req, res) => {
        res.render('login')
    })
    //POST ログインページ
    .post('/login-form', (req, res) => {
        User.findOne({ "username": req.body.username, "password": req.body.password }, (error, admin) => {
            if (admin != "") {
                req.session.admin = admin._id
            }
            res.send(admin._id)
        })
    })
    //GET ログアウト
    .get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/login')
    })
    //GET 新規アカウント作成
    .get('/register', (req, res) => {
        res.render('register')
    })
    //POST 新規アカウント作成
    .post('/register-form', (req, res) => {
        const { username, password, password1 } = req.body;
        if (!username || !password) {
            return res.send('すべての項目を入力してください！')
        }
        if (!password1 !== !password) {
            return res.send('パスワードは一致しません！')
        }
        const newUser = new User({ username, password })
        //データベースにデータを保存
        newUser
            .save()
            .then((admin) => {
                console.log('新規作成成功！')
                if (admin != "") {
                    req.session.admin = admin._id
                }
                res.send(admin._id)
            })
            .catch((err) => console.log(err))
    })
    .get('/', async (req, res) => {
        const Username = await User.findOne()
        if (req.session.admin) {
            res.render('index', { username: Username.username })
        } else {
            res.redirect('/login')
        }
    })
module.exports = router;