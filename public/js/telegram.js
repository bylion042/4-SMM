// Toggle content visibility for Telegram
document.getElementById('telegram-toggle').addEventListener('click', function() {
    const toggleContent = document.getElementById('t-toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Define services for Telegram
// Telegram services data
const telegramServices = {
    telegram: [
        { value: 'telegramviews', text: 'Telegram Views - ≈ $0.30 per 1000', price: 0.30, deliveryTime: '2-5-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'telegrammembers', text: 'Telegram Members - ≈ $0.50 per 1000', price: 0.50, deliveryTime: '10-15-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'telegramsponders', text: 'Telegram Responders - ≈ $0.40 per 1000', price: 0.40, deliveryTime: '7-10-min', minQuantity: 100, maxQuantity: 10000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection for Telegram
document.getElementById('category').addEventListener('change', function() {
    const selectedCategory = this.value;
    const telegramServiceDropdown = document.getElementById('service');
    
    // Clear the existing service options
    telegramServiceDropdown.innerHTML = '';

    // Update the service dropdown with matching services
    telegramServices.telegram.forEach(service => {
        if (selectedCategory === 'telegram' || service.value.includes(selectedCategory)) {
            const option = document.createElement('option');
            option.value = service.value;
            option.text = service.text;
            option.setAttribute('data-price', service.price);  // Attach price
            option.setAttribute('data-delivery-time', service.deliveryTime);  // Attach delivery time
            option.setAttribute('data-min-quantity', service.minQuantity);  // Attach min quantity
            option.setAttribute('data-max-quantity', service.maxQuantity);  // Attach max quantity
            telegramServiceDropdown.appendChild(option);
        }
    });

    // If no matching services are found, show default message
    if (telegramServiceDropdown.options.length === 0) {
        const option = document.createElement('option');
        option.text = 'No services available';
        telegramServiceDropdown.appendChild(option);
    }

    // Update charge, delivery time, and quantity limits
    updateTelegramQuantityLimits();
    calculateTelegramCharge();
    displayTelegramDeliveryTime();
});

// Function to update the quantity input based on the selected Telegram service
function updateTelegramQuantityLimits() {
    const telegramServiceDropdown = document.getElementById('service');
    const selectedTelegramService = telegramServiceDropdown.options[telegramServiceDropdown.selectedIndex];
    const minQuantity = selectedTelegramService ? selectedTelegramService.getAttribute('data-min-quantity') : 1;
    const maxQuantity = selectedTelegramService ? selectedTelegramService.getAttribute('data-max-quantity') : 10000;

    const telegramQuantityInput = document.getElementById('quantity');
    telegramQuantityInput.min = minQuantity;
    telegramQuantityInput.max = maxQuantity;
    telegramQuantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity for Telegram
function calculateTelegramCharge() {
    const telegramServiceDropdown = document.getElementById('service');
    const selectedTelegramService = telegramServiceDropdown.options[telegramServiceDropdown.selectedIndex];
    const pricePerThousand = selectedTelegramService ? selectedTelegramService.getAttribute('data-price') : 0;  // Price is per 1000 units

    const telegramQuantity = document.getElementById('quantity').value;
    
    // Calculate charge as price per 1000 units, so divide quantity by 1000
    const charge = (telegramQuantity / 1000) * pricePerThousand;

    document.getElementById('charge').value = `$${charge.toFixed(2)}`;

    // Optional: Calculate and display any discount
    const discount = calculateTelegramDiscount(telegramQuantity);
    if (discount > 0) {
        document.getElementById('discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('discount-info').textContent = '';
    }
}

// Function to display delivery time for Telegram
function displayTelegramDeliveryTime() {
    const telegramServiceDropdown = document.getElementById('service');
    const selectedTelegramService = telegramServiceDropdown.options[telegramServiceDropdown.selectedIndex];
    const deliveryTime = selectedTelegramService ? selectedTelegramService.getAttribute('data-delivery-time') : '';
    document.getElementById('delivery-time').textContent = deliveryTime;
}

// Discount calculation based on quantity for Telegram
function calculateTelegramDiscount(quantity) {
    if (quantity >= 5000) {
        return 0.10;  // 10% discount for orders of 5000 or more
    } else if (quantity >= 1000) {
        return 0.05;  // 5% discount for orders of 1000 or more
    }
    return 0;  // No discount
}

// Event listeners to update charge, delivery time, and quantity limits dynamically for Telegram
document.getElementById('service').addEventListener('change', function() {
    updateTelegramQuantityLimits();
    calculateTelegramCharge();
    displayTelegramDeliveryTime();
});

document.getElementById('quantity').addEventListener('input', calculateTelegramCharge);

// Order Summary Pop-up or Modal for Telegram
document.getElementById('submit-btn').addEventListener('click', function() {
    const telegramServiceDropdown = document.getElementById('service');
    const selectedTelegramServiceText = telegramServiceDropdown.options[telegramServiceDropdown.selectedIndex].textContent;
    const telegramQuantity = document.getElementById('quantity').value;
    const telegramCharge = document.getElementById('charge').value;
    const telegramDeliveryTime = document.getElementById('delivery-time').textContent;
    
    // Get the inputted link
    const telegramLink = document.getElementById('link').value;

    // Populate the modal fields
    document.getElementById('summary-service').textContent = selectedTelegramServiceText;
    document.getElementById('summary-link').textContent = telegramLink;  // Display the entered link
    document.getElementById('summary-quantity').textContent = telegramQuantity;
    document.getElementById('summary-charge').textContent = telegramCharge;
    document.getElementById('summary-delivery').textContent = telegramDeliveryTime;

    // Show the modal
    document.getElementById('order-summary-modal').style.display = 'block';
});

// Function to show the spinner for Telegram
function showTelegramSpinner(show) {
    const telegramSpinner = document.getElementById('loading-spinner');
    if (telegramSpinner) {
        telegramSpinner.style.display = show ? 'block' : 'none';
    }
}

// Function to validate the form for Telegram
function validateTelegramForm() {
    const telegramService = document.getElementById('service').value;
    const telegramLink = document.getElementById('link').value;
    const telegramQuantity = document.getElementById('quantity').value;

    // Check for empty fields
    if (!telegramService || !telegramLink || !telegramQuantity) {
        // Show error toast for empty fields
        Toastify({
            text: "Please fill in all fields before submitting.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#7474ac",  
            style: {
                borderRadius: "5px",
                fontSize: "15px"
            }
        }).showToast();
        return false; // Form is not valid
    }
    return true; // Form is valid
}

// Event listener for Submit button on Telegram
document.getElementById('submit-btn').addEventListener('click', function() {
    if (validateTelegramForm()) {
        displayTelegramOrderSummary();  // Show summary if form is valid
    }
});

// Event listener for Confirm Order button for Telegram
document.getElementById('confirm-order').addEventListener('click', function() {
    if (validateTelegramForm()) {  // Ensure the form is validated before processing
        processTelegramOrder();  // Process the order after confirming
    }
});

// Function to display the order summary for Telegram
function displayTelegramOrderSummary() {
    const telegramServiceDropdown = document.getElementById('service');
    const selectedTelegramService = telegramServiceDropdown.options[telegramServiceDropdown.selectedIndex].text;
    const telegramLink = document.getElementById('link').value;
    const telegramQuantity = document.getElementById('quantity').value;
    const telegramCharge = document.getElementById('charge').value;
    const telegramDeliveryTime = document.getElementById('summary-delivery').textContent;

    // Populate the summary modal
    document.getElementById('summary-service').textContent = selectedTelegramService;
    document.getElementById('summary-link').textContent = telegramLink;
    document.getElementById('summary-quantity').textContent = telegramQuantity;
    document.getElementById('summary-charge').textContent = telegramCharge;
    document.getElementById('summary-delivery').textContent = telegramDeliveryTime;

    // Show the summary modal
    document.getElementById('order-summary-modal').style.display = 'block';
}

// Function to process the order for Telegram (after confirmation)
function processTelegramOrder() {
    showTelegramSpinner(true); // Show the loading spinner while processing

    setTimeout(function() {
        // Simulate successful order processing with a toast notification
        Toastify({
            text: "Order placed successfully!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#28a745",
            style: {
                borderRadius: "5px",
                fontSize: "15px"
            }
        }).showToast();

        // Hide the spinner and modal after processing
        showTelegramSpinner(false);
        document.getElementById('order-summary-modal').style.display = 'none';
    }, 2000); // Simulated delay of 2 seconds for order processing
}
