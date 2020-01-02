function addCharacter(){
    CONTAINER = document.getElementById("container")
    CONTAINER.style.display = "flex";
    CONTAINER.style.flexWrap = "wrap";
    getAllCharacters().then((characters) => chooseCharacter(characters))
}

function chooseCharacter(characters){
    characters.forEach(character => {
        const card = createAppendElement("div", "", CONTAINER, {class: "card", style: "width: 18rem;"})
        createAppendElement("img", "", card, {class: "card-img-top", src: `${IMAGE_PATH}/${character.image}`, alt: "character image"})
        const cardBody = createAppendElement("div", "", card, {class: "card-body"})
        createAppendElement("h5", character.name, cardBody, {class: "card-title"})
        createAppendElement("p", "nothing", cardBody, {class: "card-text"})
        const buyButton = createAppendElement("button", `${character.price} G`, cardBody, {class: "btn btn-primary cardbutton"})
        buyButton.addEventListener("click", (e) => addCharacterHandeler(e, character))
    })
}

function addCharacterHandeler(event, character){
    const shownMoney = document.getElementById("money")
    const money = parseInt(event.toElement.innerText)
    subtractMoney(LOGGED_IN_USER_ID, money).then((newMoney) => {
        if (newMoney.error != "no money"){
            shownMoney.innerText = `${newMoney} G`
            createCharacter(character, LOGGED_IN_USER_ID).then(() => loadMain(LOGGED_IN_USER_ID))
        } else {
            if(!document.getElementById("no-money"))
                createAlert("#messages", "You don't have enough money!", "danger", "append", {id: "no-money"})
        }

    })
        
            
    
}