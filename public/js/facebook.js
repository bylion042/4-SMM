// Toggle content visibility for Facebook
document.getElementById('facebook-toggle').addEventListener('click', function() {
    const toggleContent = document.getElementById('toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});



// JavaScript to handle dynamic updates, service
//  selection, price calculation, and discount calculation:
const services1 = {
    facebook: [
        { value: 'facebookview', text: 'Facebook Views - ≈ $0.20 per 1000', price: 0.20, deliveryTime: '50-90-sec', minQuantity: 100, maxQuantity: 10000 },
        { value: 'facebookautolike', text: 'Facebook Auto Likes - ≈ $0.70 per 1000', price: 0.70, deliveryTime: '5-7-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'facebookautoshear', text: 'Facebook Auto Shears - ≈ $0.60 per 1000', price: 0.60, deliveryTime: ' 8-9-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'facebookprofilefollowers', text: 'Facebook Profile Followers - ≈ $0.80 per 1000', price: 0.80, deliveryTime: '10-15-min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'facebookpagefollowers', text: 'Facebook Page Followers - ≈ $0.90 per 1000', price: 0.90, deliveryTime: '15-20-min', minQuantity: 100, maxQuantity: 10000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('category').addEventListener('change', function() {
    const selectedCategory = this.value;
    const serviceDropdown = document.getElementById('service');
    
    // Clear the existing service options
    serviceDropdown.innerHTML = '';

    // Update the service dropdown with matching services
    services1.facebook.forEach(service => {
        if (service.value === selectedCategory || selectedCategory === 'facebook') {
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
        option.text = 'No services1 available';
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
                fontSize: "15px"
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
                    fontSize: "15px"
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
                    fontSize: "15px"
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
