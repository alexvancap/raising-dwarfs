const loginForm = () => {

    if (parseInt(localStorage.user_id)){ return loadMain()}

    document.body.style.background=  `#2b0200 url(./src/img/backgrounds/forest${getRandomNumber(1, 3)}.png) no-repeat center top`
    document.body.style.backgroundSize= "auto 750px"
   
    
    resetMainTagHTML()

    const formTag = createAppendElement("form", "", MAINTAG, {class: "login-form needs-validation"})
    //dissables standart html validation
    formTag.setAttribute("novalidate", "true")
    
    //create email input
    const usernameDiv = createAppendElement("div", "", formTag, {id: "login-username", class: "form-group"})
    createAppendElement("label", "email", usernameDiv, {class: "form-label", for: "emailInput"})
    createAppendElement("input", "", usernameDiv, {id: "emailInput", placeholder: "Your email...", class: "form-control", type: "email", name: "email", required: "true"})

    //create password input
    const passwordDiv = createAppendElement("div", "", formTag, {id: "login-password", class: "form-group"})
    createAppendElement("label", "password", passwordDiv, {class: "form-label"})
    createAppendElement('input', "", passwordDiv, {id: "passwordInput", placeholder: "Password...", class: "form-control", type: "password", name: "password"})
    
    //Create remember me checkbox
    const rememberMeDiv = createAppendElement("div", "", formTag, {id: "rememberMeDiv", class: "form-group form-check"})
    const checkBox = createAppendElement("input", "", rememberMeDiv, {type: "checkbox", class: "form-check-input", id:"rememberMeBox"})
    createAppendElement("label", "Remember me!", rememberMeDiv, {class: "form-check-label", for: "rememberMeBox"})
 
    //create login
    createAppendElement("button", "Login", formTag, {class: "btn btn-primary", type: "submit"})
    //Create signup button
    registerButton = createAppendElement("button", "Sign Up", formTag, {id: "signUpButton",class: "btn btn-primary", type:"button"})

    
    loginFormHandeler(formTag, checkBox)
    registrationForm(registerButton)

}


//validates login information => 
const loginFormHandeler = (formTag, checkBox) => {
    formTag.addEventListener("submit", (e) => {
        e.preventDefault()
        fetch(`${ASSET_ROOT}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: e.target.elements[0].value,
                password: e.target.elements[1].value
            })
        }).then((response) => response.json())
        .then((response) => handleLoginOutPut(response, checkBox) )
    })
}

//gives errors with login information if no error sends you to the homepage
const handleLoginOutPut = (response, checkBox) => {
    
    if (checkBox.checked){
        localStorage.setItem("user_id", response.id)
    }
    const usernameDiv = document.getElementById("login-username")
    const passwordDiv = document.getElementById("login-password")
    getAndRemoveElement(".error-message")
    removeClassByIds(["emailInput", "passwordInput"], "is-invalid")
    if (response.email_error || response.password_error){
        for(error in response){
            if (response[error] === "Wrong email"){
                addClassById("emailInput", "is-invalid")
                console.log("Wrong email")
                createAppendElement("label", "Email does not exist!", usernameDiv, {class: "error-message"})
            }else if (response[error] === "Wrong password"){
                addClassById("passwordInput", "is-invalid")
                console.log("Wrong password")
                createAppendElement("label", "password does not match email!", passwordDiv, {class: "error-message"})
            }
        }
    }else{
        resetMainTagHTML()
        loadMain(response.id)
    }
}




//creates registration form
const registrationForm = (registerButton) => {
    registerButton.addEventListener("click", (e) => {
        resetMainTagHTML()
        createAppendElement("h1", "Sign up", MAINTAG)

        //create form
        const formTag = createAppendElement("form", "", MAINTAG, {class: "register-form needs-validation"})
        //dissables standart html validation
        formTag.setAttribute("novalidate", "true")

        //username
        usernameDiv = createAppendElement("div", "", formTag, {id: "register-username-div", class: "form-group"})
        createAppendElement("label", "username", usernameDiv, {class: "form-label", for: "register-username"})
        createAppendElement("input", "", usernameDiv, {id: "register-username", placeholder: "Enter username", class: "form-control", type: "text", name: "username", required: "true"})

        //email
        emailDiv = createAppendElement("div", "", formTag, {id: "register-email-div", class: "form-group"})
        createAppendElement("label", "email:", emailDiv, {class: "form-label", for: "register-email"})
        createAppendElement("input", "", emailDiv, {id: "register-email", placeholder: "Enter email", class: "form-control", type: "email", name: "email", required: "true"})

        //password
        passwordDiv = createAppendElement("div", "", formTag, {id: "register-password-div", class: "form-group"})
        createAppendElement("label", "password:", passwordDiv, {class: "form-label", for: "register-password"})
        createAppendElement("input", "", passwordDiv, {id: "register-password", placeholder: "Enter password", class: "form-control", type: "password", name: "password", required: "true"})

        //repeat password
        repeatedPasswordDiv = createAppendElement("div", "", formTag, {id: "register-repeated-password-div", class: "form-group"})
        createAppendElement("label", "repeat password:", repeatedPasswordDiv, {class: "form-label", for: "register-repeated-password"})
        createAppendElement("input", "", repeatedPasswordDiv, {id: "register-repeated-password", placeholder: "Enter password", class: "form-control", type: "password", name: "repeated_password", required: "true"})

        //submit button
        createAppendElement("button", "Register", formTag, {class: "btn btn-primary", type: "submit"})

        registrationHandeler(formTag)
    })
}

//checks login info whit in the server (sends it to the application controller)
const registrationHandeler = (formTag) => {
    formTag.addEventListener("submit", (e) => {
        e.preventDefault()
        if (e.target.elements[2].value !== e.target.elements[3].value){
            return console.log("passwords do not match!")
        }
        fetch(`${ASSET_ROOT}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: e.target.elements[0].value,
                email: e.target.elements[1].value,
                password: e.target.elements[2].value,
            })
        }).then((result) => {
            return result.json()
        }).then(registrationOutput)
    })
}


//gives error with registration, if no errors sends you to the login form
const registrationOutput = (result) => {
    getAndRemoveElement(".error-message")
    removeClassByIds(["register-username"], "is-invalid")
    if (!result.username_error && !result.password_error){
        loginForm()
    }else{
        for(errortype in result){
            if (errortype === "username_error"){
                addClassById("register-username", "is-invalid")
            }else if(errortype === "email_error"){
                addClassById("register-email", "is-invalid")
            }else if(errortype === "password_error"){
                addClassById("register-password", "is-invalid")
            }else if(errorType === "repeat_password_error"){
                caddClassById("register-repeated-password", "is-invalid")
            }
            
        }
    }
}

