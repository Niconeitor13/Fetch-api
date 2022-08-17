const cards = document.querySelector("#cartas-dinamicas")
const loading = document.querySelector("#loading")
const templateCard = document.querySelector("#template-card").content
const fragment = document.createDocumentFragment()
const charactersApi = "https://rickandmortyapi.com/api/character?page=1"
const templatePaginacion =document.querySelector("#template-paginacion").content
const paginacion = document.querySelector("#paginacion")

document.addEventListener("DOMContentLoaded",()=> {
 fetchData()
})
const fetchData = async (url = charactersApi) => {
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
    clone.querySelector(".btn-outline-secondary").disabled = false //aca iria true
    }                                                                    //aca intente desabilitar los botones cuando no hay pagina previa
                                                                        //o cuando no hay pag next, pero me quedan disabled siempre, los deje en false para testear
    if(data.prev) {
        clone.querySelector(".btn-outline-primary").disabled = false                
    }else {
        clone.querySelector(".btn-outline-primary").disabled = false // aca iria true
    }     
   

    
    paginacion.addEventListener("click", (e) => {
        if (e.target.matches(".btn-outline-primary")) {
            console.log("click next")
            if(data.next) {
            fetchData(data.next)
            } // aca y en el data.prev de abajo, me toma bien la url, porque en los consolelog de la linea 43 y 27 me devuelve la data que corresponde (siguiente url o anterior)
        }                       // lo que no me hace es imprimir la data correctamente en el html (eso creo, puede ser cualquier cosa)
        if (e.target.matches(".btn-outline-secondary")) {
            console.log("click prev")
            if(data.prev) {
                fetchData(data.prev)
            }
        }
    })
    paginacion.appendChild(clone)
}
//comentario de ultimo momento, en los clg me larga bien los fetchdata con la url nueva, pero no me los actualiza
//porque si apreto en prev, me tira el error 404 porque en la primera pagina el prev es null
//comentario posterior al de ultimo momento, agregando los if de linea 62 y 68, no me tira el 404. hasta aca llego, tiro el commit y pusheo. besos en la cola
const loadingData = estado => {
    if (estado) {
    loading.classList.remove("d-none")
    } else
    loading.classList.add("d-none")
}