const express = require('express');
const router = express.Router();

let pembelianList = []; // Simpan data sementara

router.get('/', (req, res) => {
  res.render('form-pembelian', { layout: 'layout' });
});

router.post('/', (req, res) => {
  const { produk, jumlah } = req.body;
  pembelianList.push({ id: Date.now(), produk, jumlah });
  res.redirect('/dashboard');
});

router.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pembelianList = pembelianList.filter(item => item.id !== id);
  res.redirect('/dashboard');
});

// Ekspor router dan data pembelian
module.exports = {
  router,
  pembelianList,
};
