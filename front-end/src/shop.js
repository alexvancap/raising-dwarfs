function showShopMenue(){
    const storeContainer = createAppendElement("div", "", MAINTAG, {id: "store-container"})
    const shopKeeper = createAppendElement("img", "", storeContainer, {id: "shop-keeper", src: `${IMAGE_PATH}/store/seller.gif`})
    shopKeeper.style.zIndex = 2
    const interval = setTimeout(() => {
        const shopMenue = createAppendElement("ul", "", storeContainer, {id: "shop-menue",})
        const li1 = createAppendElement("li", "Food and drinks", shopMenue, {class: "shop-menue-item"})

        createAppendElement("li", "Items", shopMenue, {class: "shop-menue-item"})
        createAppendElement("li", "Back", shopMenue, {class: "shop-menue-item", display: "inline-block"})

    }, 650)
}