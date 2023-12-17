import mongoose from "mongoose";


// const ConnectToDB = () => {
//     console.log('Connecting to Database...');
//     mongoose.connect(`${process.env.DB_URI}/todo-app`).then(() => {
//         console.log('Succeeded to connect database');
//     }).catch(err => console.log(err));
// };
const ConnectToDB = () => {
    console.log('Connecting to Database...');
    mongoose.connect(`mongodb://127.0.0.1:27017/todo-app`).then(() => {
        console.log('Succeeded to connect database');
    }).catch(err => console.log(err));
};

export default ConnectToDB;
