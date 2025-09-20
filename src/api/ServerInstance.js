import axios from "axios";
axios.defaults.withCredentials = true;

class ServerInstance {
    constructor() {
        this.serverUrl =
            import.meta.env.VITE_APP_MODE === "PRODUCTION"
                ? import.meta.env.VITE_API_PRODUCTION
                : import.meta.env.VITE_API_DEVELOPMENT;

        this.api = axios.create({
            baseURL: this.serverUrl,
            withCredentials: true,
        });
    }

    async get(endpoint) {
        try {
            const response = await this.api.get(`/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await this.api.post(`/${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(endpoint, data) {
        try {
            const response = await this.api.patch(`/${endpoint}`, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(endpoint, params) {
        try {
            const response = await this.api.delete(`/${endpoint}/${params}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ServerInstance;
