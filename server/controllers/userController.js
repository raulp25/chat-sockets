const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const { response } = require('express');

module.exports.register = async(req, res, next) => {
    try {
        const {  username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.status(500).json({
                status: false, 
                ok: false,
                type: 'POST',
                msg: 'Username already registered',
            })
        }
    
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(500).json({
                status: false, 
                ok: false,
                type: 'POST',
                msg: 'Email already registered',
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        delete user.password;
        
        return res.status(201).json({
            status: true,
            ok: true,
            type: 'POST',
            msg: 'register success',
            user,
        });

    } 
    catch (error) {
        next(error);
    }
}

module.exports.login = async(req, res, next) => {
    try {
        const {  username, password } = req.body;
        
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                status: false, 
                ok: false,
                type: 'POST',
                msg: 'Incorrect Username or Password',
            })
        };
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({
            status: false, 
            ok: false,
            type: 'POST',
            msg: 'Incorrect Username or Password',
        });

        delete user.password;
 
        return res.status(201).json({
            status: true,
            ok: true,
            type: 'POST',
            msg: 'login correct',
            user,
        });

    } 
    catch (error) {
        next(error);
    }

    
}


module.exports.getAllUsers = async(req, res, next) => {
    try {
        const users = await User.find({ _id:{ $ne: req.params.id } }).select([
            "email",
            "username",
            "_id"
        ]);
        
        return res.json(users);
    } 
    catch (error) {
        next(error);
    }
}