const express= require('express');
const { signup, login } = require('../controller/authentication/userAuth');
const passport = require('passport')
const router= express.Router();

router.post('/signup',signup);
router.post('/login',login);

router.get('/oauth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        const token = req.user.token;
        console.log(token);
        
        res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`); 
    }
)
module.exports =router;