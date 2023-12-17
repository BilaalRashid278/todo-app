import todoModel from "../models/model.mjs";
import AuthModel from "../models/auth.mjs";

export const getAllData = async (req,res) => {
    const limit = req.query.limit;
    const skip = limit * (req.query.skip - 1);
    try {
        const data = await todoModel.find().skip(skip).limit(limit);
        res.send({
            success : true,
            data
        });
    } catch (error) {
        res.send({
            success : false,
            error
        })
    }
};


export const getAuthDetails = (req,res) => {
    res.send({
        isAuthicate : true,
        user : 'this user is authenticated'
    });
};


export const getUserAccountAllDetails = async (req,res) => {
    // console.log(req.query);
    try {
        const findUser = await AuthModel.findOne({email : req.query.email});
        if(findUser.email === req.query.email && findUser.password === req.query.password) {
            res.send({
                success : true,
                credentials : {
                    findUser
                }
            });
        }else{
            res.send({
                success : false,
                message : 'Please enter a valid email and password'
            });
        }
    } catch (error) {
        res.send({
            success : false,
            message : 'Please enter a valid email and password'
        });
    }
};