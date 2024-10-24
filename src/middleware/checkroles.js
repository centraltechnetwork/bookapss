import { User } from "../model/users/users.js";
import httpStatus from "http-status";

const checkRoles = (roles) =>{
    return(req,res,next) => {
        try {

        //get user id from request body
        const {id} = req.body;

        //find the user id
        const user = User.findById(id);

        //check if the user role exists
        if(!user || !roles.includes('user.role')){
            return res.status(httpStatus.UNAUTHORIZED).json({
                status: 'error',
                message: "access denied",
            });
        }
        //move to the next middleware
        next();
            
        } catch (error) {
            console.error(error);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Invalid",
            });
            
        }
       
    }
}

export {checkRoles}