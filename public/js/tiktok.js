// Toggle content visibility for TikTok
document.getElementById('tiktok-toggle').addEventListener('click', function() {
    let toggleContent = document.getElementById('tiktok-toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Define services for TikTok
let tiktokServices = {
    tiktok: [
        { value: 'tiktokviews', text: 'TikTok Views - ≈ $0.15 per 1000', price: 0.15, deliveryTime: '5-10 min', minQuantity: 100, maxQuantity: 10000 },
        { value: 'tiktoklikes', text: 'TikTok Likes - ≈ $0.10 each', price: 0.10, deliveryTime: '10-20 min', minQuantity: 10, maxQuantity: 5000 },
        { value: 'tiktokfollowers', text: 'TikTok Followers - ≈ $0.50 each', price: 0.50, deliveryTime: '10-30 min', minQuantity: 1, maxQuantity: 1000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('tiktok-category').addEventListener('change', function() {
    let selectedCategory = this.value;
    let serviceDropdown = document.getElementById('tiktok-service');
    
    serviceDropdown.innerHTML = ''; // Clear existing options

    // Populate the services based on the category selected
    tiktokServices.tiktok.forEach(service => {
        if (service.value === selectedCategory || selectedCategory === 'tiktok') {
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
    updateTiktokQuantityLimits();
    calculateTiktokCharge();
    displayTiktokDeliveryTime();
});

// Function to update the quantity input based on the selected TikTok service
function updateTiktokQuantityLimits() {
    let serviceDropdown = document.getElementById('tiktok-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let minQuantity = selectedService ? selectedService.getAttribute('data-min-quantity') : 1;
    let maxQuantity = selectedService ? selectedService.getAttribute('data-max-quantity') : 10000;

    let quantityInput = document.getElementById('tiktok-quantity');
    quantityInput.min = minQuantity;
    quantityInput.max = maxQuantity;
    quantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity for TikTok
function calculateTiktokCharge() {
    let serviceDropdown = document.getElementById('tiktok-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let pricePerUnit = selectedService ? selectedService.getAttribute('data-price') : 0;

    let quantity = document.getElementById('tiktok-quantity').value;
    
    let charge = quantity * pricePerUnit;
    document.getElementById('tiktok-charge').value = `$${charge.toFixed(2)}`;

    let discount = calculateTiktokDiscount(quantity);
    if (discount > 0) {
        document.getElementById('tiktok-discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('tiktok-discount-info').textContent = '';
    }
}

// Function to display delivery time for the selected TikTok service
function displayTiktokDeliveryTime() {
    let serviceDropdown = document.getElementById('tiktok-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('tiktok-delivery-time').textContent = deliveryTime;
}

// Function to calculate discount based on quantity for TikTok
function calculateTiktokDiscount(quantity) {
    if (quantity >= 500) {
        return 0.10; // 10% discount
    } else if (quantity >= 100) {
        return 0.05; // 5% discount
    }
    return 0;
}

// Event listeners for updating charge and delivery time dynamically
document.getElementById('tiktok-service').addEventListener('change', function() {
    updateTiktokQuantityLimits();
    calculateTiktokCharge();
    displayTiktokDeliveryTime();
});

document.getElementById('tiktok-quantity').addEventListener('input', calculateTiktokCharge);

// Function to validate form inputs for TikTok
function validateTiktokForm() {
    let link = document.getElementById('tiktok-link').value;
    let quantity = document.getElementById('tiktok-quantity').value;
    
    if (!link || !quantity) {
        Toastify({
            text: "Please fill in all fields before proceeding.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ff0000",
        }).showToast();
        return false;
    }
    return true;
}

// Order Summary Pop-up or Modal for TikTok
document.getElementById('tiktok-submit-btn').addEventListener('click', function() {
    if (validateTiktokForm()) {
        let serviceDropdown = document.getElementById('tiktok-service');
        let selectedServiceText = serviceDropdown.options[serviceDropdown.selectedIndex].textContent;
        let quantity = document.getElementById('tiktok-quantity').value;
        let charge = document.getElementById('tiktok-charge').value;
        let deliveryTime = document.getElementById('tiktok-delivery-time').textContent;
        let link = document.getElementById('tiktok-link').value;

        document.getElementById('tiktok-summary-service').textContent = selectedServiceText;
        document.getElementById('tiktok-summary-link').textContent = link;
        document.getElementById('tiktok-summary-quantity').textContent = quantity;
        document.getElementById('tiktok-summary-charge').textContent = charge;
        document.getElementById('tiktok-summary-delivery').textContent = deliveryTime;

        document.getElementById('tiktok-order-summary-modal').style.display = 'block';
    }
});

// Function to process the TikTok order after confirmation
function processTiktokOrder() {
    showTiktokSpinner(true);  // Show spinner during processing

    setTimeout(function() {
        showTiktokSpinner(false);  // Hide spinner after processing
        Toastify({
            text: "Order has been processed successfully!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#28a745",
        }).showToast();
        document.getElementById('tiktok-order-summary-modal').style.display = 'none';  // Hide the summary modal
    }, 2000); // Simulate an API call
}

// Confirm order event listener for TikTok
document.getElementById('tiktok-confirm-order').addEventListener('click', processTiktokOrder);

// Function to show/hide loading spinner for TikTok
function showTiktokSpinner(show) {
    document.getElementById('tiktok-loading-spinner').style.display = show ? 'block' : 'none';
}
