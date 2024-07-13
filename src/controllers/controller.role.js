import Role from '../model/roles.js'



const GET = async(req, res, next) => {

    try {
        if(req.params.id) {
            const id = req.params.id
            const role = await Role.findById(id)
            console.log(Role);
            if(!role){
                return res.status(403).json({
                    message: "can not find role with this id",
                    data: false
                })     
            }

            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'Get role by id',
                    data: role
                })

        }

        const roles = await Role.find()

        return res
                .status(200)
                .json({
                    status: 200,
                    message: 'All roles',
                    data: roles
                })
        
    } catch (error) {
        
        console.log(error.message);
        return next(error)
        
    }

}

const POST = async(req, res, next) => {

    try {

        let { role_title } = req?.body

        role_title = role_title.trim()

        if(!role_title) {
            return res.status(403).json({
                message: "role title is required",
                data: false
            })    
        }

        const new_role = await Role.create({
            role_title
        })

        return res
                .status(200)
                .json({
                    status: 200,
                    message: 'new role is succesfully added',
                    data: new_role
                })
        
    } catch (error) {
        
        console.log(error.message);
        return next(error)
        
    }
    
}

const PUT = async(req, res, next) => {

    try {

        let {role_title} = req.body

        role_title = role_title.trim()

        const role = await Role.findByIdAndUpdate(
            {_id: req.params.id},
            { $set: {
                role_title
            }},
            { new: true, useFindAndModify: false }
        )

        return res
                .status(200)
                .json({
                    status: 200,
                    message: 'role is succesfully updated',
                    data: role
                })
        
    } catch (error) {
        
        console.log(error.message);
        return next(error)
        
    }
    
}


const DELETE = async(req, res, next) => {

    try {
        await Role.findByIdAndDelete(req.params.id)
        return res
                .status(200)
                .json({
                    status: 200,
                    message: 'role is succesfully deleted',
                    data: false
                })
    } catch (error) {
        
        console.log(error.message);
        return next(error)
        
    }
    
}


export default {
    GET, POST, PUT, DELETE
}