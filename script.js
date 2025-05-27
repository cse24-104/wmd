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
  <script>
      // Add to cart functionality
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productId = productCard.dataset.id;
          const productName = productCard.querySelector('.card-title').textContent;
          const productPrice = productCard.querySelector('.text-success').textContent;
          
          // In a real app, you would add this to a cart array or send to server
          alert(`Added to cart: ${productName} - ${productPrice}`);
          
          // You can add animation here
          this.textContent = 'Added!';
          this.classList.add('btn-success');
          this.classList.remove('btn-outline-dark');
          
          setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.classList.remove('btn-success');
            this.classList.add('btn-outline-dark');
          }, 2000);
        });
      });
    </script>
    <script>
      // Product page functionality
      document.addEventListener('DOMContentLoaded', function() {
        // Thumbnail image click
        document.querySelectorAll('.thumbnail-images img').forEach(thumb => {
          thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            document.querySelectorAll('.thumbnail-images img').forEach(img => {
              img.classList.remove('active');
            });
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            document.getElementById('main-image').src = this.dataset.main;
          });
        });
        
        // Quantity selector
        const quantityInput = document.querySelector('.quantity');
        document.querySelector('.decrease').addEventListener('click', function() {
          if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
          }
        });
        
        document.querySelector('.increase').addEventListener('click', function() {
          quantityInput.value = parseInt(quantityInput.value) + 1;
        });
        
        // Validate quantity input
        quantityInput.addEventListener('change', function() {
          if (isNaN(this.value) || this.value < 1) {
            this.value = 1;
          }
        });
        
        // Add to cart button
        document.querySelector('.add-to-cart').addEventListener('click', function() {
          const product = {
            id: 'inter-miami-2024-home',
            name: 'Inter Miami Home Jersey 2024',
            price: 89.99,
            image: 'images/Jerseys/1026752_Main_1946086.avif',
            quantity: parseInt(quantityInput.value),
            size: document.querySelector('input[name="size"]:checked').nextElementSibling.textContent
          };
          
          // In a real app, you would add to cart here
          alert(`${product.quantity} x ${product.name} (Size: ${product.size}) added to cart!`);
          
          // Button animation
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
          this.classList.add('btn-success');
          
          setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('btn-success');
          }, 2000);
        });
        
        // Wishlist button
        document.querySelector('.wishlist-btn').addEventListener('click', function() {
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="fas fa-heart me-2"></i>Saved!';
          this.classList.add('text-danger');
          
          setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('text-danger');
          }, 2000);
        });
      });
    </script>