window.addEventListener('load', () => {

    let divUlSubcategory = document.querySelectorAll('.ulSubcategory')
    let ulSubcategory = document.querySelectorAll('.subcategory');
    let aCategory = document.querySelectorAll('.categoryTitle');
    let toggle = document.querySelector('.btn-toggle-navbar');
    let mobile = document.querySelector('.mobile-navbar');
    
    
    if (mobile.style.display = 'none') {
        toggle.addEventListener('click', () => {
            mobile.style.display = 'block';
            
            if (mobile.style.display = 'block') {
                toggle.addEventListener('click', () => {
                    mobile.style.display = 'none';
                })
            }
        })        
    }
    
    for (let i = 0; i < aCategory.length; i++) {
        aCategory[i].addEventListener('mouseover', () => {
        for (let pos=0; pos < ulSubcategory.length; pos++) {
                ulSubcategory[i].style.display = 'block';
            }
        })
    }   
    for (let i = 0; i < aCategory.length; i++) {
        aCategory[i].addEventListener('mouseout', () => {
            for (let pos=0; pos < ulSubcategory.length; pos++) {
                    ulSubcategory[i].style.display = 'none';
            }    
        })
    }
    for (let i=0; i< ulSubcategory.length; i++) {
        ulSubcategory[i].addEventListener('mouseover', () => {   
                ulSubcategory[i].style.display = 'block';
        })
    }
    for (let i=0; i< ulSubcategory.length; i++) {
        ulSubcategory[i].addEventListener('mouseout', () => {
                ulSubcategory[i].style.display = 'none';
        })
    }
})