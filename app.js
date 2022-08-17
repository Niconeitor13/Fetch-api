const cards = document.querySelector("#cartas-dinamicas")
const loading = document.querySelector("#loading")
const templateCard = document.querySelector("#template-card").content
const fragment = document.createDocumentFragment()
const charactersApi = "https://rickandmortyapi.com/api/character"
const templatePaginacion =document.querySelector("#template-paginacion").content
const paginacion = document.querySelector("#paginacion")

document.addEventListener("DOMContentLoaded",()=> {
 fetchData("https://rickandmortyapi.com/api/character")
})
const fetchData = async (url) => {
    try {
        loadingData(true)

        const res = await fetch(url)
        const data = await res.json()
        pintarCard(data)

    } catch (error) {
        console.log(error)
    } finally {
        loadingData(false)
    }
}
const pintarCard = (data) => {
    console.log(data)

    data.results.forEach(item => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector("h5").textContent = item.name
        clone.querySelector("p").textContent = item.species
        clone.querySelector("img").setAttribute("src", item.image)
        fragment.appendChild(clone)
    });

    pintarPaginacion(data.info)
    cards.appendChild(fragment)
}

const pintarPaginacion= (data) => {
    paginacion.textContent = ""
    console.log(data)
    const clone = templatePaginacion.cloneNode(true)
    if(data.prev) {
    clone.querySelector(".btn-outline-secondary").disabled = false
    }else {
    clone.querySelector(".btn-outline-secondary").disabled = false
    } 
    if(data.prev) {
        clone.querySelector(".btn-outline-primary").disabled = false
    }else {
        clone.querySelector(".btn-outline-primary").disabled = false
    }     
    

    paginacion.appendChild(clone)
 
    paginacion.addEventListener("click", (e) => {
        if (e.target.matches(".btn-outline-primary")) {
            console.log("click next")
            fetchData(data.next)
        }
        if (e.target.matches(".btn-outline-secondary")) {
            console.log("click prev")
            fetchData(data.prev)
        }
    })
}

const loadingData = estado => {
    if (estado) {
    loading.classList.remove("d-none")
    } else
    loading.classList.add("d-none")
}