/* eslint-disable no-useless-catch */
import ServerInstance from "./ServerInstance";
class ScheduleEndpoint extends ServerInstance {
    constructor() {
        super();
    }

    async getData() {
        try {
            const scheduleData = await this.get("v1/schedule");

            return scheduleData;
        } catch (error) {
            throw error;
        }
    }

    async getDetail(idSchedule) {
        try {
            return await this.get(`v1/schedule/${idSchedule}`);
        } catch (error) {
            throw error;
        }
    }

    async create(scheduleData) {
        try {
            const response = await this.post(`v1/schedule`, scheduleData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateData(scheduleData) {
        try {
            const response = await this.update(`v1/schedule`, scheduleData);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default ScheduleEndpoint;
