LOGGED_IN_USER_ID = 13
ASSET_ROOT = "http://localhost:3000"
CONTAINER = document.getElementById("container")
IMAGE_PATH = "./src/img"



//IDEA: CHARACTER ONLY MOVES WHEN HOVERING OVER It


loadMain()
function loadMain(){
    document.addEventListener("DOMContentLoaded", () => {
        getCharactersByUserId(LOGGED_IN_USER_ID).then((characterList) => {
            if(characterList.length >= 1){
                //go to see all characters
                //change character list to 1
            }else{
                createAlert("#messages", "Please chose your character!", "success", "prepend")
                addCharacter()
            }
            showMoney(LOGGED_IN_USER_ID)
        })
    })
}


