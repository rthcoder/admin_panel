import Partners from "../model/partners.js"
import path from "path"
import fs from "fs"


const GET = async (req, res, next) => {
    try {

        if (req.params.id) {
            const partner = await Partners.findById(req.params.id)

            if (!partner) {
                return res.status(403).json({
                    message: "can not find partners with this id",
                    data: false
                })
            }

            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'Get partners by id',
                    data: partner
                })
        }

        const partners = await Partners.find()


        return res
            .status(200)
            .json({
                status: 200,
                message: 'Succesfully get all partners',
                data: partners
            })

    } catch (error) {
        console.log(error.message);
        return next(error)
    }
}


const POST = async (req, res, next) => {
    try {

        let { partner_title, about_partner } = req?.body

        if (!partner_title) {
            return res.status(403).json({
                message: "parner title is required",
                data: false
            })
        }

        if (!about_partner) {
            return res.status(403).json({
                message: "description about partner is required",
                data: false
            })
        }

        if (partner_title.length > 25 || partner_title.length <= 3) {
            return res.status(403).json({
                message: "Invalid length for partner title. Length of partner title must be more then 3 and less then 25",
                data: false
            })
        }

        if (about_partner.length > 50 || about_partner.length <= 10) {
            return res.status(403).json({
                message: "Invalid length for about partner . Length of desvription about partner must be more then 10 and less then 50",
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

        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(mimetype)) {
            return res.status(415).json({
                message: "The file must be jpg or png!",
                data: false
            })
        }

        const fileName = Date.now() + name.replace(/\s/g, '')
        const pathName = path.join(process.cwd(), 'uploads', fileName)
        fs.writeFileSync(pathName, data)

        const new_service = await Partners.create({
            partner_title,
            about_partner,
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

        let { partner_title, about_partner } = req.body

        partner_title = partner_title?.trim()
        about_partner = about_partner?.trim()

        if (partner_title && partner_title.length > 25 || partner_title <= 3) {
            return res.status(403).json({
                message: "Invalid length for partner title.",
                data: false
            })
        }

        if (about_partner && about_partner.length > 50 || about_partner <= 10) {
            return res.status(403).json({
                message: "Invalid length for description pertner.",
                data: false
            })
        }

        const update_partner = await Partners.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    partner_title,
                    about_partner
                }
            },
            { new: true, useFindAndModify: false }
        )

        if (!update_partner) {
            return res.json({
                message: "cannot find partner with this id. Invalid id",
                data: false
            })
        }



        return res
            .status(200)
            .json({
                status: 200,
                message: 'The partner successfully updated!',
                data: update_partner
            })



    } catch (error) {
        console.log(error.message);
        return next(error)

    }
}


const DELETE = async (req, res, next) => {
    try {

        const deleted = await Partners.findByIdAndDelete(req.params.id)
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
