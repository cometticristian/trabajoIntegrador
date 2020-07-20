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
                //setTimeout(() => {
                    ulSubcategory[i].style.display = 'none';
                //}, 20)

            }
            
        })
    }
    for (let i=0; i< ulSubcategory.length; i++) {
        ulSubcategory[i].addEventListener('mouseover', () => {
            
            //setTimeout(() => {
                ulSubcategory[i].style.display = 'block';
            //}, 21)
            
            
        })
    }
    for (let i=0; i< ulSubcategory.length; i++) {
        ulSubcategory[i].addEventListener('mouseout', () => {
            //setTimeout(() => {
                ulSubcategory[i].style.display = 'none';
            //}, 22)
        })
    }





})