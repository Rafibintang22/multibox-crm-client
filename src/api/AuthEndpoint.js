/* eslint-disable no-useless-catch */
import ServerInstance from "./ServerInstance";

class AuthEndpoint extends ServerInstance {
    constructor() {
        super();
    }

    async login(loginData) {
        try {
            const response = await this.post(`v1/auth/signin`, loginData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async verifySession() {
        try {
            const response = await this.get(`v1/auth/verify`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            const response = await this.delete(`v1/auth/signout`);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthEndpoint;
