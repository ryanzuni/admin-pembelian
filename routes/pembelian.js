const express = require('express');
const router = express.Router();
const db = require('../db'); // import koneksi database

router.get('/', (req, res) => {
  res.render('form-pembelian', { layout: 'layout' });
});

router.post('/', (req, res) => {
  const { produk, jumlah } = req.body;

  const sql = 'INSERT INTO pembelian (produk, jumlah) VALUES (?, ?)';
  db.query(sql, [produk, jumlah], (err, result) => {
    if (err) throw err;
    res.redirect('/dashboard');
  });
});

router.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM pembelian WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/dashboard');
  });
});

module.exports = {
  router
};
