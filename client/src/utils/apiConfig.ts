import configKeys from "./config";

const apiConfig = {
    userRegister : `${configKeys.API_URL}user/register`,
    userLogin: `${configKeys.API_URL}user/login`,
    employerRegister: `${configKeys.API_URL}employer/register`,
    employerLogin: `${configKeys.API_URL}employer/login`
}

export default apiConfig;