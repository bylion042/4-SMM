// Toggle content visibility for Telegram
document.getElementById('telegram-toggle').addEventListener('click', function() {
    let toggleContent = document.getElementById('telegram-toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Define services for Telegram
let telegramServices = {
    telegram: [
        { value: 'telegramviews', text: 'Telegram Views - ≈ $0.25 per 1000', price: 0.25, deliveryTime: '2-5 min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'telegrammembers', text: 'Telegram Members - ≈ $1.50 per 1000', price: 1.50, deliveryTime: '5-15 min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'telegramsponders', text: 'Telegram Responders - ≈ $0.90 per 1000', price: 0.90, deliveryTime: '10-20 min', minQuantity: 100, maxQuantity: 10000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('telegram-category').addEventListener('change', function() {
    let selectedCategory = this.value;
    let serviceDropdown = document.getElementById('telegram-service');
    
    serviceDropdown.innerHTML = ''; // Clear existing options

    // Populate the services based on the category selected
    telegramServices.telegram.forEach(service => {
        if (service.value === selectedCategory || selectedCategory === 'telegram') {
            let option = document.createElement('option');
            option.value = service.value;
            option.text = service.text;
            option.setAttribute('data-price', service.price);
            option.setAttribute('data-delivery-time', service.deliveryTime);
            option.setAttribute('data-min-quantity', service.minQuantity);
            option.setAttribute('data-max-quantity', service.maxQuantity);
            serviceDropdown.appendChild(option);
        }
    });

    if (serviceDropdown.options.length === 0) {
        let option = document.createElement('option');
        option.text = 'No services available';
        serviceDropdown.appendChild(option);
    }

    // Update quantity limits and calculate charge
    updateTelegramQuantityLimits();
    calculateTelegramCharge();
    displayTelegramDeliveryTime();
});

// Function to update the quantity input based on the selected Telegram service
function updateTelegramQuantityLimits() {
    let serviceDropdown = document.getElementById('telegram-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let minQuantity = selectedService ? selectedService.getAttribute('data-min-quantity') : 1;
    let maxQuantity = selectedService ? selectedService.getAttribute('data-max-quantity') : 10000;

    let quantityInput = document.getElementById('telegram-quantity');
    quantityInput.min = minQuantity;
    quantityInput.max = maxQuantity;
    quantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity for Telegram
function calculateTelegramCharge() {
    let serviceDropdown = document.getElementById('telegram-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let pricePerThousand = selectedService ? selectedService.getAttribute('data-price') : 0;

    let quantity = document.getElementById('telegram-quantity').value;

    let charge = (quantity / 1000) * pricePerThousand;
    document.getElementById('telegram-charge').value = `$${charge.toFixed(2)}`;

    let discount = calculateTelegramDiscount(quantity);
    if (discount > 0) {
        document.getElementById('telegram-discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('telegram-discount-info').textContent = '';
    }
}

// Function to display delivery time for the selected Telegram service
function displayTelegramDeliveryTime() {
    let serviceDropdown = document.getElementById('telegram-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('telegram-delivery-time').textContent = deliveryTime;
}

// Function to calculate discount based on quantity for Telegram
function calculateTelegramDiscount(quantity) {
    if (quantity >= 5000) {
        return 0.10;
    } else if (quantity >= 1000) {
        return 0.05;
    }
    return 0;
}

// Event listeners for updating charge and delivery time dynamically
document.getElementById('telegram-service').addEventListener('change', function() {
    updateTelegramQuantityLimits();
    calculateTelegramCharge();
    displayTelegramDeliveryTime();
});

document.getElementById('telegram-quantity').addEventListener('input', calculateTelegramCharge);

// Order Summary Pop-up or Modal for Telegram
document.getElementById('telegram-submit-btn').addEventListener('click', function() {
    // Validation check
    let serviceDropdown = document.getElementById('telegram-service');
    let selectedServiceText = serviceDropdown.options[serviceDropdown.selectedIndex]?.textContent;
    let quantity = document.getElementById('telegram-quantity').value;
    let link = document.getElementById('telegram-link').value;

    // Check if all required fields are filled
    if (!selectedServiceText || !quantity || !link) {
        Toastify({
            text: "Please fill in all fields before proceeding.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336"
        }).showToast();
        return;  // Stop further processing
    }

    // If all fields are filled, display order summary
    let charge = document.getElementById('telegram-charge').value;
    let deliveryTime = document.getElementById('telegram-delivery-time').textContent;

    document.getElementById('telegram-summary-service').textContent = selectedServiceText;
    document.getElementById('telegram-summary-link').textContent = link;
    document.getElementById('telegram-summary-quantity').textContent = quantity;
    document.getElementById('telegram-summary-charge').textContent = charge;
    document.getElementById('telegram-summary-delivery').textContent = deliveryTime;

    document.getElementById('telegram-order-summary-modal').style.display = 'block';
});

// Function to process the Telegram order after confirmation
function processTelegramOrder() {
    showTelegramSpinner(true);  // Show spinner during processing

    setTimeout(function() {
        showTelegramSpinner(false);  // Stop spinner

        // Simulate network issue with 10% chance
        const networkIssue = Math.random() < 0.1;

        if (networkIssue) {
            // Show error toast for network issue
            Toastify({
                text: "Network error, please try again later.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336"
            }).showToast();
        } else {
            // Show success toast
            Toastify({
                text: "Order processed successfully!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#4CAF50"
            }).showToast();

            // Reset form after successful order
            resetTelegramForm();
        }

    }, 2000);  // Simulate a 2-second processing time
}

// Function to reset the Telegram form after order submission
function resetTelegramForm() {
    document.getElementById('telegram-service').selectedIndex = 0;
    document.getElementById('telegram-link').value = '';
    document.getElementById('telegram-quantity').value = '';
    document.getElementById('telegram-charge').value = '';
    document.getElementById('telegram-delivery-time').textContent = '';
    document.getElementById('telegram-discount-info').textContent = '';
    document.getElementById('telegram-order-summary-modal').style.display = 'none';
}

// Function to show or hide the Telegram loading spinner
function showTelegramSpinner(show) {
    const spinner = document.getElementById('telegram-loading-spinner');
    spinner.style.display = show ? 'block' : 'none';
}

// Event listener for order confirmation in the modal
document.getElementById('telegram-confirm-order').addEventListener('click', function() {
    processTelegramOrder();
});

// Close the order summary modal when clicking outside
window.onclick = function(event) {
    let modal = document.getElementById('telegram-order-summary-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
