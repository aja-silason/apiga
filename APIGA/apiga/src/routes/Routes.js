const express = require('express');
const Route = express.Router();

const path = require('path');
const Login = require('../model/Login');

const isAutenticated = (req,res, prev, next)=>{
    if(req.session.loggedin){
        next();
        return;
    } else{
        res.redirect('/login');
    }
}

Route.get('/login', isAutenticated, (req, res)=>{
    res.sendFile(path.join(__dirname+'/../view/index.html'));

});


Route.post('/login', Login.logar);



// Niveis de acesso

Route.get('/ceo', isAutenticated, (req, res)=>{

    req.session.loggedin = true;
    res.sendFile(path.join(__dirname+'/../view/pages/ceo/home.html'));
});

Route.get('/manager', isAutenticated, (req, res)=>{

    req.session.loggedin = true;
    res.sendFile(path.join(__dirname+'/../view/pages/manager/home.html'));
});


module.exports = Route;