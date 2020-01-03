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

async function getUserMoney(user_id) {
    return fetch(`${ASSET_ROOT}/users/${user_id}/getmoney`)
        .then(function (response) {
            return response.json()
        })
        .then((response) => response)
}

async function subtractMoney(user_id, money) {
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
    let container
    if(!document.getElementById("container")){
        container = createAppendElement("div", "", MAINTAG, {id: "container"})
    }
   
    container = document.getElementById("container")
    container.style.display = "flex"
    container.style.flexWrap = "wrap"
    const card = document.createElement("div")
    card.setAttribute("class", "card")
    card.style.width = "18rem"
    card.style.margin = "0 auto"
    container.append(card)
    const image = document.createElement("img")

    const cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    

    if (character.status == "dead"){
        image.setAttribute("src", `${IMAGE_PATH}/add-ons/gravestone.png`)
        image.style.height = "333px"
        image.style.width = "286px"
        progressBar(0, "Hunger", cardBody)
        progressBar(0, "Thirst", cardBody)
        progressBar(0, "Social", cardBody)
        progressBar(0, "Sleep", cardBody)

    }else{
        image.setAttribute("src", `${IMAGE_PATH}/${character.image}`)
        progressBar(character.hungry, "Hunger", cardBody)
        progressBar(character.thirsty, "Thirst", cardBody)
        progressBar(character.social, "Social", cardBody)
        progressBar(character.sleepy, "Sleep", cardBody)
    }
    
    
    card.append(image)
    
    const title = document.createElement("h5")
    title.setAttribute("class", "card-title")
    title.innerText = character.name
    cardBody.append(title)
    const cardText = document.createElement("p")
    cardText.setAttribute("class", "card-text")
    cardBody.append(cardText)
    card.append(cardBody)
    // const state = document.createElement("p")
    // state.innerText = `Status: ${character.status}`
    // cardBody.append(state)
    const StatusButton = document.createElement("button")
    StatusButton.setAttribute("class", "btn btn-primary")
    StatusButton.innerText = "sleep" //need this to be conditonal on database status if character is "sleeping"
    //button changes status from dead to asleep
    StatusButton.addEventListener("click", function () {

        if (character.status === "awake") {
            StatusButton.innerText = "wake up"
        } else if (character.status == "dead"){
            StatusButton.innerText = "dead"
        }else{
            StatusButton.innerText = "wake up"
        }
        sleepToggle(LOGGED_IN_USER_ID, character)
        // characterContainer.remove()

    })
    cardBody.append(StatusButton)
}





// updateDataEveryHour()
async function updateDataEveryHour() {
    const interval = setInterval(() => {
        const date = new Date(Date.now())
        if ((date.getMinutes() === 22)) {
            getCharactersByUserId(LOGGED_IN_USER_ID).then((characters) => {
                document.querySelector("body").innerHTML = ""

                characters.forEach(function (character) {
                    createCard(character)
                })
            })

            getUserMoney(LOGGED_IN_USER_ID).then((user) => {
            })
            setTimeout(() => {
                updateDataEveryHour()
                //waits 59minutes before calling function again
            }, 3540000)
            return clearInterval(interval)
        }
    }, 1000);
}

function createMenue() {
    const headerTag = document.querySelector("header")
    const navBar = createPrependElement("ul", "", headerTag, { id: "navbar" })

    const homeLi = createAppendElement("li", "", navBar)
    createAppendElement("a", "Home", homeLi)
    homeLi.addEventListener("click", function () {
        CONTAINER.innerHTML = ""
        loadMain(LOGGED_IN_USER_ID)
    })

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
function sleepToggle(userId, character) {
    let status
    if (character.status === "sleeping") {
        status = "awake"
    } else {
        status = "sleeping"
    }
    fetch(`${ASSET_ROOT}/characters/${userId}/update-status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            character: character.id,
            status: status
        })
    }).then((response) => response.json())
        .then((response) => {
            // state.innerText = 
            console.log(`Status: ${response.status}`)
            character.status = response.status
        })
}

async function updateCharacter(character, stats_to_update){
    return fetch(`${ASSET_ROOT}/characters/${character.id}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            stats_to_update
        })
    }).then((response) => response.json())
    .then((response) => response)
}
    // fetch(`${ASSET_ROOT}/characters/user_id`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         status: sleep
    //     })
    // }).then((response) => response.json())
    //     .then((response) => {
    //         response
    //     })