const express = require('express');
const router = express.Router();

//custom middleware
const auth = require('../middlewares/auth');

//destructuring of userAuthControllers
const { register, login, dashboard } = require('../controllers/userAuthControllers');

router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", auth, dashboard);

//destructuring of userControllers
const { home, createUser, getUsers, editUser } = require('../controllers/userControllers');

//user routes
router.get('/', home);
router.post('/createuser', createUser);
router.get('/getusers', getUsers);
router.put('/edituser/:id', editUser);

module.exports = router;
