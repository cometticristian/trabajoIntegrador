window.addEventListener("load", function () {
    let userForm = document.querySelector("form.register");
    userForm.addEventListener("change", function (e) {
        
        let errors= [] ;

        let firstName = document.querySelector("input.firstName");
        if (firstName.value.length < 2){
            let message = "El nombre debe tener al menos 2 caracteres"
            document.querySelector("span.firstName").innerText = message
        }else{document.querySelector("span.firstName").innerText = ""};

        let lastName = document.querySelector("input.lastName");
        if (lastName.value.length < 2){
            let message = "El apellido debe tener al menos 2 caracteres"
            document.querySelector("span.lastName").innerText = message
            
        }else{document.querySelector("span.lastName").innerText = ""};

        let email = document.querySelector("input.email");
        if (email.value.indexOf('@') < 0){
            errors.push(["Debe ingresar un Email valido", "email"]);
        };

        let phone = document.querySelector("input.phone");
        let noNumero = isNaN(phone.value)
        if (noNumero && phone.value.length != 10){
            errors.push(["El teléfono debe tener 10 dígitos e incluir el código de area", "phone"]);
        };

        let password = document.querySelector("input.password");
        if (password.value.length<8){
            errors.push(["La contraseña debe tener al menos 8 caracteres","password"]);
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
                if(error[1] == "firstName"){if(firstName.innerHTML==""){firstName.innerHTML += error[0]}}
                else if(error[1] == "lastName"){if(lastName.innerHTML==""){lastName.innerHTML += error[0]}}
                else if(error[1] == "email"){if(email.innerHTML==""){email.innerHTML += error[0]}}
                else if(error[1] == "phone"){if(phone.innerHTML==""){phone.innerHTML += error[0]}}
                else if(error[1] == "password"){if(password.innerHTML==""){password.innerHTML += error[0]}}
                else if(error[1] == "passwordConfirm"){if(passwordConfirm.innerHTML==""){passwordConfirm.innerHTML += error[0]}}
            });
            console.log(errors);
        }
    });
})