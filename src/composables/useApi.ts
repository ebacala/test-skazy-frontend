import { ref } from 'vue'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export enum Status {
    IDLE = 'idle',
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error'
}

function useApi() {
    const status = ref<Status>(Status.IDLE);
    const data = ref(null);
    const error = ref(null);
    const message = ref<string | null>(null);

    const reset = () => {
        status.value = Status.IDLE;
        data.value = null;
        error.value = null;
        message.value = null;
    };

    const makeRequest = (endpoint: string, method: 'GET' | 'POST' | 'DELETE' | 'PUT', body?: any) => {
        status.value = Status.PENDING;

        const options: RequestInit = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        };

        if (body) options.body = JSON.stringify(body);

        return fetch(BASE_URL + endpoint, options)
            .then(res => {
                if (res.ok) {
                    status.value = Status.SUCCESS;
                } else {
                    status.value = Status.ERROR;
                }

                return res.json();
            })
            .then(json => {
                data.value = json;
                message.value = json.message || null;
            })
            .catch(err => {
                status.value = Status.ERROR;
                error.value = err;
            });
    };

    return { status, data, error, message, makeRequest, reset };
}

export const useFetch = () => {
    const { status, data, error, message, makeRequest, reset } = useApi();
    const fetchData = (endpoint: string) => makeRequest(endpoint, 'GET');
    return { status, data, error, message, fetchData, reset };
};

export const useCreate = () => {
    const { status, data, error, message, makeRequest, reset } = useApi();
    const createData = (endpoint: string, body: any) => makeRequest(endpoint, 'POST', body);
    return { status, data, error, message, createData, reset };
};

export const useUpdate = () => {
    const { status, data, error, message, makeRequest, reset } = useApi();
    const updateData = (endpoint: string, body: any) => makeRequest(endpoint, 'PUT', body);
    return { status, data, error, message, updateData, reset };
};

export const useDelete = () => {
    const { status, data, error, message, makeRequest, reset } = useApi();
    const deleteData = (endpoint: string, body: any) => makeRequest(endpoint, 'DELETE', body);
    return { status, data, error, message, deleteData, reset };
};