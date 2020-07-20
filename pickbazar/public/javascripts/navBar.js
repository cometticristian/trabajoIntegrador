window.addEventListener('load', () => {

    let divUlSubcategory = document.querySelectorAll('.ulSubcategory')
    let ulSubcategory = document.querySelectorAll('.generico');
    let aCategory = document.querySelectorAll('.categoryTitle');

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