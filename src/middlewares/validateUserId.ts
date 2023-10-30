import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/ApiResponse";


function areValuesEqual(value1: string, value2: string): boolean {
    return value1 === value2;
}


export default function validateUserIdToken(req: Request, res: Response, next: NextFunction) {


    const httpMethod = req.method; 

    if (httpMethod === "GET" || httpMethod === "DELETE") {
        const paramUserId = req.params.userId;
        const {idUserToken} = req.body;

        if (!areValuesEqual(paramUserId, idUserToken)) {
            return ApiResponse.unauthorized(res, "Unauthorized access");
        }else{
            next();
        }

    } else {
        const {idUserToken, userId} = req.body;
        
        if (!areValuesEqual(userId, idUserToken)) {
            return ApiResponse.unauthorized(res, "Unauthorized access");
        }else{
            next();
        }
       
    }

}

