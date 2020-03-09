ASSET_ROOT = "http://localhost:3000";
CHARACTER_STATUS = "";
// let characterCardsOpen = false;

console.log("Helper Functions run");

function resetMainTagHTML() {
  MAINTAG.innerHTML = "";
  createAppendElement("div", "", MAINTAG, { id: "container" });
}

async function getCharactersByUserId(user_id) {
  return fetch(`${ASSET_ROOT}/characters/${user_id}/find-user`)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response;
    });
}

async function getCharacterByCharacterId(user_id) {
  return fetch(`${ASSET_ROOT}/characters/${user_id}/find-characer`)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response;
    });
}

function createAppendElement(tag, input, parent, attributes = {}) {
  const createdTag = document.createElement(tag);
  createdTag.innerText = input;
  for (attribute in attributes) {
    createdTag.setAttribute(attribute, attributes[attribute]);
  }
  parent.append(createdTag);
  return createdTag;
}

function createPrependElement(tag, input, parent, attributes = {}) {
  const createdTag = document.createElement(tag);
  createdTag.innerText = input;
  for (attribute in attributes) {
    createdTag.setAttribute(attribute, attributes[attribute]);
  }
  parent.prepend(createdTag);
  return createdTag;
}

async function getUserMoney(user_id) {
  return fetch(`${ASSET_ROOT}/users/${user_id}/getmoney`)
    .then(function(response) {
      return response.json();
    })
    .then(response => {
      return response;
    });
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
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response;
    });
}

async function addMoney(user_id, character) {
  return fetch(`${ASSET_ROOT}/users/${user_id}/add-money`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      money: character.earnings
    })
  })
    .then(response => {
      return response.json();
    })
    .then(money => {
      return (document.getElementById("money").innerText = `${money} G`); //{CLEAR AND REPOPULATE THE INNERTEXT FOR THE NAV BAR MONEY};
    });
}

async function fetchCharacterData() {
  return fetch("http://localhost:3000/characters")
    .then(function(response) {
      return response.json();
    })
    .then(function(characters) {
      return characters;
    });
}

function getAllCharacters() {
  return fetch(`${ASSET_ROOT}/list-chars`)
    .then(result => {
      return result.json();
    })
    .then(result => {
      return result;
    });
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
  })
    .then(response => response.json())
    .then(response => response);
}

function createAlert(tag, text, type, action, attributes = {}) {
  const alert = document.createElement("div");
  tag = document.querySelector(tag);
  alert.innerText = text;
  alert.style.textAlign = "center";
  for (attribute in attributes) {
    alert.setAttribute(attribute, attributes[attribute]);
  }
  alert.setAttribute("class", `alert alert-${type}`);
  alert.setAttribute("role", "alert");
  if (action == "append") {
    tag.append(alert);
  } else {
    tag.prepend(alert);
  }
}

function getAndRemoveElement(name) {
  found = document.querySelectorAll(name);
  if (found) {
    found.forEach(item => item.remove());
  } else {
    return "no item found";
  }
}

function removeClassByIds(ids, classToRemove) {
  let tag = "";
  let currentClasses = null;
  newClasses = null;
  for (id of ids) {
    tag = document.getElementById(id);
    currentClasses = tag.getAttribute("class");
    newClasses = currentClasses.replace(classToRemove, "");
    tag.setAttribute("class", newClasses);
  }
}

function addClassById(id, classToAdd) {
  const tag = document.getElementById(id);
  const currentClasses = tag.getAttribute("class");
  const new_classes = currentClasses + " " + classToAdd;
  tag.setAttribute("class", new_classes);
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCard(character) {
  let container = "";
  console.log("createCard starts to run");
  if (!document.getElementById("container")) {
    return (container = createAppendElement("div", "", MAINTAG, {
      id: "container"
    }));
  }

  container = document.getElementById("container");
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "18rem";
  card.style.margin = "0 auto";
  container.append(card);

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  createProgressBar(character, cardBody, card);

  const title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  title.innerText = character.name;
  cardBody.append(title);
  const cardText = document.createElement("p");
  cardText.setAttribute("class", "card-text");
  cardBody.append(cardText);
  card.append(cardBody);
  // const state = document.createElement("p")
  // state.innerText = `Status: ${character.status}`
  // cardBody.append(state)
  const StatusButton = document.createElement("button");
  StatusButton.setAttribute("class", "btn btn-primary");
  StatusButton.setAttribute("id", "status-button");

  cardBody.append(StatusButton);

  getCharacterByCharacterId(character.id).then(updatedCharacter => {
    if (updatedCharacter.status === "awake") {
      CHARACTER_STATUS = "awake";
      StatusButton.innerText = "sleep";
    } else if (updatedCharacter.status == "sleeping") {
      CHARACTER_STATUS = "sleeping";
      StatusButton.innerText = "wake up";
    } else {
      StatusButton.innerText = "Dead";
    }
    if (updatedCharacter.status != "dead") {
      StatusButton.addEventListener("click", e =>
        sleepToggle(updatedCharacter, LOGGED_IN_USER_ID)
      );
    }
  });
}

function sleepToggle(character, userId) {
  console.log(CHARACTER_STATUS);
  if (CHARACTER_STATUS == "awake") {
    status = "sleeping";
  } else if (CHARACTER_STATUS == "sleeping") {
    status = "awake";
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
  })
    .then(response => response.json())
    .then(response => {
      // state.innerText =
      console.log("response: " + response.status);

      statusButton = document.getElementById("status-button");
      if (response.status === "awake") {
        CHARACTER_STATUS = "awake";
        statusButton.innerText = "sleep";
      } else if (response.status == "sleeping") {
        CHARACTER_STATUS = "sleeping";
        statusButton.innerText = "wake up";
      }
    });
}

function createProgressBar(character, cardBody, card) {
  const image = document.createElement("img");
  if (character.status == "dead") {
    image.setAttribute("src", `${IMAGE_PATH}/add-ons/gravestone.png`);
    image.style.height = "333px";
    image.style.width = "286px";
    progressBar(0, "Hunger", cardBody);
    progressBar(0, "Thirst", cardBody);
    progressBar(0, "Social", cardBody);
    progressBar(0, "Sleep", cardBody);
  } else {
    image.setAttribute("src", `${IMAGE_PATH}/${character.image}`);
    progressBar(character.hungry, "Hunger", cardBody);
    progressBar(character.thirsty, "Thirst", cardBody);
    progressBar(character.social, "Social", cardBody);
    progressBar(character.sleepy, "Sleep", cardBody);
  }
  card.append(image);
}

//IF YOU WANT TO CHANGE THE INTERVAL ON WHICH CHARACTER DATA IS UPDATED, MAKE SURE YOU ADJUST BOTH THE DATE.GETSECONDS()=== ?? AND THE SETTIMEOUT TIME

updateDataEveryHour();
async function updateDataEveryHour() {
  const interval = setInterval(() => {
    const date = new Date(Date.now());
    //ORIGINAL CODE
    // if (date.getMinutes() === 00 && date.getSeconds() >= 10) {
    //   getCharactersByUserId(LOGGED_IN_USER_ID).then(characters => {
    //     document.querySelector("body").innerHTML = "";

    //     characters.forEach(character => {
    //       return createCard(character);
    //     });
    //   });
    let stats_to_update = {
      thirsty: -10,
      sleepy: -15,
      social: -10,
      hungry: -10
    };
    if (date.getSeconds() === 10) {
      console.log("run interval");
      getCharactersByUserId(LOGGED_IN_USER_ID)
        .then(async characters => {
          // document.querySelector("body").innerHTML = "";
          //   characters.forEach(character => {
          for (let character of characters) {
            await updateCharacterOnInterval(character, stats_to_update);
            await addMoney(LOGGED_IN_USER_ID, character);
          }
        })
        .then(characters => {
          return setTimeout(updateDataEveryHour, 60000);
        });
      return clearInterval(interval);
    }
  }, 1000);
  // .then(characters => {
  //   if (document.getElementById("container")) {
  //     document.getElementById("container").innerHTML = "";
  //     characterMenue();
  //   }
  // });

  //   getUserMoney(LOGGED_IN_USER_ID).then(user => {});
  //   setTimeout(() => {
  //     updateDataEveryHour();
  //     //waits 59minutes before calling function again
  //   }, 3540000);
  //   return clearInterval(interval);
  //     }
  //   }, 1000);
}

function createMenue() {
  const headerTag = document.querySelector("header");
  const navBar = createPrependElement("ul", "", headerTag, { id: "navbar" });

  const homeLi = createAppendElement("li", "", navBar);
  createAppendElement("a", "Home", homeLi);
  homeLi.addEventListener("click", function() {
    CONTAINER.innerHTML = "";
    if (document.getElementById("store-container")) {
      document.getElementById("store-container").remove();
    }
    loadMain(LOGGED_IN_USER_ID);
  });

  const charactersLi = createAppendElement("li", "", navBar);
  createAppendElement("a", "Characters", charactersLi);
  charactersLi.addEventListener("click", function() {
    if (document.getElementById("container")) {
      document.getElementById("container").innerHTML = "";
    }
    if (document.getElementById("store-container")) {
      document.getElementById("store-container").remove();
    }
    characterMenue();
  });

  const storeLi = createAppendElement("li", "", navBar);
  createAppendElement("a", "Store", storeLi);
  storeLi.addEventListener("click", function() {
    if (document.getElementById("container")) {
      document.getElementById("container").remove();
    }
    if (document.getElementById("store-container")) {
      document.getElementById("store-container").remove();
    }
    showShopMenue();
  });

  const logoutLi = createAppendElement("li", "", navBar);
  createAppendElement("a", "Logout", logoutLi);
  logoutLi.addEventListener("click", () => logout(navBar));

  const moneyLi = createAppendElement("li", "", navBar);
  const moneyA = createPrependElement("a", "", moneyLi, { id: "money" });

  getUserMoney(LOGGED_IN_USER_ID).then(
    money => (moneyA.innerText = `${money} G`)
  );
}

function logout(navBar) {
  localStorage.clear();
  navBar.remove();
  loginForm();
}

async function updateCharacter(character, stats_to_update) {
  return fetch(`${ASSET_ROOT}/characters/${character.id}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      stats_to_update
    })
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    });
}

async function updateCharacterOnInterval(character, stats_to_update) {
  return fetch(`${ASSET_ROOT}/characters/${character.id}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      stats_to_update
    })
  })
    .then(response => response.json())
    .then(character => {
      if (document.getElementById("container").innerText.length > 0) {
        document.getElementById("container").innerHTML = "";
        characterMenue();
      }
    });
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

function characterMenue() {
  document.getElementById("messages").innerHTML = "";

  fetchCharacterData().then(characters => {
    characters.forEach(character => {
      createCard(character);
    });
  });
}
