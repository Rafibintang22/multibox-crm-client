/* eslint-disable no-useless-catch */
import ServerInstance from "./ServerInstance";
class PlaylistEndpoint extends ServerInstance {
    constructor() {
        super();
    }

    async getData() {
        try {
            const playlistData = await this.get("v1/playlist");

            return playlistData;
        } catch (error) {
            throw error;
        }
    }

    async getDetail(idPlaylist) {
        try {
            return await this.get(`v1/playlist/${idPlaylist}`);
        } catch (error) {
            throw error;
        }
    }

    async create(playlistData) {
        try {
            const response = await this.post(`v1/playlist`, playlistData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createContent(playlistContentData) {
        try {
            const response = await this.post(`v1/playlist/content`, playlistContentData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateData(playlistData) {
        try {
            const response = await this.update(`v1/playlist`, playlistData);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default PlaylistEndpoint;
