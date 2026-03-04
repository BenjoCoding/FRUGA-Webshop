document.querySelectorAll('.js-kauf-button')
.forEach((button) => {
    button.addEventListener('click', () => {
    const productEan = button.dataset.productEan;
    let matchingItem;

    cart.forEach((item) => {
        if(productEan === item.productEan) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    }

    else{ 
         cart.push({
        productEan: productEan,
        quantity: 1
    });
    }

   
    console.log(cart);
    });
});