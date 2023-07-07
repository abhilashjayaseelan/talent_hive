import { CreateEmployerInterface, EmployerInterface } from "../types/employerInterface";
import { EmployerModel } from "../frameworks/database/mongoDb/models/employerModel";

export class EmployerEntity {
  private model: EmployerModel;

  constructor(model: EmployerModel) {
    this.model = model; 
  }

  public async getEmployerByEmail(email: string): Promise<EmployerInterface | null> {
    const employer = await this.model.findOne({ email }).exec();
    return employer;
  }

  public async createEmployer(employer: CreateEmployerInterface): Promise<EmployerInterface> {
    const newEmployer = await this.model.create(employer);
    return newEmployer;
  }

  public async getEmployerById(id: string) : Promise <EmployerInterface |null > {
    const employer = await this.model.findById(id);
    return employer;
  }

  public async updateEmployer(employerId: string, updates: Partial<EmployerInterface>): Promise<any> {
    const currentDetails = await this.model.findById(employerId);
    Object.assign(currentDetails ?? {}, updates);
    const updatedEmployer = await currentDetails?.save();
    return updatedEmployer;
  }
}
