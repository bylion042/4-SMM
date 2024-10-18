// Toggle content visibility for Facebook
document.getElementById('facebook-toggle').addEventListener('click', function() {
    let toggleContent = document.getElementById('toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Define services for Facebook
let services = {
    facebook: [
        { value: 'facebookview', text: 'Facebook Views - ≈ $0.20 per 1000', price: 0.20, deliveryTime: '50-90-sec', minQuantity: 100, maxQuantity: 10000 },
        { value: 'facebookautolike', text: 'Facebook Auto Likes - ≈ $0.70 per 1000', price: 0.70, deliveryTime: '5-7-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'facebookautoshear', text: 'Facebook Auto Shears - ≈ $0.60 per 1000', price: 0.60, deliveryTime: '8-9-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'facebookprofilefollowers', text: 'Facebook Profile Followers - ≈ $0.80 per 1000', price: 0.80, deliveryTime: '10-15-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'facebookpagefollowers', text: 'Facebook Page Followers - ≈ $0.90 per 1000', price: 0.90, deliveryTime: '15-20-min', minQuantity: 100, maxQuantity: 10000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('category').addEventListener('change', function() {
    let selectedCategory = this.value;
    let serviceDropdown = document.getElementById('service');
    
    serviceDropdown.innerHTML = ''; // Clear the existing service options

    services.facebook.forEach(service => {
        if (service.value === selectedCategory || selectedCategory === 'facebook') {
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

    updateQuantityLimits();
    calculateCharge();
    displayDeliveryTime();
});

// Function to update the quantity input based on the selected Facebook service
function updateQuantityLimits() {
    let serviceDropdown = document.getElementById('service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let minQuantity = selectedService ? selectedService.getAttribute('data-min-quantity') : 1;
    let maxQuantity = selectedService ? selectedService.getAttribute('data-max-quantity') : 10000;

    let quantityInput = document.getElementById('quantity');
    quantityInput.min = minQuantity;
    quantityInput.max = maxQuantity;
    quantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity for Facebook
function calculateCharge() {
    let serviceDropdown = document.getElementById('service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let pricePerThousand = selectedService ? selectedService.getAttribute('data-price') : 0;

    let quantity = document.getElementById('quantity').value;
    
    let charge = (quantity / 1000) * pricePerThousand;
    document.getElementById('charge').value = `$${charge.toFixed(2)}`;

    let discount = calculateDiscount(quantity);
    if (discount > 0) {
        document.getElementById('discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('discount-info').textContent = '';
    }
}

// Function to display delivery time for the selected Facebook service
function displayDeliveryTime() {
    let serviceDropdown = document.getElementById('service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('delivery-time').textContent = deliveryTime;
}

// Function to calculate discount based on quantity
function calculateDiscount(quantity) {
    if (quantity >= 5000) {
        return 0.10;
    } else if (quantity >= 1000) {
        return 0.05;
    }
    return 0;
}

// Event listeners
document.getElementById('service').addEventListener('change', function() {
    updateQuantityLimits();
    calculateCharge();
    displayDeliveryTime();
});

document.getElementById('quantity').addEventListener('input', calculateCharge);

// Order Summary Pop-up or Modal
document.getElementById('submit-btn').addEventListener('click', function() {
    let serviceDropdown = document.getElementById('service');
    let selectedServiceText = serviceDropdown.options[serviceDropdown.selectedIndex].textContent;
    let quantity = document.getElementById('quantity').value;
    let charge = document.getElementById('charge').value;
    let deliveryTime = document.getElementById('delivery-time').textContent;
    let link = document.getElementById('link').value;

    document.getElementById('summary-service').textContent = selectedServiceText;
    document.getElementById('summary-link').textContent = link;
    document.getElementById('summary-quantity').textContent = quantity;
    document.getElementById('summary-charge').textContent = charge;
    document.getElementById('summary-delivery').textContent = deliveryTime;

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
    const service = document.getElementById('service').value;
    const link = document.getElementById('link').value;
    const quantity = document.getElementById('quantity').value;

    // Check for empty fields
    if (!service || !link || !quantity) {
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
                fontSize: "13px",
            }
        }).showToast();
        return false; // Form is not valid
    }
    return true; // Form is valid
}

// Function to display the order summary
function displayOrderSummary() {
    const serviceDropdown = document.getElementById('service');
    const selectedService = serviceDropdown.options[serviceDropdown.selectedIndex].text;
    const link = document.getElementById('link').value;
    const quantity = document.getElementById('quantity').value;
    const charge = document.getElementById('charge').value;
    const deliveryTime = document.getElementById('summary-delivery').textContent;

    // Populate the summary modal
    document.getElementById('summary-service').textContent = selectedService;
    document.getElementById('summary-link').textContent = link;
    document.getElementById('summary-quantity').textContent = quantity;
    document.getElementById('summary-charge').textContent = charge;
    document.getElementById('summary-delivery').textContent = deliveryTime;

    // Show the summary modal
    document.getElementById('order-summary-modal').style.display = 'block';
}

// Function to process the order after confirmation
function processOrder() {
    showSpinner(true);  // Show spinner during processing

    // Simulating network processing with setTimeout
    setTimeout(function() {
        showSpinner(false);  // Stop spinner

        // Simulating a network issue with a random condition (10% chance)
        const networkIssue = Math.random() < 0.1;

        if (networkIssue) {
            // Show error toast for network issue
            Toastify({
                text: "Network error, please try again later.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#7474ac",
                style: {
                    borderRadius: "10px",
                    fontSize: "15px",
                }
            }).showToast();
        } else {
            // Success toast for order processed
            Toastify({
                text: "Order processed successfully!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#7474ac",  // Green background for success
                style: {
                    borderRadius: "10px",
                    fontSize: "15px",
                }
            }).showToast();

            // Hide the summary modal after processing
            document.getElementById('order-summary-modal').style.display = 'none';
        }
    }, 2000);  // Simulating 2 seconds of processing
}

// Event listener for Submit button
document.getElementById('submit-btn').addEventListener('click', function() {
    if (validateForm()) {
        displayOrderSummary();  // Show summary if form is valid
    }
});

// Event listener for Confirm Order button
document.getElementById('confirm-order').addEventListener('click', function() {
    if (validateForm()) {  // Ensure the form is validated before processing
        processOrder();  // Process the order after confirming
    }
});
