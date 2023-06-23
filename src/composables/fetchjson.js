import { ref, isRef, unref, watch } from 'vue';

export function useFetchJson(url) {
    const data = ref(null);
    const error = ref(null);

    async function fetchJson(url) {
        try {
            const response = await fetch(unref(url), {
                //credentials: 'include'
            });

            if(!response.ok)
            {
                throw Error('Une erreur s\'est produite lors de la requête');
            }

            const json = await response.json();
            data.value = json;
            error.value = null;
        } catch (err) {
            error.value = err.message;
        }
    }

    fetchJson(url);
    if (isRef(url))
    {
        watch(url, () => {
            fetchJson(url);
        });
    }

    return {data, error};
}