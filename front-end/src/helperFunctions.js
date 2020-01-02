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


updateDataEveryHour()
async function updateDataEveryHour(){
    const interval = setInterval(() => {
        const date = new Date(Date.now())
        if((date.getMinutes() === 45)){
            getCharactersByUserId(LOGGED_IN_USER_ID).then((characters) => console.log(characters))
            getUserMoney(LOGGED_IN_USER_ID).then((user) => console.log(user))
            setTimeout(() => {
                updateDataEveryHour() 
                console.log("timeout")
            }, 3540)
            return clearInterval(interval)
        }
    }, 1000);
}