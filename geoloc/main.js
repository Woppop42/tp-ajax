let btn = document.getElementById('btnloc');
const api = "https://adresse.data.gouv.fr/api-doc/adresse"
const pdata = document.getElementById('pdata');
const padresse = document.getElementById('padresse');

if('geolocation' in navigator)
{
    console.log('Geoloc autorisée')
} else {
    console.log('geoloc non autorisée')
}

function success(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    pdata.innerHTML = ` Latitude : ${latitude}, Longitude : ${longitude}`
    let apiAdresse = `https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&lat=${latitude}&lon=${longitude}`
    fetch(apiAdresse)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        padresse.innerHTML = data.query;
    })
    .catch(error => {
        console.log(error);
    })

}
function error(err)
{
    console.log(err.message);
}

btn.addEventListener('click', () =>{
    navigator.geolocation.getCurrentPosition(success, error);
}
)
