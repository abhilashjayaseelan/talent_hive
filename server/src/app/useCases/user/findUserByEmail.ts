import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const findByEmail = async (email: string, dbRepositoryUser: ReturnType<UserDbInterface>) => {
    const user = await dbRepositoryUser.getUserByEmail(email);
    if( !user) {
        throw new AppError('user not found', HttpStatus.BAD_REQUEST)
    }
    return user;
}

