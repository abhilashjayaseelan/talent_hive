import configKeys from "./config";

const apiConfig = {
    userRegister : `${configKeys.API_URL}user-auth/register`,
    userLogin: `${configKeys.API_URL}user-auth/login`,
    employerRegister: `${configKeys.API_URL}employer-auth/register`,
    employerLogin: `${configKeys.API_URL}employer-auth/login`,
    userData: `${configKeys.API_URL}user/user-data`,
    employerJObs: `${configKeys.API_URL}job/employer-jobs`,
    createNewJob: `${configKeys.API_URL}job/create-job`,
    updateJob: `${configKeys.API_URL}job/update-job`,
    jobData: `${configKeys.API_URL}job/job-data`
}

export default apiConfig;