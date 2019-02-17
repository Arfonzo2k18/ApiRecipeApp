const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

// Rutas usuarios.
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile/:id', ctrlUser.getUserProfile);
router.get('/allUsers',ctrlUser.allUsers);

module.exports = router;