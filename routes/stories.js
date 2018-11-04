const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');



//Stories Index

router.get('/', (re, res) => {
    res.render('stories/index');
});

//Add stories form

router.get('/add',ensureAuthenticated , (re, res) => {
    res.render('stories/add');
});

module.exports = router;