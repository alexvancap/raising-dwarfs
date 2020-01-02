ASSET_ROOT = "http://localhost:3000"

function resetMainTagHTML() {
    MAINTAG.innerHTML = ""
    createAppendElement("div", "", MAINTAG, { id: "container" })
}

async function getCharactersByUserId(user_id) {
    return fetch(`${ASSET_ROOT}/characters/${user_id}/find-user`)
        .then(function (response) {
            return response.json()
        }).then(function (response) {
            return response
        })
}

function createAppendElement(tag, input, parent, attributes = {}) {
    const createdTag = document.createElement(tag)
    createdTag.innerText = input
    for (attribute in attributes) {
        createdTag.setAttribute(attribute, attributes[attribute])
    }
    parent.append(createdTag)
    return createdTag
}

function createPrependElement(tag, input, parent, attributes = {}) {
    const createdTag = document.createElement(tag)
    createdTag.innerText = input
    for (attribute in attributes) {
        createdTag.setAttribute(attribute, attributes[attribute])
    }
    parent.prepend(createdTag)
    return createdTag
}

function getUserMoney(user_id) {
    return fetch(`${ASSET_ROOT}/users/${user_id}/getmoney`)
        .then(function (response) {
            return response.json()
        })
        .then((response) => response)
}

function subtractMoney(user_id, money) {
    return fetch(`${ASSET_ROOT}/users/${user_id}/substract-money`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            money: money
        })
    }).then((response) => {
        return response.json()
    })
        .then((response) => {
            return response
        })
}

async function fetchCharacterData() {
    return fetch("http://localhost:3000/characters")
        .then(function (response) {
            return response.json()
        })
        .then(function (characters) {
            return characters
        })
}

function getAllCharacters() {
    return fetch(`${ASSET_ROOT}/list-chars`)
        .then((result) => {
            return result.json()
        }).then((result) => {
            return result
        })
}



async function createCharacter(character_info, user_id) {
    console.log(character_info)
    return fetch(`${ASSET_ROOT}/characters/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user_id,
            image: character_info.image,
            name: character_info.name,
            earnings: character_info.earnings
        })
    }).then((response) => response.json())
        .then((response) => response)
}

function createAlert(tag, text, type, action, attributes = {}) {
    const alert = document.createElement("div")
    tag = document.querySelector(tag)
    alert.innerText = text
    alert.style.textAlign = "center"
    for (attribute in attributes) {
        alert.setAttribute(attribute, attributes[attribute])
    }
    alert.setAttribute("class", `alert alert-${type}`)
    alert.setAttribute("role", "alert")
    if (action == "append") {
        tag.append(alert)
    } else {
        tag.prepend(alert)
    }
}

function getAndRemoveElement(name) {
    found = document.querySelectorAll(name)
    if (found) {
        found.forEach((item) => item.remove())
    } else {
        return "no item found"
    }
}

function removeClassByIds(ids, classToRemove) {
    let tag = ""
    let currentClasses = null
    newClasses = null
    for (id of ids) {
        tag = document.getElementById(id)
        currentClasses = tag.getAttribute("class")
        newClasses = currentClasses.replace(classToRemove, "")
        tag.setAttribute("class", newClasses)
    }
}

function addClassById(id, classToAdd) {
    const tag = document.getElementById(id)
    const currentClasses = tag.getAttribute("class")
    const new_classes = currentClasses + " " + classToAdd
    tag.setAttribute("class", new_classes)
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function createCard(character) {
    container = document.getElementById("container")
    const characterContainer = document.createElement("container")
    container.append(characterContainer)
    const card = document.createElement("div")
    card.setAttribute("class", "card")
    card.style.width = "18rem"
    card.style.margin = "0 auto"
    characterContainer.append(card)
    const image = document.createElement("img")
    image.setAttribute("src", `${IMAGE_PATH}/${character.image}`)
    card.append(image)
    const cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    card.append(cardBody)
    const title = document.createElement("h5")
    title.setAttribute("class", "card-title")
    title.innerText = character.name
    cardBody.append(title)
    const cardText = document.createElement("p")
    cardText.setAttribute("class", "card-text")
    cardBody.append(cardText)
    progressBar(character.hungry, "Hunger", cardBody)
    progressBar(character.thirsty, "Thirst", cardBody)
    progressBar(character.social, "Social", cardBody)
    progressBar(character.social, "Sleep", cardBody)
    const state = document.createElement("p")
    state.innerText = `Status: ${character.status}`
    cardBody.append(state)
    const StatusButton = document.createElement("button")
    StatusButton.setAttribute("class", "btn btn-primary")
    StatusButton.innerText = "close"
    StatusButton.addEventListener("click", function () {
        characterContainer.remove()
    })
    cardBody.append(StatusButton)
}





updateDataEveryHour()
async function updateDataEveryHour() {
    const interval = setInterval(() => {
        const date = new Date(Date.now())
        if ((date.getMinutes() === 22)) {
            console.log("yowyow")
            getCharactersByUserId(LOGGED_IN_USER_ID).then((characters) => {
                console.log(characters)
                document.querySelector("body").innerHTML = ""

                characters.forEach(function (character) {
                    createCard(character)
                    console.log("inside foreach")
                })
                console.log("after")
            })

            getUserMoney(LOGGED_IN_USER_ID).then((user) => {
                //update user money
                console.log(user)
            })
            setTimeout(() => {
                updateDataEveryHour()
                console.log("timeout")
                //waits 59minutes before calling function again
            }, 3540000)
            return clearInterval(interval)
        }
    }, 1000);
}

function createMenue() {
    const headerTag = document.querySelector("header")
    const navBar = createPrependElement("ul", "", headerTag, { id: "navbar" })

    const HomeLi = createAppendElement("li", "", navBar)
    createAppendElement("a", "Home", HomeLi)

    const charactersLi = createAppendElement("li", "", navBar)
    createAppendElement("a", "Characters", charactersLi)
    charactersLi.addEventListener("click", function () {
        characterMenue()
    })

    const storeLi = createAppendElement("li", "", navBar)
    createAppendElement("a", "Store", storeLi)
    storeLi.addEventListener("click", function () {
        showShopMenue()
    })

    const logoutLi = createAppendElement("li", "", navBar)
    createAppendElement("a", "Logout", logoutLi)
    logoutLi.addEventListener("click", () => logout(navBar))

    const moneyLi = createAppendElement("li", "", navBar)
    const moneyA = createPrependElement("a", "", moneyLi, { id: "money" })

    getUserMoney(LOGGED_IN_USER_ID).then((money) => moneyA.innerText = `${money} G`)


}

function logout(navBar) {
    localStorage.clear()
    navBar.remove()
    loginForm()
}