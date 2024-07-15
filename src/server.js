import fs from "fs"
import path from "path"
import "./config/config.js"
import express from 'express'
import fileUpload from 'express-fileupload'
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3001

//middlewares
app.use(cors());
app.use(fileUpload())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'uploads')))

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

app.get('/', (req, res) => res.send("Hello"))

//database function
import database from "./config/config.db.js"

// routes
import authRouter from "./routes/routes.auth.js"
import staffRouter from "./routes/route.staff.js"
import roleRouter from "./routes/routes.role.js"
import serviceRouter from "./routes/route.service.js"
import lidsRouter from './routes/route.lids.js'
import partnerRouter from './routes/route.partner.js'

!async function () {
    try {
        database()
        app.use(authRouter)
        app.use(staffRouter)
        app.use(roleRouter)
        app.use(serviceRouter)
        app.use(lidsRouter)
        app.use(partnerRouter)
    } catch (error) {
        console.log(error)
    }
    app.use((error, req, res, next) => {

        fs.appendFileSync('./log.txt', `${req.url}__${req.method}__${Date.now()}__${error.name}__${error.message}\n`)

        if (error.name == 'ValidationError') {
            return res.status(error.status).json({
                status: error.status,
                message: error.message,
                errorName: error.name,
                error: true,
            })
        }


        if (error.status != 500) {
            error.status = error.status ? error.status : 404
            return res.status(error.status).json({
                status: error.status,
                message: error.message,
                errorName: error.name,
                error: true,
            })
        }


        return res.status(error.status).json({
            status: error.status,
            message: 'Internal Server Error',
            errorName: error.name,
            error: true,
        })
    })
    app.listen(PORT, () => console.log(`🚀 BackEnd server is running http://localhost:` + PORT))
}()
