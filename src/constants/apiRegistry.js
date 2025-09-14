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
};

const mappedApiFunctions = {
    playlist: createCRUDHandlers(registeredApi.playlist),
    content: createCRUDHandlers(registeredApi.content),
};

export const getFunctionApi = (type, method) => {
    const functions = mappedApiFunctions[type];
    if (!functions || !functions[method]) {
        throw new Error(`API function not defined for type: ${type} and method: ${method}`);
    }
    return functions[method];
};
