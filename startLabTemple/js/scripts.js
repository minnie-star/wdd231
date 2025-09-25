import {temples} from '../data/temples.js'
//console.log(temples)

import {url} from '../data/temples.js'
//console.log(url)

const showHere = document.querySelector("#showHere")

const mydialog = document.querySelector("#mydialog")
const myTitle = document.querySelector("#mydialog h2")
const myinfo = document.querySelector("#mydialog")
const myclose = document.querySelector("#mydialog button")
myclose.addEventListener("click", () => {
    mydialog.close()
})

function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img')
        photo.src=`${url} ${x.path}`
        photo.alt= x.name
        photo.addEventListener("click", () => showstuff(x));
        showHere.appendChild(photo)
    })
}

displayItems(temples);

function showstuff(x) {
    myTitle.innerHTML = x.name
    mydialog.showModal()
}