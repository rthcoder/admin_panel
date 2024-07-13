import Lids from "../model/lids.js";
import sendLidToBot from "../bot/bot.lid.js"

const GET = async (req, res, next) => {
    try {
        const lids = await Lids.find()


        return res
            .status(200)
            .json({
                status: 200,
                message: 'All lids',
                data: lids
            })

    } catch (error) {
        console.log(error.message);
        return next(error)

    }
}


const POST = async (req, res, next) => {
    try {

        let { name, phone_number } = req.body

        if (!name) {
            return res.status(403).json({
                message: "name is required",
                data: false
            })
        }

        if (!phone_number) {
            return res.status(403).json({
                message: "phone number is required",
                data: false
            })
        }

        name = name?.trim()
        phone_number = phone_number?.trim()


        const regexPhoneNumber = /^998[389][012345789][0-9]{7}$/

        if (!(regexPhoneNumber.test(phone_number))) {
            return res.status(403).json({
                message: "invalid phone number",
                data: false
            })
        }

        const new_lid = await Lids.create({
            client_name: name,
            client_number: phone_number
        })

        const msgtext = `
            📥New Lid
            👨‍💻From: ${req.body.name}
            📞Phone Number: +${req.body.phone_number}
        `

        let a = sendLidToBot.sendLidToBot(msgtext)


        return res
            .status(200)
            .json({
                status: 200,
                message: 'successully added new lid and sended via telegram bot',
                data: new_lid
            })


    } catch (error) {
        console.log(error.message);
        return next(error)
    }
}


export default {
    GET,
    POST
}