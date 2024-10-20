// Toggle content visibility for Facebook
document.getElementById('facebook-toggle').addEventListener('click', function() {
    let toggleContent = document.getElementById('facebook-toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Define services for Facebook
let facebookServices = {
    facebook: [
        { value: 'facebooklikes', text: 'Facebook Likes - ≈ $0.05 each', price: 0.05, deliveryTime: '10-30 min', minQuantity: 1, maxQuantity: 10000 },
        { value: 'facebookfollowers', text: 'Facebook Followers - ≈ $0.50 each', price: 0.50, deliveryTime: '15-45 min', minQuantity: 1, maxQuantity: 10000 },
        { value: 'facebookshares', text: 'Facebook Shares - ≈ $0.10 each', price: 0.10, deliveryTime: '10-20 min', minQuantity: 1, maxQuantity: 10000 },
        { value: 'facebookcomments', text: 'Facebook Comments - ≈ $0.15 each', price: 0.15, deliveryTime: '5-10 min', minQuantity: 1, maxQuantity: 10000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('facebook-category').addEventListener('change', function() {
    let selectedCategory = this.value;
    let serviceDropdown = document.getElementById('facebook-service');

    serviceDropdown.innerHTML = ''; // Clear existing options

    // Populate the services based on the category selected
    facebookServices.facebook.forEach(service => {
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

    // Update quantity limits and calculate charge
    updateFacebookQuantityLimits();
    calculateFacebookCharge();
    displayFacebookDeliveryTime();
});

// Function to update the quantity input based on the selected Facebook service
function updateFacebookQuantityLimits() {
    let serviceDropdown = document.getElementById('facebook-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let minQuantity = selectedService ? selectedService.getAttribute('data-min-quantity') : 1;
    let maxQuantity = selectedService ? selectedService.getAttribute('data-max-quantity') : 10000;

    let quantityInput = document.getElementById('facebook-quantity');
    quantityInput.min = minQuantity;
    quantityInput.max = maxQuantity;
    quantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity for Facebook
function calculateFacebookCharge() {
    let serviceDropdown = document.getElementById('facebook-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let pricePerUnit = selectedService ? selectedService.getAttribute('data-price') : 0;

    let quantity = document.getElementById('facebook-quantity').value;
    
    let charge = quantity * pricePerUnit;
    document.getElementById('facebook-charge').value = `$${charge.toFixed(2)}`;

    let discount = calculateFacebookDiscount(quantity);
    if (discount > 0) {
        document.getElementById('facebook-discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('facebook-discount-info').textContent = '';
    }
}

// Function to display delivery time for the selected Facebook service
function displayFacebookDeliveryTime() {
    let serviceDropdown = document.getElementById('facebook-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('facebook-delivery-time').textContent = deliveryTime;
}

// Function to calculate discount based on quantity for Facebook
function calculateFacebookDiscount(quantity) {
    if (quantity >= 5000) {
        return 0.10; // 10% discount
    } else if (quantity >= 1000) {
        return 0.05; // 5% discount
    }
    return 0;
}

// Event listeners for updating charge and delivery time dynamically
document.getElementById('facebook-service').addEventListener('change', function() {
    updateFacebookQuantityLimits();
    calculateFacebookCharge();
    displayFacebookDeliveryTime();
});

document.getElementById('facebook-quantity').addEventListener('input', calculateFacebookCharge);

// Order Summary Pop-up or Modal for Facebook
document.getElementById('facebook-submit-btn').addEventListener('click', function() {
    // Validation: Check if all fields are filled
    let link = document.getElementById('facebook-link').value;
    let quantity = document.getElementById('facebook-quantity').value;

    if (!link || !quantity) {
        Toastify({
            text: "Please fill in all fields!",
            duration: 3000,
            backgroundColor: "red",
            gravity: "top",
            position: "right"
        }).showToast();
        return;
    }

    let serviceDropdown = document.getElementById('facebook-service');
    let selectedServiceText = serviceDropdown.options[serviceDropdown.selectedIndex].textContent;
    let charge = document.getElementById('facebook-charge').value;
    let deliveryTime = document.getElementById('facebook-delivery-time').textContent;

    document.getElementById('facebook-summary-service').textContent = selectedServiceText;
    document.getElementById('facebook-summary-link').textContent = link;
    document.getElementById('facebook-summary-quantity').textContent = quantity;
    document.getElementById('facebook-summary-charge').textContent = charge;
    document.getElementById('facebook-summary-delivery').textContent = deliveryTime;

    document.getElementById('facebook-order-summary-modal').style.display = 'block';
});

// Function to process the Facebook order after confirmation
function processFacebookOrder() {
    showFacebookSpinner(true);  // Show spinner during processing

    setTimeout(function() {
        showFacebookSpinner(false);  // Hide spinner after processing
        Toastify({
            text: "Order has been processed successfully!",
            duration: 3000,
            backgroundColor: "green",
            gravity: "top",
            position: "right"
        }).showToast();
        document.getElementById('facebook-order-summary-modal').style.display = 'none';  // Hide the summary modal
    }, 2000); // Simulate an API call
}

// Confirm order event listener for Facebook
document.getElementById('facebook-confirm-order').addEventListener('click', processFacebookOrder);

// Function to show/hide loading spinner for Facebook
function showFacebookSpinner(show) {
    document.getElementById('facebook-loading-spinner').style.display = show ? 'block' : 'none';
}
