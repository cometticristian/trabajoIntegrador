window.addEventListener("load", function () {
    let form = document.querySelector("form.register");
    form.addEventListener("submit", function (e) {
        
        let errors= [] ;

        let firstName = document.querySelector("input.firstName");
        if (firstName.value.length < 2){
            errors.push(["El nombre debe tener al menos 2 caracteres", "firstName"]);
        };

        let lastName = document.querySelector("input.lastName");
        if (lastName.value.length < 2){
            errors.push(["El apellido debe tener al menos 2 caracteres", "lastName"]);
        };

        let email = document.querySelector("input.email");
        if (email.value.indexOf('@') < 0){
            errors.push(["Email inválido", "email"]);
        };

        let phone = document.querySelector("input.phone");
        if (phone.value.length!=8 || phone.value.length!=10){
            errors.push(["El teléfono debe tener 8 o 10 números", "phone"]);
        };

        let password = document.querySelector("input.password");
        if (password.value.length<6){
            errors.push(["La contraseña debe tener al menos 6 caracteres","password"]);
        };

        let passwordConfirm = document.querySelector("input.passwordConfirm");
        if (passwordConfirm.value != password.value){
            errors.push(["Las contraseñas no coinciden", "passwordConfirm"]);
        };

        if (errors.length > 0){
            e.preventDefault();
            let firstName = document.querySelector("span.firstName");
            let lastName = document.querySelector("span.lastName");
            let email = document.querySelector("span.email");
            let phone = document.querySelector("span.phone");
            let password = document.querySelector("span.password");
            let passwordConfirm = document.querySelector("span.passwordConfirm");
            errors.forEach(error => {
                if(error[1] == "firstName"){firstName.innerHTML += error[0]}
                else if(error[1] == "lastName"){lastName.innerHTML += error[0]}
                else if(error[1] == "email"){email.innerHTML += error[0]}
                else if(error[1] == "phone"){phone.innerHTML += error[0]}
                else if(error[1] == "password"){password.innerHTML += error[0]}
                else if(error[1] == "passwordConfirm"){passwordConfirm.innerHTML += error[0]}
            });
        }
    });
})