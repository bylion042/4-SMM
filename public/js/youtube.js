// Toggle content visibility for YouTube
document.getElementById('youtube-toggle').addEventListener('click', function() {
    let toggleContent = document.getElementById('youtube-toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Define services for YouTube
let youtubeServices = {
    youtube: [
        { value: 'youtubeviews', text: 'YouTube Views - ≈ $0.20 per 1000', price: 0.20, deliveryTime: '5-10 min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'youtubecomments', text: 'YouTube Comments - ≈ $0.50 each', price: 0.50, deliveryTime: '10-20 min', minQuantity: 10, maxQuantity: 5000 },
        { value: 'youtubeSubscribers', text: 'YouTube Subscribers - ≈ $1.00 each', price: 1.00, deliveryTime: '10-30 min', minQuantity: 1, maxQuantity: 1000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('youtube-category').addEventListener('change', function() {
    let selectedCategory = this.value;
    let serviceDropdown = document.getElementById('youtube-service');
    
    serviceDropdown.innerHTML = ''; // Clear existing options

    // Populate the services based on the category selected
    youtubeServices.youtube.forEach(service => {
        if (service.value === selectedCategory || selectedCategory === 'youtube') {
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
    updateYoutubeQuantityLimits();
    calculateYoutubeCharge();
    displayYoutubeDeliveryTime();
});

// Function to update the quantity input based on the selected YouTube service
function updateYoutubeQuantityLimits() {
    let serviceDropdown = document.getElementById('youtube-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let minQuantity = selectedService ? selectedService.getAttribute('data-min-quantity') : 1;
    let maxQuantity = selectedService ? selectedService.getAttribute('data-max-quantity') : 10000;

    let quantityInput = document.getElementById('youtube-quantity');
    quantityInput.min = minQuantity;
    quantityInput.max = maxQuantity;
    quantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity for YouTube
function calculateYoutubeCharge() {
    let serviceDropdown = document.getElementById('youtube-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let pricePerUnit = selectedService ? selectedService.getAttribute('data-price') : 0;

    let quantity = document.getElementById('youtube-quantity').value;
    
    let charge = quantity * pricePerUnit;
    document.getElementById('youtube-charge').value = `$${charge.toFixed(2)}`;

    let discount = calculateYoutubeDiscount(quantity);
    if (discount > 0) {
        document.getElementById('youtube-discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('youtube-discount-info').textContent = '';
    }
}

// Function to display delivery time for the selected YouTube service
function displayYoutubeDeliveryTime() {
    let serviceDropdown = document.getElementById('youtube-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('youtube-delivery-time').textContent = deliveryTime;
}

// Function to calculate discount based on quantity for YouTube
function calculateYoutubeDiscount(quantity) {
    if (quantity >= 500) {
        return 0.10; // 10% discount
    } else if (quantity >= 100) {
        return 0.05; // 5% discount
    }
    return 0;
}

// Event listeners for updating charge and delivery time dynamically
document.getElementById('youtube-service').addEventListener('change', function() {
    updateYoutubeQuantityLimits();
    calculateYoutubeCharge();
    displayYoutubeDeliveryTime();
});

document.getElementById('youtube-quantity').addEventListener('input', calculateYoutubeCharge);

// Order Summary Pop-up or Modal for YouTube
document.getElementById('youtube-submit-btn').addEventListener('click', function() {
    // Validation: Check if all fields are filled
    const link = document.getElementById('youtube-link').value;
    const quantity = document.getElementById('youtube-quantity').value;

    if (!link || !quantity) {
        Toastify({
            text: "Please fill in all fields before proceeding.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF0000",
        }).showToast();
        return; // Stop execution if fields are not filled
    }

    let serviceDropdown = document.getElementById('youtube-service');
    let selectedServiceText = serviceDropdown.options[serviceDropdown.selectedIndex].textContent;
    let charge = document.getElementById('youtube-charge').value;
    let deliveryTime = document.getElementById('youtube-delivery-time').textContent;

    document.getElementById('youtube-summary-service').textContent = selectedServiceText;
    document.getElementById('youtube-summary-link').textContent = link;
    document.getElementById('youtube-summary-quantity').textContent = quantity;
    document.getElementById('youtube-summary-charge').textContent = charge;
    document.getElementById('youtube-summary-delivery').textContent = deliveryTime;

    document.getElementById('youtube-order-summary-modal').style.display = 'block';
});

// Function to process the YouTube order after confirmation
function processYoutubeOrder() {
    showYoutubeSpinner(true);  // Show spinner during processing

    setTimeout(function() {
        showYoutubeSpinner(false);  // Stop spinner

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
                backgroundColor: "#FF0000",
            }).showToast();
        } else {
            // Successful order processing
            Toastify({
                text: "Order placed successfully!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#00FF00",
            }).showToast();
        }
    }, 2000);
}

// Function to display loading spinner for YouTube
function showYoutubeSpinner(show) {
    document.getElementById('youtube-loading-spinner').style.display = show ? 'block' : 'none';
}

// Confirm order button event listener
document.getElementById('youtube-confirm-order').addEventListener('click', processYoutubeOrder);
