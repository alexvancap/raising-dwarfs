

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

function getAllCharacters() {
    return fetch(`${ASSET_ROOT}/list-chars`)
        .then((result) => {
            return result.json()
        }).then((result) => {
            return result
        })
}

function createCharacter(character_info, user_id) {
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


updateDataEveryHour()
async function updateDataEveryHour() {
    const interval = setInterval(() => {
        const date = new Date(Date.now())
        if ((date.getMinutes() === 16)) {
            getCharactersByUserId(LOGGED_IN_USER_ID).then((characters) => {
                //update user stats
                console.log(characters)
                characters.forEach(function (character) {
                    createCard(character)
                    console.log("card created")
                })
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