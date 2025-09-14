/* eslint-disable no-useless-catch */
import ServerInstance from "./ServerInstance";
class ContentEndpoint extends ServerInstance {
    constructor() {
        super();
    }

    async getData() {
        try {
            const contentData = await this.get("v1/content");

            return contentData;
        } catch (error) {
            throw error;
        }
    }

    async getDetail(idContent) {
        try {
            return await this.get(`v1/content/${idContent}`);
        } catch (error) {
            throw error;
        }
    }

    async create(contentData) {
        try {
            const response = await this.post(`v1/content`, contentData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateData(contentData) {
        try {
            const response = await this.update(`v1/content`, contentData);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default ContentEndpoint;
