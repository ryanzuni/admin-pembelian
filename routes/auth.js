const express = require('express');
const router = express.Router();
const db = require('../db'); // Tambahkan koneksi ke database

// Halaman Login (tanpa layout)
router.get('/login', (req, res) => {
  res.render('login', { layout: false, error: null });
});

// Login logic
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    req.session.loggedIn = true;
    res.redirect('/dashboard');
  } else {
    res.render('login', { layout: false, error: 'Username atau password salah' });
  }
});

// Middleware proteksi
function isAuthenticated(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Route Dashboard - Ambil data pembelian dari database
router.get('/dashboard', isAuthenticated, (req, res) => {
  const sql = 'SELECT * FROM pembelian ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('dashboard', { layout: 'layout', pembelianList: results });
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
