window.addEventListener("load", function () {
    let productForm = document.querySelector("form.productValidate");
    productForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let errors= [] ;

        let name = document.querySelector("input.name");
        console.log(name.value);
        if (name.value.length < 5){
            errors.push(["El nombre debe tener al menos 5 caracteres", "name"]);
        };

        let brand = document.querySelector("input.brand");
        if (brand.value.length < 1){
            errors.push(["Debe completar la marca", "brand"]);
        };

        let price = document.querySelector("input.price");
        if (price.value.length < 1){
            errors.push(["Debe completar el precio", "price"]);
        };

        let discount = document.querySelector("input.discount");
        if (discount.value.length < 1){
            errors.push(["Debe completar el descuento aunque sea 0", "discount"]);
        };

        let description = document.querySelector("textarea.description");
        if (description.value.length < 20){
            errors.push(["La descripción debe tener al menos 20 caracteres", "description"]);
        };

        if (errors.length > 0){
            e.preventDefault();
            let name = document.querySelector("span.name");
            let brand = document.querySelector("span.brand");
            let price = document.querySelector("span.price");
            let discount = document.querySelector("span.discount");
            let description = document.querySelector("span.description");
            errors.forEach(error => {
                if(error[1] == "name"){name.innerHTML += error[0]}
                else if(error[1] == "brand"){brand.innerHTML += error[0]}
                else if(error[1] == "price"){price.innerHTML += error[0]}
                else if(error[1] == "discount"){discount.innerHTML += error[0]}
                else if(error[1] == "description"){description.innerHTML += error[0]}
                
            });
        }
    });
})