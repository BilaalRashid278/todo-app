import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : (email) => {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return emailRegex.exec(email);
            },
            message : 'Please enter a valid email address'
        }
    },
    password : {
        type : String,
        required : true,
        minLength : [8,'Password length must be between 8']
    },
    token : {
        type : String,
        required : true,
        unique : true,
    }
});

const AuthModel = mongoose.model('accounts',authSchema);

export default AuthModel;

