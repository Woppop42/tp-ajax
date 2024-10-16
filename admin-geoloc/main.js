const regionsSelect = document.getElementById('regions');
const departementsSelect = document.getElementById('departements');
const showCommunesBtn = document.getElementById('showCommunes');
const communesList = document.getElementById('communesList');

const api = "https://geo.api.gouv.fr";

// Récup des régions
function loadRegions() {
    fetch(`${api}/regions`)
        .then(response => response.json())
        .then(data => {
            data.forEach(region => {
                const option = document.createElement('option');
                option.value = region.code;
                option.textContent = region.nom;
                regionsSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des régions:', error));
}

// Récup des départements en  fonction de la région
function loadDepartements(regionCode) {
    fetch(`${api}/regions/${regionCode}/departements`)
        .then(response => response.json())
        .then(data => {
            departementsSelect.innerHTML = '<option value="">Sélectionner un département</option>';
            data.forEach(departement => {
                const option = document.createElement('option');
                option.value = departement.code;
                option.textContent = departement.nom;
                departementsSelect.appendChild(option);
            });
            departementsSelect.disabled = false;
        })
        .catch(error => console.error('Erreur lors du chargement des départements:', error));
}

// Fonction pour afficher les communes d'un département
function loadCommunes(departementCode) {
    fetch(`${api}/departements/${departementCode}/communes`)
        .then(response => response.json())
        .then(data => {
            // Trier les communes par population (du plus grand au plus petit)  
            data.sort((a, b) => b.population - a.population);
            communesList.innerHTML = '';
            data.forEach(commune => {
                const li = document.createElement('li');
                li.textContent = `${commune.nom} (Population: ${commune.population})`;
                communesList.appendChild(li);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des communes:', error));
}

// Événement au changement de sélection d'une région
regionsSelect.addEventListener('change', (event) => {
    const regionCode = event.target.value;
    if (regionCode) {
        loadDepartements(regionCode);
    } else {
        departementsSelect.innerHTML = '<option value="">Sélectionner un département</option>';
        departementsSelect.disabled = true;
        showCommunesBtn.disabled = true;
    }
});

// Événement au changement de sélection d'un département
departementsSelect.addEventListener('change', (event) => {
    showCommunesBtn.disabled = !event.target.value;
});

// Affichage des communes
showCommunesBtn.addEventListener('click', () => {
    const departementCode = departementsSelect.value;
    if (departementCode) {
        loadCommunes(departementCode);
    }
});


loadRegions();
