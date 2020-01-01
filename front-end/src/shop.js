function showShopMenue(){
    const storeContainer = createAppendElement("div", "", MAINTAG, {id: "store-container"})
    //creates image with random query string
    const shopKeeper = createAppendElement("img", "", storeContainer, {id: "shop-keeper", src: `${IMAGE_PATH}/store/seller.gif?a=${Math.random()}`})
    shopKeeper.style.zIndex = 2

    setTimeout(() => {
        const shopMenue = createAppendElement("ul", "", storeContainer, {id: "shop-menue",})
        const foodAndDrinks = createAppendElement("li", "Food and drinks", shopMenue, {class: "shop-menue-item"})
        const items = createAppendElement("li", "Items", shopMenue, {class: "shop-menue-item"})
        const back = createAppendElement("li", "Back", shopMenue, {class: "shop-menue-item", display: "inline-block"})

        foodAndDrinks.addEventListener("click", () => createShopItems())
        // items.addEventListener("click", () => )
        back.addEventListener("click", () => {
            document.getElementById("store-container").remove()
        })
        

    }, 650)
    
}

function createShopItems(){
    const storeContainer = document.getElementById("store-container")
    storeContainer.innerHTML = ""
    img = createAppendElement("img", "", MAINTAG, {src: "./src/img/store/wooden-board.png"})

}
function backButton(){
    const storeContainer = document.getElementById("store-container")
            storeContainer.remove()
            loadMain()
}