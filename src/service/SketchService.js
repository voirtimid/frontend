import axios from "../custom-axios/axios"

class SketchService {
    static getAllSketches() {
        return axios.get(`/api/sketches`);
    }

    static getSketchById(sketchId) {
        return axios.get(`/api/sketches/${sketchId}`);
    }

    static getSketchByName(sketchName) {
        return axios.get(`/api/sketches/name/${sketchName}`);
    }

    static createNewSketch(sketch) {
        return axios.post(`/api/sketches`, sketch);
    }

    static updateSketch(sketchId, updatedSketch) {
        return axios.put(`/api/sketches/${sketchId}`, updatedSketch);
    }

    static deleteSketch(sketchId) {
        return axios.delete(`/api/sketches/${sketchId}`);
    }

}

export default SketchService;