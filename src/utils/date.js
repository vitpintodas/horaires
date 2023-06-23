export function gestionDate(debut, fin) {
    // si les deux dates sont présentes
    if(debut && fin)
    {
        // on récupère les dates
        const start = debut;
        const end = fin;

        // on les convertit en objet Date
        const dateDebut = new Date(start);
        const dateFin = new Date(end);

        // on récupère le jour de la semaine
        const options = { weekday: 'long' };
        const jourSemaine = new Intl.DateTimeFormat('fr-FR', options).format(dateDebut);

        // on récupère l'heure de début et de fin
        const heureDebut = dateDebut.toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const heureFin = dateFin.toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        // on retourne la date formatée
        return `${jourSemaine} ${heureDebut} - ${heureFin}`;
    }
}