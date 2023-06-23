import { UserModel } from "../frameworks/database/mongoDb/models/userModel";
import { CreateUserInterface, UserInterface } from "../types/userInterface";

export class UserEntity {
    private model : UserModel;

    constructor(model: UserModel) {
        this.model = model;
    }

    public async getUserByEmail(email: string) : Promise < UserInterface | null>{
        const user: any = await this.model.findOne({email});
        return user;
    }

    public async creteUser (user: CreateUserInterface) : Promise<UserInterface> {
        const newUser: any = await this.model.create(user);
        return newUser;
    }

    public async getUserDataById (id: string) : Promise <UserInterface | null> {
        const userData: any = await this.model.findById(id);
        return userData;
    }

    public async updateUser (id: string, updates: Partial<UserInterface>) : Promise <any> {
        const currentDetails = await this.model.findById(id);
        Object.assign(currentDetails ?? {}, updates);
        const updatedUser = await currentDetails?.save();
        return updatedUser;
    }

    public async resumeDelete (id: string) :Promise <any> {
        await this.model.updateOne({_id: id}, {$unset: {resume: ''}});
    }
}