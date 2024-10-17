// Toggle content visibility for Telegram
document.getElementById('telegram-toggle').addEventListener('click', function() {
    const toggleContent = document.getElementById('t-toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});



// Updated services object to include Telegram services
const services = {
    telegram: [
        { value: 'telegramviews', text: 'Telegram Views - ≈ $0.15 per 1000', price: 0.15, deliveryTime: '30-60-sec', minQuantity: 100, maxQuantity: 10000 },
        { value: 'telegrammembers', text: 'Telegram Members - ≈ $0.50 per 1000', price: 0.50, deliveryTime: '1-2-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'telegramsponders', text: 'Telegram Responders - ≈ $0.70 per 1000', price: 0.70, deliveryTime: '2-3-min', minQuantity: 100, maxQuantity: 10000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('category').addEventListener('change', function() {
    const selectedCategory = this.value;
    const serviceDropdown = document.getElementById('service');
    
    // Clear the existing service options
    serviceDropdown.innerHTML = '';

    // Update the service dropdown with matching services
    services.telegram.forEach(service => {
        if (service.value === selectedCategory || selectedCategory === 'telegram') {
            const option = document.createElement('option');
            option.value = service.value;
            option.text = service.text;
            option.setAttribute('data-price', service.price);  // Attach price
            option.setAttribute('data-delivery-time', service.deliveryTime);  // Attach delivery time
            option.setAttribute('data-min-quantity', service.minQuantity);  // Attach min quantity
            option.setAttribute('data-max-quantity', service.maxQuantity);  // Attach max quantity
            serviceDropdown.appendChild(option);
        }
    });

    // If no matching services are found, show default message
    if (serviceDropdown.options.length === 0) {
        const option = document.createElement('option');
        option.text = 'No services available';
        serviceDropdown.appendChild(option);
    }

    // Update charge, delivery time, and quantity limits
    updateQuantityLimits();
    calculateCharge();
    displayDeliveryTime();
});

// Function to update the quantity input based on the selected service
function updateQuantityLimits() {
    const serviceDropdown = document.getElementById('service');
    const selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    const minQuantity = selectedService ? selectedService.getAttribute('data-min-quantity') : 1;
    const maxQuantity = selectedService ? selectedService.getAttribute('data-max-quantity') : 10000;

    const quantityInput = document.getElementById('quantity');
    quantityInput.min = minQuantity;
    quantityInput.max = maxQuantity;
    quantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity
function calculateCharge() {
    const serviceDropdown = document.getElementById('service');
    const selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    const pricePerThousand = selectedService ? selectedService.getAttribute('data-price') : 0;  // Price is per 1000 units

    const quantity = document.getElementById('quantity').value;
    
    // Calculate charge as price per 1000 units, so divide quantity by 1000
    const charge = (quantity / 1000) * pricePerThousand;

    document.getElementById('charge').value = `$${charge.toFixed(2)}`;

    // Optional: Calculate and display any discount
    const discount = calculateDiscount(quantity);
    if (discount > 0) {
        document.getElementById('discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('discount-info').textContent = '';
    }
}

// Function to display delivery time
function displayDeliveryTime() {
    const serviceDropdown = document.getElementById('service');
    const selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    const deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('delivery-time').textContent = deliveryTime;
}

// Discount calculation based on quantity
function calculateDiscount(quantity) {
    if (quantity >= 5000) {
        return 0.10;  // 10% discount for orders of 5000 or more
    } else if (quantity >= 1000) {
        return 0.05;  // 5% discount for orders of 1000 or more
    }
    return 0;  // No discount
}

// Event listeners to update charge, delivery time, and quantity limits dynamically
document.getElementById('service').addEventListener('change', function() {
    updateQuantityLimits();
    calculateCharge();
    displayDeliveryTime();
});

document.getElementById('quantity').addEventListener('input', calculateCharge);

// Order Summary Pop-up or Modal
document.getElementById('submit-btn').addEventListener('click', function() {
    const serviceDropdown = document.getElementById('service');
    const selectedServiceText = serviceDropdown.options[serviceDropdown.selectedIndex].textContent;
    const quantity = document.getElementById('quantity').value;
    const charge = document.getElementById('charge').value;
    const deliveryTime = document.getElementById('delivery-time').textContent;
    
    // Get the inputted link
    const link = document.getElementById('link').value;

    // Populate the modal fields
    document.getElementById('summary-service').textContent = selectedServiceText;
    document.getElementById('summary-link').textContent = link;  // Display the entered link
    document.getElementById('summary-quantity').textContent = quantity;
    document.getElementById('summary-charge').textContent = charge;
    document.getElementById('summary-delivery').textContent = deliveryTime;

    // Show the modal
    document.getElementById('order-summary-modal').style.display = 'block';
});

// Function to show the spinner
function showSpinner(show) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'block' : 'none';
    }
}

// Function to validate the form
function validateForm() {
    const quantity = document.getElementById('quantity').value;
    const link = document.getElementById('link').value;
    return quantity > 0 && link.trim() !== '';
}

// Confirm Order Button Event Listener
document.getElementById('confirm-order').addEventListener('click', function() {
    if (!validateForm()) {
        alert('Please fill in all fields correctly before confirming the order.');
        return;
    }

    // Show spinner while processing order
    showSpinner(true);

    // Simulate an order submission (You can replace this with actual logic)
    setTimeout(() => {
        showSpinner(false);
        alert('Order confirmed! Thank you for your purchase.');
        // Close the modal after confirmation
        document.getElementById('order-summary-modal').style.display = 'none';
    }, 2000);
});
