var express = require('express');
var router = express.Router();
const cors = require('cors'); // corsミドルウェアを追加
require('dotenv').config();

// CORSを有効化
router.use(cors());

// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
  try {
    // データベース、コレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    // 全てのドキュメントを取得
    const note = await notes.find({}).toArray();

    res.json(note); // データをJSONで返す
  } catch (error) {
    res.status(500).send('サーバーエラーが発生しました: ' + error.message);
  }
});

module.exports = router;
