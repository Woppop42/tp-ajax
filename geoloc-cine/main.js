const api = 'https://data.culture.gouv.fr/api/records/1.0/search/?dataset=etablissements-cinematographiques&rows=20'
const btn = document.getElementById('btn');
const liste = document.getElementById('liste');
let arr = [];
function listeCine()
{
    fetch(api)
    .then(response => response.json())
    .then(data => {
        console.log(data.records);
        for(let i = 0; i < data.records.length; i++)
        {
            console.log(data.records[i].fields.nom);
            arr.push(data.records[i]);   
        }
        arr.sort((a,b) => b.fields.fauteuils - a.fields.fauteuils);
        arr.forEach(element => {
            let p = document.createElement('p');
            p.innerText = element.fields.nom;
            liste.appendChild(p);
        })
    })
    .catch(error => {
        console.log(error);
    })
}

btn.addEventListener('click', () => {
    listeCine();
    
})