import axios from '../custom-axios/axios'

class JobService {
    static getAllJobs() {
        return axios.get("/api/jobs");
    }

    static createJob(job) {
        return axios.post("/api/jobs", job);
    }

    static getJob(jobId) {
        return axios.get(`/api/jobs/${jobId}`);
    }

    static updateJob(jobId, updatedJob) {
        return axios.put(`/api/jobs/${jobId}`, updatedJob);
    }

    static deleteJob(jobId) {
        return axios.delete(`/api/jobs/${jobId}`);
    }

    static addTaskToJob(jobId, taskId) {
        return axios.put(`/api/jobs/${jobId}/addTask/${taskId}`);
    }
}

export default JobService;