const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
}));

// View engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout'); // default layout

// Routes
const authRoutes = require('./routes/auth');
const pembelianModule = require('./routes/pembelian');
const chatRouter = require('./routes/chat');

app.use('/', authRoutes);
app.use('/pembelian', pembelianModule.router); // <- gunakan `.router`
app.use('/chat', chatRouter);

// Mulai server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
