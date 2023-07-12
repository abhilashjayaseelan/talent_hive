export interface UserInterface {
  _id?: any;
  name?: string;
  email?: string;
  phone?: string;
  image?: any;
  resume?: string;
  about?: string;
  profession?: string;
  location?: string;
  skills?: Array<string>;
  experience?: {
    position?: string;
    companyName?: string;
    startDate?: Date;
    endDate?: Date | string;
  }
}
