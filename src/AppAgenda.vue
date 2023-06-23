<script setup>
    import { ref, computed } from 'vue';
    import TheHeader from './components/TheHeader.vue';
    import { useFetchJson } from './composables/fetchjson.js';
    import { gestionDate } from './utils/date.js';

    // variable dynamique
    const search = ref('');

    // url de l'api
    const url = computed(() => `https://chabloz.eu/files/horaires/all`)

    // récupération des données
    const { data: horaires } = useFetchJson(url);

    // gestion de l'activation des boutons
    const activ = computed(() => {
        // si la recherche est vide, on retourne false
        if(search.value === '')
        {
            return false;
        }
        else
        {
            // sinon on retourne la valeur de la recherche
            return search.value;
        }
    });

    // récupération des classes uniques
    const classes = computed(() => {
        const uniqueClasses = new Set();

        // si les horaires existent, on récupère les classes uniques
        if(horaires.value)
        {
            horaires.value.forEach(cour => {
                uniqueClasses.add(cour.class);
            })
        }

        // on retourne un tableau trié
        return Array.from(uniqueClasses).sort();
    });

    // filtrage des données en fonction de la classe et tri par date
    const filteredHoraires = computed(() => {
        // si les horaires existent, on filtre les données
        if(horaires.value)
        {
            // on filtre les données en fonction de la classe
            const filteredData = horaires.value.filter(cour => cour.class.includes(search.value));

            // on trie les données par date
            filteredData.sort((a, b) => {
                const dateA = new Date(a.start);
                const dateB = new Date(b.start);
                return dateA - dateB;
            });

            return filteredData;
        }
    });
</script>

<template>
    <!-- header de la page qui est un component -->
    <the-header>
        <h1>IM - Horaires</h1>
    </the-header>

    <!-- boutons de filtrage -->
    <div class="button-container">
        <!-- bouton pour afficher toutes les classes -->
        <button
            @click="search = ''"
            :class="{ 'active': !activ }"
        >
            Toutes
        </button>

        <!-- boutons pour afficher les classes -->
        <button 
            v-for="cour of classes" 
            :key="cour.id"
            @click="search = cour"
            :class="{ 'active': activ === cour }"
        >
            <!-- affichage de la classe sans doublon -->
            {{ cour }}
        </button>
    </div>

    <!-- tableau des horaires -->
    <!-- TODO: transformer le tableau en composant -->
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Heure(s)</th>
                <th>Cours</th>
                <th>Salle</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cour of filteredHoraires">
                <td>{{ gestionDate(cour.start, cour.end).split(' ')[0] }}</td>
                <td>
                    {{ gestionDate(cour.start, cour.end).split(' ')[2] }}
                    <br>
                    {{ gestionDate(cour.start, cour.end).split(' ')[5] }}
                </td>
                <td>
                    {{ cour.label }}
                    <br>
                    {{ cour.class }}
                </td>
                <td>
                    {{ cour.room }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
    h1 {
        padding: 0.3rem 0 0.5rem;
        margin: 0 0 0.5rem;
        background-color: #eff;
        border-bottom: solid #ddd 1px;
    }
    table {
        margin: 0 auto;
        width: 40%;
        border-collapse: collapse;
    }
    table th, table td {
        padding: 8px;
        border: 1px solid #8d8d8d;
    }
    table th {
        background-color: #f0f0f0;
        font-weight: bold;
    }
    .button-container {
        margin: 1rem;
        display: flex;
        justify-content: center;
    }
    .button-container button {
        background: white;
        margin: 0.2rem;
        padding: 0.15rem 0.3rem;
    }
    .button-container button.active {
        background: #eeffff;
    }
</style>
