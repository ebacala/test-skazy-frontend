import { ref } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetch = (endpoint: string) => {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const fetchData = () => {
        loading.value = true;

        return fetch(BASE_URL + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((json) => data.value = json)
        .catch((err) => error.value = err)
        .finally(() => loading.value = false)
    }

    return { data, error, loading, fetchData };
};

// export const createData = (endpoint: string) => {
//     const data = ref(null);
//     const error = ref(null);
//     const loading = ref(false);

//     const create = (body: any) => {
//         loading.value = true;

//         return fetch(BASE_URL + endpoint, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(body)
//             })
//             .then((res) => res.json())
//             .then((json) => data.value = json)
//             .catch((err) => error.value = err)
//             .finally(() => loading.value = false)
//     }

//     return { data, error, loading, create };
// };