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
    deleteJob: `${configKeys.API_URL}job/delete-job`,
    jobData: `${configKeys.API_URL}job/job-data`,
    employerData: `${configKeys.API_URL}employer/employer-data`,
    allJobs: `${configKeys.API_URL}job/all-jobs`,
    applyJob: `${configKeys.API_URL}job-application/create-application`,
    isApplied: `${configKeys.API_URL}job-application/is-applied`
}

export default apiConfig;