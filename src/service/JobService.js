import axios from '../custom-axios/axios'

class JobService {
    static getAllJobs() {
        return axios.get("/api/jobs");
    }

    static getAllTasksInProgress() {
        return axios.get(`/api/jobs/status/false`)
    }

    static getAllFinishedTasks() {
        return axios.get(`/api/jobs/status/true`)
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

    static addTaskToJob(jobId, task) {
        return axios.put(`/api/jobs/${jobId}/addTask`, task);
    }

    static getAllTasksForJob(jobId) {
        return axios.get(`/api/jobs/${jobId}/tasks`);
    }

    static updateDates(jobId) {
        return axios.get(`/api/jobs/updateDates/${jobId}`);
    }

    static getJobsWithSketch(sketchName) {
        return axios.get(`/api/jobs/getJobsFor/${sketchName}`);
    }
}

export default JobService;