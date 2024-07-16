import fs from "fs"
import path from "path"
import Staff from "../model/staffs.js"
import sha256 from "sha256"

const GET = async (req, res, next) => {
    try {


        if (req.params.staffid) {

            const staff = await Staff.findById(req.params.staffid)

            if (!staff) {
                return res.status(403).json({
                    message: "can not find staff with this id",
                    data: false
                })
            }

            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'All users',
                    data: staff
                })
        }

        const staffs = await Staff.find().select(['-_id staff_first_name'])

        return res
            .status(200)
            .json({
                status: 200,
                message: 'All users',
                data: staffs
            })


    } catch (error) {
        console.log(error.message);
        return next(error)
    }
}

const POST = async (req, res, next) => {
    try {

        let {
            staff_first_name,
            staff_last_name,
            staff_phone_number,
            username,
            password,
            img,
            staff_role
        } = req.body


        staff_first_name = staff_first_name?.trim()
        staff_last_name = staff_last_name?.trim()
        staff_phone_number = staff_phone_number?.trim()
        username = username?.trim()
        password = password?.trim()
        staff_role = staff_role?.trim()


        if (!staff_first_name) {
            return res.status(403).json({
                message: "First name is required",
                data: false
            })
        }


        if (!staff_last_name) {
            return res.status(403).json({
                message: "Last name is required",
                data: false
            })
        }

        if (!staff_phone_number) {
            return res.status(403).json({
                message: "Phone number is required",
                data: false
            })
        }

        if (!username) {
            return res.status(403).json({
                message: "username is required",
                data: false
            })
        }

        if (!password) {
            return res.status(403).json({
                message: "password is required",
                data: fasle
            })
        }



        // if(!staff_role) {
        //     return res.status(403).json({
        //         message: "Role is required",
        //         data: false
        //     })
        // }



        if (staff_first_name.length > 20 || staff_first_name.length < 2) {
            return res.status(403).json({
                message: "Invalid length for first name. Length of first name must be more then 2 and less then 15",
                data: false
            })
        }

        if (staff_last_name.length > 20 || staff_last_name.length < 2) {
            return res.status(403).json({
                message: "Invalid length for last name. Length of last name must be more then 2 and less then 15",
                data: false
            })
        }

        const regexPhoneNumber = /^998[389][012345789][0-9]{7}$/
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

        if (!(regexPhoneNumber.test(staff_phone_number))) {
            return res.status(403).json({
                message: "invalid phone number",
                data: false
            })
        }

        if (username.length > 15 || username.length <= 2) {
            return res.status(403).json({
                message: "Invalid length for username. Length of username must be more then 2 and less then 15",
                data: false
            })
        }

        if (!(regexPassword).test(password)) {
            return res.status(403).json({
                message: "invalid password. password must include capital and little letters, number and symbol",
                data: false
            })
        }

        if (!req.files) {
            return res.status(403).json({
                message: "profile img is required",
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



        const new_staff = await Staff.create({
            staff_first_name,
            staff_last_name,
            staff_phone_number,
            username,
            password: sha256(password),
            img: fileName,
            staff_role: '668e2cefdae9cddfc6f950d4'
        })


        return res
            .status(200)
            .json({
                status: 200,
                message: 'The staff successfully added!',
                data: new_staff
            })




    } catch (error) {
        console.log(error.message);
        return next(error)
    }
}


const PUT = async (req, res, next) => {
    try {

        let {
            staff_first_name,
            staff_last_name,
            staff_phone_number,
            username,
            password,
            img,
            staff_role
        } = req.body


        staff_first_name = staff_first_name?.trim()
        staff_last_name = staff_last_name?.trim()
        staff_phone_number = staff_phone_number?.trim()
        username = username?.trim()
        password = password?.trim()
        staff_role = staff_role?.trim()

        if (staff_first_name && (staff_first_name.length > 20 || staff_first_name.length < 2)) {
            return res.status(403).json({
                message: "Invalid length for first name. Length of first name must be more then 2 and less then 15",
                data: false
            })
        }

        if (staff_last_name && (staff_last_name.length > 20 || staff_last_name.length < 2)) {
            return res.status(403).json({
                message: "Invalid length for last name. Length of last name must be more then 2 and less then 15",
                data: false
            })
        }

        const regexPhoneNumber = /^998[389][012345789][0-9]{7}$/
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

        if (staff_phone_number && !(regexPhoneNumber.test(staff_phone_number))) {
            return res.status(403).json({
                message: "invalid phone number",
                data: false
            })
        }

        if (username && (username.length > 15 || username.length <= 2)) {
            return res.status(403).json({
                message: "Invalid length for username. Length of username must be more then 2 and less then 15",
                data: false
            })
        }

        if (password && !(regexPassword).test(password)) {
            return res.status(403).json({
                message: "invalid password. password must include capital and little letters, number and symbol",
                data: false
            })
        }


        const staff = await Staff.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    staff_first_name,
                    staff_last_name,
                    staff_phone_number,
                    username,
                    password,
                    img,
                    staff_role
                }
            },
            { new: true, useFindAndModify: false }
        )

        if (!staff) {
            return res.status().json({
                message: "Can not find staff",
                data: false
            })
        }

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The staff successfully updated!',
                data: staff
            })

    } catch (error) {
        console.log(error.message);
        return next(error)
    }
}

const DELETE = async (req, res, next) => {
    try {

        const staffid = req?.params?.id

        await Staff.findByIdAndDelete(staffid)

        return res
            .status(200)
            .json({
                status: 200,
                message: 'The staff successfully deleted!',
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
