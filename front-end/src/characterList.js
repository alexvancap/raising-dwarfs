LOGGED_IN_USER_ID = 2

document.addEventListener("DOMContentLoaded", () => {
  // let card = document.querySelector('.card')
  fetch("http://localhost:3000/characters")
    .then(function (response) {
      return response.json()
    })
    .then(function (characters) {
      // console.log(characters)
      characters.forEach(function (character) {
        createCard(character)
      })

    })

  function createCard(character) {
    card = document.createElement("div")
    card.setAttribute("class", "card")
    card.style.width = "18rem"
    document.body.append(card)
    image = document.createElement("img")
    card.append(image)
    cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    card.append(cardBody)
    title = document.createElement("h5")
    title.setAttribute("class", "card-title")
    title.innerText = character.name
    cardBody.append(title)
    cardText = document.createElement("p")
    cardText.setAttribute("class", "card-text")
    cardBody.append(cardText)
    progressBar(character.hungry, "Hunger")
    progressBar(character.thirsty, "Thirst")
    progressBar(character.social, "Social")
    progressBar(character.social, "Sleep")
    state = document.createElement("p")
    state.innerText = `Status: ${character.status}`
    cardBody.append(state)
    StatusButton = document.createElement("button")
    StatusButton.setAttribute("class", "btn btn-primary")
    StatusButton.innerText = "view"
    cardBody.append(StatusButton)
  }

  progressBar = function (num, name) {
    outerBar = document.createElement("div")
    outerBar.setAttribute("class", "progress")
    outerBar.style.marginBottom = "10px"
    cardBody.append(outerBar)
    innerBar = document.createElement("div")
    innerBar.setAttribute("class", "progress-bar bg-success")
    innerBar.setAttribute("role", "progressbar")
    innerBar.setAttribute("style", `width: ${num}%`)
    innerBar.setAttribute("aria-valuenow", `${num}`)
    innerBar.setAttribute("aria-valuemin", "0")
    innerBar.setAttribute("aria-valuemax", "100")
    innerBar.innerText = `${name}: ${num}%`
    outerBar.append(innerBar)
  }

  function hungerPointLoss() {
    setInterval(function () {
      value--
      console.log(value)
      fetch(`http://localhost:3000/characters/${LOGGED_IN_USER_ID}`, {
        method: 'PATCH',
        body: JSON.stringify({
          hungry: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (characters) {
          document.card.innerHTML = ''
          characters.forEach(function (character) {
            createCard(character)
          })
        }, 3000);
    }
    )
  }
})