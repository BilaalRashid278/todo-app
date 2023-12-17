import app from "./app.mjs";
import dotenv from 'dotenv';
import ConnectToDB from "./database/db.mjs";
dotenv.config();
const PORT = process.env.PORT
ConnectToDB();

app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});