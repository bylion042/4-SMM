// Toggle content visibility for Twitter
document.getElementById('twitter-toggle').addEventListener('click', function() {
    let toggleContent = document.getElementById('twitter-toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Define services for Twitter
let twitterServices = {
    twitter: [
        { value: 'twitterlikes', text: 'Twitter Likes - ≈ $0.10 each', price: 0.10, deliveryTime: '5-10 min', minQuantity: 10, maxQuantity: 5000 },
        { value: 'twitterretweets', text: 'Twitter Retweets - ≈ $0.15 each', price: 0.15, deliveryTime: '10-20 min', minQuantity: 10, maxQuantity: 3000 },
        { value: 'twitterfollowers', text: 'Twitter Followers - ≈ $0.50 each', price: 0.50, deliveryTime: '10-30 min', minQuantity: 1, maxQuantity: 1000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('twitter-category').addEventListener('change', function() {
    let selectedCategory = this.value;
    let serviceDropdown = document.getElementById('twitter-service');
    
    serviceDropdown.innerHTML = ''; // Clear existing options

    // Populate the services based on the category selected
    twitterServices.twitter.forEach(service => {
        if (service.value === selectedCategory || selectedCategory === 'twitter') {
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
    updateTwitterQuantityLimits();
    calculateTwitterCharge();
    displayTwitterDeliveryTime();
});

// Function to update the quantity input based on the selected Twitter service
function updateTwitterQuantityLimits() {
    let serviceDropdown = document.getElementById('twitter-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let minQuantity = selectedService ? selectedService.getAttribute('data-min-quantity') : 1;
    let maxQuantity = selectedService ? selectedService.getAttribute('data-max-quantity') : 5000;

    let quantityInput = document.getElementById('twitter-quantity');
    quantityInput.min = minQuantity;
    quantityInput.max = maxQuantity;
    quantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity for Twitter
function calculateTwitterCharge() {
    let serviceDropdown = document.getElementById('twitter-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let pricePerUnit = selectedService ? selectedService.getAttribute('data-price') : 0;

    let quantity = document.getElementById('twitter-quantity').value;
    
    let charge = quantity * pricePerUnit;
    document.getElementById('twitter-charge').value = `$${charge.toFixed(2)}`;

    let discount = calculateTwitterDiscount(quantity);
    if (discount > 0) {
        document.getElementById('twitter-discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('twitter-discount-info').textContent = '';
    }
}

// Function to display delivery time for the selected Twitter service
function displayTwitterDeliveryTime() {
    let serviceDropdown = document.getElementById('twitter-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('twitter-delivery-time').textContent = deliveryTime;
}

// Function to calculate discount based on quantity for Twitter
function calculateTwitterDiscount(quantity) {
    if (quantity >= 500) {
        return 0.10; // 10% discount
    } else if (quantity >= 100) {
        return 0.05; // 5% discount
    }
    return 0;
}

// Event listeners for updating charge and delivery time dynamically
document.getElementById('twitter-service').addEventListener('change', function() {
    updateTwitterQuantityLimits();
    calculateTwitterCharge();
    displayTwitterDeliveryTime();
});

document.getElementById('twitter-quantity').addEventListener('input', calculateTwitterCharge);

// Order Summary Pop-up or Modal for Twitter
document.getElementById('twitter-submit-btn').addEventListener('click', function() {
    // Validation: Check if all fields are filled
    let link = document.getElementById('twitter-link').value;
    let quantity = document.getElementById('twitter-quantity').value;

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

    let serviceDropdown = document.getElementById('twitter-service');
    let selectedServiceText = serviceDropdown.options[serviceDropdown.selectedIndex].textContent;
    let charge = document.getElementById('twitter-charge').value;
    let deliveryTime = document.getElementById('twitter-delivery-time').textContent;

    document.getElementById('twitter-summary-service').textContent = selectedServiceText;
    document.getElementById('twitter-summary-link').textContent = link;
    document.getElementById('twitter-summary-quantity').textContent = quantity;
    document.getElementById('twitter-summary-charge').textContent = charge;
    document.getElementById('twitter-summary-delivery').textContent = deliveryTime;

    document.getElementById('twitter-order-summary-modal').style.display = 'block';
});

// Function to process the Twitter order after confirmation
function processTwitterOrder() {
    showTwitterSpinner(true);  // Show spinner during processing

    setTimeout(function() {
        showTwitterSpinner(false);  // Hide spinner after processing
        Toastify({
            text: "Order has been processed successfully!",
            duration: 3000,
            backgroundColor: "green",
            gravity: "top",
            position: "right"
        }).showToast();
        document.getElementById('twitter-order-summary-modal').style.display = 'none';  // Hide the summary modal
    }, 2000); // Simulate an API call
}

// Confirm order event listener for Twitter
document.getElementById('twitter-confirm-order').addEventListener('click', processTwitterOrder);

// Function to show/hide loading spinner for Twitter
function showTwitterSpinner(show) {
    document.getElementById('twitter-loading-spinner').style.display = show ? 'block' : 'none';
}
