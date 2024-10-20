// Toggle content visibility for Instagram
document.getElementById('instagram-toggle').addEventListener('click', function() {
    let toggleContent = document.getElementById('instagram-toggle-content');
    toggleContent.style.display = toggleContent.style.display === 'none' ? 'block' : 'none';
});

// Define services for Instagram
let instagramServices = {
    instagram: [
        { value: 'instagramlikes', text: 'Instagram Likes - ≈ $0.10 each', price: 0.10, deliveryTime: '5-10 min', minQuantity: 10, maxQuantity: 5000 },
        { value: 'instagramfollowers', text: 'Instagram Followers - ≈ $0.50 each', price: 0.50, deliveryTime: '10-20 min', minQuantity: 1, maxQuantity: 1000 },
        { value: 'instagramcomments', text: 'Instagram Comments - ≈ $0.15 each', price: 0.15, deliveryTime: '10-30 min', minQuantity: 5, maxQuantity: 2000 }
    ]
};

// Function to dynamically update the service dropdown based on category selection
document.getElementById('instagram-category').addEventListener('change', function() {
    let selectedCategory = this.value;
    let serviceDropdown = document.getElementById('instagram-service');
    
    serviceDropdown.innerHTML = ''; // Clear existing options

    // Populate the services based on the category selected
    instagramServices.instagram.forEach(service => {
        if (service.value === selectedCategory || selectedCategory === 'instagram') {
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
    updateInstagramQuantityLimits();
    calculateInstagramCharge();
    displayInstagramDeliveryTime();
});

// Function to update the quantity input based on the selected Instagram service
function updateInstagramQuantityLimits() {
    let serviceDropdown = document.getElementById('instagram-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let minQuantity = selectedService ? selectedService.getAttribute('data-min-quantity') : 1;
    let maxQuantity = selectedService ? selectedService.getAttribute('data-max-quantity') : 5000;

    let quantityInput = document.getElementById('instagram-quantity');
    quantityInput.min = minQuantity;
    quantityInput.max = maxQuantity;
    quantityInput.placeholder = `Min: ${minQuantity} - Max: ${maxQuantity} per user`;
}

// Function to calculate and update the charge based on selected service and quantity for Instagram
function calculateInstagramCharge() {
    let serviceDropdown = document.getElementById('instagram-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let pricePerUnit = selectedService ? selectedService.getAttribute('data-price') : 0;

    let quantity = document.getElementById('instagram-quantity').value;
    
    let charge = quantity * pricePerUnit;
    document.getElementById('instagram-charge').value = `$${charge.toFixed(2)}`;

    let discount = calculateInstagramDiscount(quantity);
    if (discount > 0) {
        document.getElementById('instagram-discount-info').textContent = `You received a ${discount * 100}% discount!`;
    } else {
        document.getElementById('instagram-discount-info').textContent = '';
    }
}

// Function to display delivery time for the selected Instagram service
function displayInstagramDeliveryTime() {
    let serviceDropdown = document.getElementById('instagram-service');
    let selectedService = serviceDropdown.options[serviceDropdown.selectedIndex];
    let deliveryTime = selectedService ? selectedService.getAttribute('data-delivery-time') : '';
    document.getElementById('instagram-delivery-time').textContent = deliveryTime;
}

// Function to calculate discount based on quantity for Instagram
function calculateInstagramDiscount(quantity) {
    if (quantity >= 500) {
        return 0.10; // 10% discount
    } else if (quantity >= 100) {
        return 0.05; // 5% discount
    }
    return 0;
}

// Event listeners for updating charge and delivery time dynamically
document.getElementById('instagram-service').addEventListener('change', function() {
    updateInstagramQuantityLimits();
    calculateInstagramCharge();
    displayInstagramDeliveryTime();
});

document.getElementById('instagram-quantity').addEventListener('input', calculateInstagramCharge);

// Order Summary Pop-up or Modal for Instagram
document.getElementById('instagram-submit-btn').addEventListener('click', function() {
    // Validation: Check if all fields are filled
    let link = document.getElementById('instagram-link').value;
    let quantity = document.getElementById('instagram-quantity').value;

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

    let serviceDropdown = document.getElementById('instagram-service');
    let selectedServiceText = serviceDropdown.options[serviceDropdown.selectedIndex].textContent;
    let charge = document.getElementById('instagram-charge').value;
    let deliveryTime = document.getElementById('instagram-delivery-time').textContent;

    document.getElementById('instagram-summary-service').textContent = selectedServiceText;
    document.getElementById('instagram-summary-link').textContent = link;
    document.getElementById('instagram-summary-quantity').textContent = quantity;
    document.getElementById('instagram-summary-charge').textContent = charge;
    document.getElementById('instagram-summary-delivery').textContent = deliveryTime;

    document.getElementById('instagram-order-summary-modal').style.display = 'block';
});

// Function to process the Instagram order after confirmation
function processInstagramOrder() {
    showInstagramSpinner(true);  // Show spinner during processing

    setTimeout(function() {
        showInstagramSpinner(false);  // Hide spinner after processing
        Toastify({
            text: "Order has been processed successfully!",
            duration: 3000,
            backgroundColor: "green",
            gravity: "top",
            position: "right"
        }).showToast();
        document.getElementById('instagram-order-summary-modal').style.display = 'none';  // Hide the summary modal
    }, 2000); // Simulate an API call
}

// Confirm order event listener for Instagram
document.getElementById('instagram-confirm-order').addEventListener('click', processInstagramOrder);

// Function to show/hide loading spinner for Instagram
function showInstagramSpinner(show) {
    document.getElementById('instagram-loading-spinner').style.display = show ? 'block' : 'none';
}
