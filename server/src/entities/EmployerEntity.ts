import {CreateEmployerInterface, EmployerInterface} from "../types/employerInterface";
import { EmployerModel } from "../frameworks/database/mongoDb/models/employerModel";

export class EmployerEntity {
  private model: EmployerModel;

  constructor(model: EmployerModel) {
    this.model = model;
  }

  public async getEmployerByEmail(email: string): Promise<EmployerInterface | null> {
    const employer = this.model.findOne({ email });
    return employer;
  }

  public async createEmployer(employer: CreateEmployerInterface): Promise<EmployerInterface> {
    const newEmployer =  this.model.create(employer);
    return newEmployer;
  }
}
