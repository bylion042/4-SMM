// Toggle content visibility for Facebook
document.getElementById('facebook-toggle').addEventListener('click', function() {
    const toggleContent = document.getElementById('toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Service options mapping with delivery time
const services = {
    telegram: [
        { value: '1602', text: '1602 - TG Premium start App - ≈ $6.9877 per 1000', price: 6.9877, deliveryTime: '2-4 days' },
        { value: '1603', text: '1603 - TG Organic Members - ≈ $5.00 per 1000', price: 5.00, deliveryTime: '1-3 days' }
    ],
    facebook: [
        { value: 'fb_ads_basic', text: 'Facebook Ads Basic - ≈ $10 per campaign', price: 10, deliveryTime: '5-7 days' },
        { value: 'fb_ads_premium', text: 'Facebook Ads Premium - ≈ $25 per campaign', price: 25, deliveryTime: '7-10 days' }
    ],
    instagram: [
        { value: 'ig_followers_1000', text: '1000 Instagram Followers - ≈ $8.50', price: 8.50, deliveryTime: '3-5 days' },
        { value: 'ig_likes_1000', text: '1000 Instagram Likes - ≈ $4.99', price: 4.99, deliveryTime: '1-2 days' }
    ]
};

// Update service dropdown based on category selection
document.getElementById('category').addEventListener('change', function() {
    const category = this.value;
    const serviceDropdown = document.getElementById('service');
    
    // Clear the current options
    serviceDropdown.innerHTML = '';

    // Get the services for the selected category
    const selectedServices = services[category] || [];

    // Populate the service dropdown with new options
    selectedServices.forEach(service => {
        const option = document.createElement('option');
        option.value = service.value;
        option.textContent = service.text;
        option.setAttribute('data-price', service.price);  // Store price as data attribute
        option.setAttribute('data-delivery-time', service.deliveryTime);  // Store delivery time as data attribute
        serviceDropdown.appendChild(option);
    });

    // Trigger initial calculation and delivery time display
    calculateCharge();
    displayDeliveryTime();
});

// Function to calculate and update the charge based on selected service and quantity
function calculateCharge() {
    const serviceDropdown = document.getElementById('service');
    const selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    const pricePerUnit = selectedService ? selectedService.getAttribute('data-price') : 0;
    
    const quantity = document.getElementById('quantity').value;
    const charge = quantity * pricePerUnit;

    document.getElementById('charge').value = `$${charge.toFixed(2)}`;
}

// Function to display delivery time
function displayDeliveryTime() {
    const serviceDropdown = document.getElementById('service');
    const selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    const deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('delivery-time').textContent = deliveryTime;
}

// Trigger charge calculation and delivery time update when service or quantity changes
document.getElementById('service').addEventListener('change', function() {
    calculateCharge();
    displayDeliveryTime();
});

document.getElementById('quantity').addEventListener('input', calculateCharge);






// Live Charge Estimate and Discounts 
function calculateDiscount(quantity) {
    if (quantity >= 1000) {
        return 0.10;  // 10% discount for orders of 10,000 or more
    } else if (quantity >= 5000) {
        return 0.05;  // 5% discount for orders of 5,000 or more
    }
    return 0;  // No discount
}

function calculateCharge() {
    const serviceDropdown = document.getElementById('service');
    const selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    const pricePerUnit = selectedService ? selectedService.getAttribute('data-price') : 0;

    const quantity = document.getElementById('quantity').value;
    const discount = calculateDiscount(quantity);
    const charge = (quantity * pricePerUnit) * (1 - discount);

    document.getElementById('charge').value = `$${charge.toFixed(2)}`;

    if (discount > 0) {
        document.getElementById('discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('discount-info').textContent = '';
    }
}







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
