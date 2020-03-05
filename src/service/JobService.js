import axios from '../custom-axios/axios'

class JobService {
    static getAllJobs() {
        return axios.get("/api/jobs");
    }

    static getAllJobsPaged(page, size) {
        return axios.get(`/api/jobs/paged`, {
            headers: {
                'page': page,
                'size': size
            }
        })
    }

    static getAllJobsHistoryPaged(page, size) {
        return axios.get(`/api/jobs/history/paged`, {
            headers: {
                'page': page,
                'size': size
            }
        })
    }

    static getAllJobsInProgress() {
        return axios.get(`/api/jobs/status/false`)
    }

    static getAllFinishedJobs() {
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

    static updateRealDates(jobId) {
        return axios.get(`/api/jobs/updateRealDates/${jobId}`);
    }

    static getJobsWithSketch(drawing) {
        return axios.get(`/api/jobs/getJobsFor/${drawing}`);
    }

    static completeJob(jobId) {
        return axios.get(`/api/jobs/${jobId}/complete`)
    }
}

export default JobService;