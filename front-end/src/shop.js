function showShopMenue() {
  if (document.getElementById("messages")) {
    document.getElementById("messages").innerHTML = "";
  }
  const storeContainer = createAppendElement("div", "", MAINTAG, {
    id: "store-container"
  });
  //creates image with random query string
  const shopKeeper = createAppendElement("img", "", storeContainer, {
    id: "shop-keeper",
    src: `${IMAGE_PATH}/store/seller.gif?a=${Math.random()}`
  });
  shopKeeper.style.zIndex = 2;

  setTimeout(() => {
    const shopMenue = createAppendElement("ul", "", storeContainer, {
      id: "shop-menue"
    });
    const foodAndDrinks = createAppendElement(
      "li",
      "Food and drinks",
      shopMenue,
      { class: "shop-menue-item" }
    );
    const characters = createAppendElement("li", "Characters", shopMenue, {
      class: "shop-menue-item"
    });
    const back = createAppendElement("li", "Back", shopMenue, {
      class: "shop-menue-item",
      display: "inline-block"
    });

    foodAndDrinks.addEventListener("click", () => createShopItems());
    // items.addEventListener("click", () => )
    characters.addEventListener("click", () => buyCharacter());
    back.addEventListener("click", () =>
      document.getElementById("store-container").remove()
    );
  }, 650);
}

function createShopItems() {
  const shopItems = [
    {
      name: "apple",
      price: 50,
      image: "food/apple.png",
      description: "Food + 20",
      stats_to_update: { hungry: 20 }
    },
    {
      name: "baguette",
      price: 100,
      image: "food/baguette.png",
      description: "Food + 50",
      stats_to_update: { hungry: 50 }
    },
    {
      name: "water",
      price: 20,
      image: "food/water.png",
      description: "Thirst + 25",
      stats_to_update: { thirsty: 25 }
    },
    {
      name: "pint",
      price: 50,
      image: "food/pint.png",
      description: "Social + 10\n Thirst -25\n Sleep -10",
      stats_to_update: { thirsty: -25, sleepy: -10, social: 10 }
    }
  ];
  if (document.getElementById("store-container")) {
    const storeContainer = document.getElementById("store-container");
    storeContainer.remove();
  }

  const storeDiv = createAppendElement("div", "", MAINTAG, {
    maxWidth: "600px",
    class: "store-item-container"
  });
  const closeButton = createAppendElement("div", "", storeDiv, {
    class: "close-button"
  });
  shopItems.forEach(shopItem => {
    const itemDiv = createAppendElement("div", "", storeDiv, {
      class: "store-item"
    });
    createAppendElement("img", "", itemDiv, {
      class: "sore-item-background-image",
      src: "./src/img/store/wooden-board.png",
      width: "300px",
      height: "250px"
    });
    createAppendElement("img", "", itemDiv, {
      class: "store-item-image",
      src: `${IMAGE_PATH}/${shopItem.image}`,
      height: "50px",
      width: "50px"
    });
    createAppendElement("label", `${shopItem.name}`, itemDiv, {
      class: "store-item-name"
    });
    createAppendElement("p", shopItem.description, itemDiv, {
      class: "store-item-description"
    });
    const buyButton = createAppendElement(
      "div",
      `Buy (${shopItem.price}G)`,
      itemDiv,
      { class: "store-item-button", width: "150px;", height: "50px" }
    );
    buyButton.addEventListener(
      "mouseover",
      () => (buyButton.src = `${IMAGE_PATH}/add-ons/button-clicked.png`)
    );
    buyButton.addEventListener("click", () => {
      console.log("clicked buy button");
      getUserMoney(LOGGED_IN_USER_ID).then(user_money => {
        if (user_money >= shopItem.price) {
          selectCharacterToGiveItem(shopItem, storeDiv);
        } else {
          if (document.getElementById("messages").innerHTML == "") {
            createAlert(
              "#messages",
              "You don't have enough money!",
              "danger",
              "append"
            );
          }
        }
      });
    });
  });
  closeButton.addEventListener("click", () => {
    storeDiv.remove();
    showShopMenue();
  });
}

function selectCharacterToGiveItem(shopItem, storeDiv) {
  document.getElementById("messages").innerHTML = "";
  let shopItemIsOutOfScope;

  storeDiv.remove();
  CONTAINER.style.width = "960px";
  const storeSelectContainer = createAppendElement("div", "", CONTAINER, {
    id: "store-select-container"
  });
  const selectPanel = createAppendElement("div", "", storeSelectContainer, {
    id: "store-select-char-popup"
  });
  const closeButton = createAppendElement("div", "", selectPanel, {
    class: "close-button"
  });
  closeButton.addEventListener("click", () => {
    storeSelectContainer.remove();
    createShopItems();
  });

  getCharactersByUserId(LOGGED_IN_USER_ID).then(characters => {
    shopItemIsOutOfScope = shopItem;
    characters.forEach(character => {
      if (character.status != "dead") {
        const button = createAppendElement(
          "div",
          `${character.name}`,
          selectPanel,
          { class: "store-select-character" }
        );
        const stats = createAppendElement(
          "p",
          `hunger: ${character.hungry}%,\n thirst: ${character.thirsty}%,\n social: ${character.social}, sleep: ${character.sleepy}%`,
          button,
          { class: "store-select-character-stats" }
        );
        button.addEventListener("click", () =>
          buyItem(character, shopItemIsOutOfScope)
        );
      }
    });
  });
}

function buyItem(character, shopItem) {
  updateCharacter(character, shopItem.stats_to_update).then(response => {
    console.log(document.getElementById("store-select-container"));

    const storeContainer = document.getElementById("store-select-container");
    storeContainer.remove();
    createShopItems();
    subtractMoney(LOGGED_IN_USER_ID, shopItem.price).then(response => {
      document.getElementById("money").innerText = `${response}G`;
    });
  });
}

function buyCharacter() {
  addCharacter();
}

function backButton() {
  const storeContainer = document.getElementById("store-container");
  storeContainer.remove();
  loadMain(LOGGED_IN_USER_ID);
}
