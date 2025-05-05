// Product Cart Functionality
let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCartCount();
    }
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const button = event.target;
    const productCard = button.closest('.product-card');
    const productId = productCard.dataset.id;
    const productName = productCard.querySelector('.card-title').textContent;
    const productPrice = parseFloat(productCard.querySelector('.card-text').textContent.replace('$', ''));
    const productImage = productCard.querySelector('img').src;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    // Update localStorage and UI
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    alert(`${productName} has been added to your cart!`);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Form Validation for feedback.html
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields');
        return false;
    }
    
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}