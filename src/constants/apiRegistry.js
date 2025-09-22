import * as APIs from "../api";

const createCRUDHandlers = (api) => ({
    post: (data) => api.create(data),
    get: () => api.getData(),
    getDetail: (id) => api.getDetail(id),
    patch: (data) => api.updateData(data),
    delete: (rowData) => api.delete(rowData),
    void: (rowData) => api.void(rowData),
});

const registeredApi = {
    playlist: new APIs.PlaylistEndpoint(),
    content: new APIs.ContentEndpoint(),
    schedule: new APIs.ScheduleEndpoint(),
    auth: new APIs.AuthEndpoint(),
};

const mappedApiFunctions = {
    auth: {
        login: (data) => registeredApi.auth.login(data),
        logout: () => registeredApi.auth.logout(),
        verify: () => registeredApi.auth.verifySession(),
    },
    playlist: {
        ...createCRUDHandlers(registeredApi.playlist),
        postContent: (data) => registeredApi.playlist.createContent(data),
    },
    content: createCRUDHandlers(registeredApi.content),
    schedule: createCRUDHandlers(registeredApi.schedule),
};

export const getFunctionApi = (type, method) => {
    const functions = mappedApiFunctions[type];
    if (!functions || !functions[method]) {
        throw new Error(`API function not defined for type: ${type} and method: ${method}`);
    }
    return functions[method];
};
