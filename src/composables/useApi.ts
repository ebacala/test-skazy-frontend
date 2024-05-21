import { ref } from 'vue'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useFetch = (endpoint: string) => {
    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)
    const httpCode = ref(0)

    const fetchData = () => {
        loading.value = true

        return fetch(BASE_URL + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                httpCode.value = res.status
                return res.json()
            })
            .then((json) => (data.value = json))
            .catch((err) => (error.value = err))
            .finally(() => (loading.value = false))
    }

    return { data, error, loading, fetchData }
}

export const useCreate = (endpoint: string) => {
    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)
    const httpCode = ref(0)
    const message = ref(null)

    const createData = (body: any) => {
        loading.value = true

        return fetch(BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                httpCode.value = res.status
                return res.json()
            })
            .then((json) => {
                data.value = json
                message.value = json.message ? json.message : null
            })
            .catch((err) => (error.value = err))
            .finally(() => (loading.value = false))
    }

    return { data, error, loading, httpCode, message, createData }
}


export const useDelete = (endpoint: string) => {
    const data = ref(null)
    const error = ref(null)
    const loading = ref(false)
    const httpCode = ref(0)
    const message = ref(null)

    const deleteData = (body: any) => {
        loading.value = true

        return fetch(BASE_URL + endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                httpCode.value = res.status
                return res.json()
            })
            .then((json) => {
                data.value = json
                message.value = json.message ? json.message : null
            })
            .catch((err) => (error.value = err))
            .finally(() => (loading.value = false))
    }

    return { data, error, loading, httpCode, message, deleteData }
}
