import app from './app.js'
import { connectToDb } from './db/index.js'
import { config } from 'dotenv';
config()
import { ApiError } from "./utils/ApiError.js"

app.get("/", (req, res) => {
    res.send("Hello World!")
})

connectToDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to Server", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
        throw new ApiError(400, "Couldn't connect to database!")
    })
