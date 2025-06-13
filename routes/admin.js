const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Halaman dashboard admin
router.get('/admin/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});

// Halaman pembelian
router.get('/admin/pembelian', isLoggedIn, (req, res) => {
  const pembelian = [
    { id: 1, nama: 'Budi', produk: 'Laptop' },
    { id: 2, nama: 'Sari', produk: 'HP' }
  ];
  res.render('pembelian', { pembelian });
});

// Halaman chat (dummy)
router.get('/admin/chat', isLoggedIn, (req, res) => {
  res.render('chat');
});

module.exports = router;
