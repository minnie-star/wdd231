import {places} from '../scripts/places.mjs'
console.log(places)

const showHere = document.querySelector("#allplaces")

function displayItems(places) {
    places.forEach(x => {
        const card = document.createElement('div')
        const photo = document.createElement('img')
        photo.src = `images/${x.photo_url}`
        photo.alt = x.name 

        card.appendChild(photo)

        const title = document.createElement('h2')
        title.innerText = x.name
        card.appendChild(title)

        const address = document.createElement('address')
        address.innerText = x.address
        card.appendChild(address)

        const desc = document.createElement('p')
        desc.innerText = x.description
        card.appendChild(desc) 

        showHere.appendChild(card)
    })
}

displayItems(places)