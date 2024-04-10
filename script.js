// Email check
const email = document.getElementById("mail");
const form = document.querySelector("form");
const emailError = document.querySelector("#mail + span.error");


email.addEventListener("input", (event) => {
    if(email.validity.valid) {
        
        emailError.textContent = ""
    }else {
       showEmailError() 
    }
});

form.addEventListener("submit", (event) => {
    if(!email.validity.valid) {
        showEmailError();
        event.preventDefault();
    }
});

function showEmailError() {
    if(email.validity.valueMissing) {
        emailError.textContent = "Please enter an email address";
    } else if(email.validity.typeMismatch) {
        emailError.textContent = "Please enter a valid email address";
    } else if(email.validity.tooShort) {
        emailError.textContent = `The email you entered is too short, you need to enter atleast ${email.minlength} characters , and you have types ${email.value.length} characters.`
    }
}

// ZIP Check

function checkZIP() {
    const constraints = {
        ch: [
            "^(CH-)?\\d{4}$",
            "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
          ],
        bg: [
            "^(BG-)?\\d{4}$",
            "Bulgaria zipcodes must have exactly 4 digits: e.g BG-2850, 2850",
        ],
    };
    const country = document.getElementById("country").value;

    const ZIPField = document.getElementById("ZIP");

    const constraint = new RegExp(constraints[country][0]);

    if(constraint.test(ZIPField.value)) {
        ZIPField.setCustomValidity("")
    } else {
        ZIPField.setCustomValidity(constraints[country][1]);
    }
}

function checkPass() {
    let passchecks =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    const pass = document.getElementById("pass"); 
    

    const passconstraint = new RegExp(passchecks);
    if(passconstraint.test(pass.value)) {
    pass.setCustomValidity("")
    } else {
        pass.setCustomValidity("The password mustbe 8 to 15 characters long and contain an uppercase letter, a lowercase letter, number and a special symbol.") 
    }
}

function checkConfirmPass() {
    let passchecks = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    const confPass = document.getElementById("confirmPass");

    const passconstraint = new RegExp(passchecks);
    if(passconstraint.test(confPass.value)) {
        confPass.setCustomValidity("")
    } else {
        confPass.setCustomValidity("The password mustbe 8 to 15 characters long and contain an uppercase letter, a lowercase letter, number and a special symbol.")
    }
}


document.querySelector(".button").addEventListener("click", function(event) {
    const pass =  document.getElementById("pass").value;
    const confPass = document.getElementById("confirmPass").value;
    const passError = document.querySelector(".matchPass");

    if(pass !== confPass) {
        passError.textContent = "Passwords do not match"
        event.preventDefault();
    }  else if(pass === confPass) {
        passError.textContent = ""
    }
})

window.onload = () => {
    document.getElementById("country").onchange = checkZIP;
    document.getElementById("ZIP").oninput = checkZIP;
    document.getElementById("pass").oninput = checkPass;
    document.getElementById("confirmPass").oninput = checkConfirmPass;
    
}