LOGGED_IN_USER_ID = 3


function characterMenue() {

  fetchCharacterData().then((characters) => {
    console.log(characters)

    characters.forEach((character) => {
      createCard(character)
    })

  })


}

// comes form helper functions  createCard()
progressBar = function (num, name, cardBody) {
  const outerBar = document.createElement("div")
  outerBar.setAttribute("class", "progress")
  outerBar.style.marginBottom = "10px"
  cardBody.append(outerBar)
  const innerBar = document.createElement("div")
  innerBar.setAttribute("class", "progress-bar bg-success")
  innerBar.setAttribute("role", "progressbar")
  innerBar.setAttribute("style", `width: ${num}%`)
  innerBar.setAttribute("aria-valuenow", `${num}`)
  innerBar.setAttribute("aria-valuemin", "0")
  innerBar.setAttribute("aria-valuemax", "100")
  innerBar.innerText = `${name}: ${num}%`
  outerBar.append(innerBar)
}

  // function hungerPointLoss() {
  //   setInterval(function () {
  //     value--
  //     console.log(value)
  //     fetch(`http://localhost:3000/characters/${LOGGED_IN_USER_ID}`, {
  //       method: 'PATCH',
  //       body: JSON.stringify({
  //         hungry: value
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //       .then(function (response) {
  //         return response.json()
  //       })
  //       .then(function (characters) {
  //         document.card.innerHTML = ''
  //         characters.forEach(function (character) {
  //           createCard(character)
  //         })
  //       }, 3000);
  //   }
  //   )
  // }