import { ref } from 'vue'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export enum Status {
    IDLE = 'idle',
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error'
}

export const useFetch = () => {
    const status = ref<Status>(Status.IDLE);
    const data = ref<any>(null)
    const error = ref<any>(null)
    const httpCode = ref<number>(0)
    const message = ref<string | null>(null)

    const reset = () => {
        status.value = Status.IDLE
        data.value = null
        error.value = null
        httpCode.value = 0
        message.value = null
    }

    const fetchData = (endpoint: string) => {
        status.value = Status.PENDING

        return fetch(BASE_URL + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    status.value = Status.SUCCESS
                } else {
                    status.value = Status.ERROR
                }
                httpCode.value = res.status

                return res.json()
            })
            .then((json) => {
                data.value = json
                message.value = json.message ? json.message : null
            })

    }

    return { status, data, error, httpCode, message, fetchData, reset }
}

export const useCreate = () => {
    const status = ref<Status>(Status.IDLE);
    const data = ref<any>(null)
    const error = ref<any>(null)
    const httpCode = ref<number>(0)
    const message = ref<string | null>(null)

    const reset = () => {
        status.value = Status.IDLE
        data.value = null
        error.value = null
        httpCode.value = 0
        message.value = null
    }

    const createData = (endpoint: string, body: any) => {
        status.value = Status.PENDING

        return fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body ? body : {})
        })
            .then((res) => {
                if (res.ok) {
                    status.value = Status.SUCCESS
                } else {
                    status.value = Status.ERROR
                }
                httpCode.value = res.status

                return res.json()
            })
            .then((json) => {
                data.value = json
                message.value = json.message ? json.message : null
            })

    }

    return { status, data, error, httpCode, message, createData, reset }
}


export const useDelete = () => {
    const status = ref<Status>(Status.IDLE);
    const data = ref<any>(null)
    const error = ref<any>(null)
    const httpCode = ref<number>(0)
    const message = ref<string | null>(null)

    const reset = () => {
        status.value = Status.IDLE
        data.value = null
        error.value = null
        httpCode.value = 0
        message.value = null
    }

    const deleteData = (endpoint: string, body: any) => {
        status.value = Status.PENDING

        return fetch(BASE_URL + endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body ? body : {})
        })
            .then((res) => {
                if (res.ok) {
                    status.value = Status.SUCCESS
                } else {
                    status.value = Status.ERROR
                }
                httpCode.value = res.status

                return res.json()
            })
            .then((json) => {
                data.value = json
                message.value = json.message ? json.message : null
            })

    }

    return { status, data, error, httpCode, message, deleteData, reset }
}
