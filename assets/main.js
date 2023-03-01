const API = 'https://rickandmortyapi.com/api';

const content = null || document.getElementById('content'); 

const options ={
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'

    }

};
 
async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const characters = await fetchData(`${API}/character`);
        const character = await fetchData(`${API}/character/${characters.results[0].id}`);
        const origin = await fetchData(character.origin.url);
        console.log(characters);
        console.log(`El personaje ${character.name} es originario de ${origin.name}`);

        let view = `
        ${characters.results.map(character => `
       

        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="${character.image}" alt="Sunset in the mountains">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">        ${character.name}</div>
                <p class="text-gray-700 text-base">Gender:  <strong>${character.gender}</strong></p>
                <p class="text-gray-700 text-base">Species: <strong>${character.species}</strong></p>
                <p class="text-gray-700 text-base">Status:  <strong>${character.status}</strong></p>
                <p class="text-gray-700 text-base">Location:  <strong>${character.location.name}</strong></p>
            </div>
        
        </div>
             `).slice(0,20).join('')} 
        `;

    content.innerHTML = view;
    } catch (error) {
        console.error(error);

    }
})();