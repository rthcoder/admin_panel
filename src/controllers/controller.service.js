import Service from "../model/services.js"
import fs from "fs"
import path from "path"

const GET = async (req, res, next) => {
    try {


        if (req.params.id) {
            const service = await Service.findById(req.params.id)

            if (!service) {
                return res.status(403).json({
                    message: "can not find service with this id",
                    data: false
                })
            }

            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'Get service by id',
                    data: service
                })
        }

        const services = await Service.find()


        return res
            .status(200)
            .json({
                status: 200,
                message: 'Succesfully get all services',
                data: services
            })


    } catch (error) {
        console.log(error.message);
        return next(error)

    }
}
const POST = async (req, res, next) => {
    try {

        let { service_title, about_service } = req.body

        console.log(req.body);

        service_title = service_title?.trim()
        about_service = about_service?.trim()

        if (!service_title) {
            return res.status(403).json({
                message: "service title required!",
                data: false
            })
        }

        if (!about_service) {
            return res.status(403).json({
                message: "description about service required!",
                data: false
            })
        }

        if (service_title.length > 25 || service_title.length <= 3) {
            return res.status(403).json({
                message: "Invalid length for service title. Length of serice title must be more then 3 and less then 25",
                data: false
            })
        }

        if (about_service.length > 10000 || about_service.length < 15) {
            return res.status(403).json({
                message: "Invalid length for service description title. Length of service description must be more then 15 and less then 100",
                data: false
            })
        }

        if (!req.files) {
            return res.status(403).json({
                message: "banner img is required",
                data: false
            })
        }

        const { name, data, size, mimetype } = req?.files?.files

        if (size > (10 * 1024 * 1024)) {
            return res.status(413).json({
                message: "The file larger than 10MB!",
                data: false
            })
        }

        if (!['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(mimetype)) {
            return res.status(415).json({
                message: "The file must be jpg, png or svg!",
                data: false
            })
        }

        const fileName = Date.now() + name.replace(/\s/g, '')
        const pathName = path.join(process.cwd(), 'uploads', fileName)
        fs.writeFileSync(pathName, data)

        const new_service = await Service.create({
            about_service,
            service_title,
            img: fileName
        })

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The service successfully added!',
                data: new_service
            })


    } catch (error) {
        console.log(error.message);
        return next(error)

    }
}
const PUT = async (req, res, next) => {
    try {

        let { service_title, about_service } = req.body

        service_title = service_title?.trim()
        about_service = about_service?.trim()


        if (service_title && service_title.length > 25 || service_title <= 3) {
            return res.status(403).json({
                message: "Invalid length for service service title.",
                data: false
            })
        }

        const updated_service = await Service.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    service_title,
                    about_service
                }
            },
            { new: true, useFindAndModify: false }
        )

        if (!updated_service) {
            return res.json({
                message: "cannot find service with this id. Invalid id",
                data: false
            })
        }



        return res
            .status(200)
            .json({
                status: 200,
                message: 'The service successfully updated!',
                data: updated_service
            })



    } catch (error) {
        console.log(error.message);
        return next(error)

    }
}

const DELETE = async (req, res, next) => {
    try {
        const deleted = await Service.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.json({
                message: "Something went wrong. cannot delete",
                data: false
            })
        }

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The service successfully deleted!',
                data: false
            })


    } catch (error) {
        console.log(error.message);
        return next(error)

    }
}


export default {
    GET,
    POST,
    PUT,
    DELETE
}
