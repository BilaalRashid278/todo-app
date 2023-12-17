import crypto from 'crypto';
import todoModel from "../models/model.mjs";
import AuthModel from '../models/auth.mjs';


export const createNewTodo = async (req,res) => {
    try {
        const created = await todoModel.insertMany([req.body]);
        res.send({
            success : true,
            created
        });
    } catch (error) {
        res.send({
            success : false,
            error
        });
    }
};


export const createUserAuth = async (req,res) => {
    console.log(req.body);
    const token = crypto.randomBytes(32).toString('hex');
    try {
        const userDetails = {
            email : req.body.email,
            password : req.body.password,
            token : token
        };
        const credintials = await AuthModel.insertMany([userDetails]);
        res.send({
            success : true,
            message : 'Account created successfully',
            credintials
        })
    } catch (error) {
        res.send({
            success : false,
            message : 'Account not created',
            error
        })
    }
};


