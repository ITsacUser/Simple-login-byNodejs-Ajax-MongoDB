//フレームワークのインポート
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require("mongoose")
let session = require('express-session')

//sessionを使う
app.use(session({
    key: 'admin',
    secret: 'any random string'
  }))
//ポートを定義
const port = 3000

//パブリックフォルダーを定義
app.use(express.static('public'))
//JSテンプレートの定義
app.set('view engine', 'ejs')
//body parserの設定
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//MongoDB接続
const mongourl = 'mongodb://localhost:27017/login' //MongoDBのURL
mongoose.connect(
  mongourl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MongoDBへ接続成功！")
  }
);

//Routesのインポート（ログイン処理）
app.use(require("./routes/controller"))

//サーバー設定
app.listen(port, () => console.log("ポート3000でサーバーに接続成功！"));