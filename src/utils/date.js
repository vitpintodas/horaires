export function gestionDate(debut, fin) {
    if(debut && fin)
    {
        const start = debut;
        const end = fin;

        const dateDebut = new Date(start);
        const dateFin = new Date(end);

        const options = { weekday: 'long' };
        const jourSemaine = new Intl.DateTimeFormat('fr-FR', options).format(dateDebut);

        const heureDebut = dateDebut.toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const heureFin = dateFin.toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        return `${jourSemaine} ${heureDebut} - ${heureFin}`;
    }
    else {
        console.log("no");
    }
}