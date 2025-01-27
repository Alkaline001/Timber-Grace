const products = document.querySelectorAll('.product');
const cartList = document.querySelector('#cart ul');
const totalDisplay = document.querySelector('#cart .total');
const productList = document.getElementById('product-list');
const seeMoreButton = document.getElementById('see-more');
const aboutButton = document.querySelector('.nav-buttons button:nth-child(2)'); // About button
const aboutSection = document.getElementById('about-section'); // About section
let selectedProduct = null; // Track the selected product
let total = 0; // Ensure total is initialized

// Toggle About Section
aboutButton.addEventListener('click', () => {
    const isVisible = aboutSection.style.display === 'block';
    aboutSection.style.display = isVisible ? 'none' : 'block';
});

// Product selection and cart logic
products.forEach(product => {
    const name = product.getAttribute('data-name');
    const price = parseFloat(product.getAttribute('data-price'));
    const imageUrl = product.querySelector('img').src;

    product.querySelector('button').addEventListener('click', () => {
        // Add product details to the cart
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${name} - Ksh. ${price.toFixed(2)} 
            <button class="remove">Remove</button>
            <input type="hidden" value="${imageUrl}" class="product-image">
        `;
        cartList.appendChild(listItem);

        selectedProduct = { name, price, imageUrl }; // Store the selected product

        // Update total
        total += price;
        totalDisplay.textContent = `Total: Ksh. ${total.toFixed(2)}`;

        listItem.querySelector('.remove').addEventListener('click', () => {
            listItem.remove();
            total -= price;
            totalDisplay.textContent = `Total: Ksh. ${total.toFixed(2)}`;
            if (cartList.children.length === 0) selectedProduct = null; // Clear if no products remain
        });
    });
});

// See More Button Logic
document.addEventListener("DOMContentLoaded", () => {
    const seeMoreButton = document.getElementById("see-more");
    const hiddenProducts = document.querySelectorAll(".product.hidden");

    seeMoreButton.addEventListener("click", () => {
        hiddenProducts.forEach((product) => {
            product.classList.remove("hidden");
        });
        seeMoreButton.style.display = "none"; // Hide the "See More" button after clicking
    });
});

// Checkout Button Logic
const checkoutButton = document.querySelector('#checkout');
checkoutButton.addEventListener('click', () => {
    if (!selectedProduct) {
        alert('Your cart is empty!');
        return;
    }

    const whatsappNumber = '+254700480098';
    const message = encodeURIComponent(`Is this Available? Like to purchase.`);
    const imageUrl = encodeURIComponent(selectedProduct.imageUrl);

    // Redirect to WhatsApp with the image and message
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}%0A`;
    window.location.href = whatsappURL;
});
