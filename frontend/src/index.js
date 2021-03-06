ASSET_ROOT = "http://localhost:3000";
MAINTAG = document.querySelector("main");
IMAGE_PATH = "./src/img";

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.user_id) {
    loginForm(MAINTAG);
  } else loadMain(localStorage.user_id);
});

function loadMain(user_id) {
  LOGGED_IN_USER_ID = user_id;

  MESSAGES = document.getElementById("messages");

  document.body.style.background =
    "#2b0200 url(./src/img/backgrounds/forest4.png) no-repeat center top";
  document.body.style.backgroundSize = "auto 750px";

  // function createPrependElement(tag, input, parent, attributes = {}) {
  //   const createdTag = document.createElement(tag);
  //   createdTag.innerText = input;
  //   for (attribute in attributes) {
  //     createdTag.setAttribute(attribute, attributes[attribute]);
  //   }
  //   parent.prepend(createdTag);
  //   return createdTag;
  // }

  createPrependElement("div", "", MAINTAG, { id: "messages" });
  createPrependElement("img", "", MAINTAG, {
    id: "character-building",
    src: "./src/img/buildings/character_building.png",
    onclick: "characterMenue()",
    width: "281px",
    height: "255px"
  });
  createPrependElement("img", "", MAINTAG, {
    id: "shop-sign",
    src: "./src/img/buildings/shop_sign.png",
    width: "104px",
    height: "126px"
  });
  createPrependElement("img", "", MAINTAG, {
    id: "shop-building",
    src: "./src/img/buildings/shop_building.png",
    onclick: "showShopMenue()",
    width: "281px",
    height: "255px"
  });

  getCharactersByUserId(LOGGED_IN_USER_ID).then(characterList => {
    if (MESSAGES) MESSAGES.innerHTML = "";
    if (characterList.length >= 1) {
      CONTAINER.innerHTML = "";
    } else {
      createAlert(
        "#messages",
        "Please chose your character!",
        "success",
        "prepend"
      );
      addCharacter();
    }
  });

  CONTAINER = document.getElementById("container");
  if (!CONTAINER) {
    CONTAINER = createAppendElement("div", "", MAINTAG, { id: "container" });
  }

  if (!document.getElementById("money")) {
    createMenue();
  }
}
