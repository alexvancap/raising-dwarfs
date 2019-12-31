LOGGED_IN_USER_ID = 1
ASSET_ROOT = "http://localhost:3000"
CONTAINER = document.getElementById("container")
MESSAGES = document.getElementById("messages")
IMAGE_PATH = "./src/img"



//IDEA: CHARACTER ONLY MOVES WHEN HOVERING OVER It


document.addEventListener("DOMContentLoaded", () => {
    loadMain()
})

function loadMain(){
        getCharactersByUserId(LOGGED_IN_USER_ID).then((characterList) => {
            console.log(characterList)
            if(characterList.length >= 1){
                console.log(CONTAINER)
                CONTAINER.innerHTML = ""
                MESSAGES.innerHTML = ""
            }else{
                createAlert("#messages", "Please chose your character!", "success", "prepend")
                addCharacter()
            }
            showMoney(LOGGED_IN_USER_ID)
        })
}


