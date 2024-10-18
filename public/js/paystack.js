document.addEventListener('DOMContentLoaded', (event) => {
    // Get modal elements
    const modal = document.getElementById('paymentModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const fundBtn = document.querySelector('.fund-btn');

    // Show modal on button click
    fundBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Hide modal on close button click
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Hide modal on outside click
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Handle Paystack payment
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const amount = document.getElementById('amount').value * 100; // Convert to kobo

        if (!email) {
            alert('Please enter a valid email.');
            return;
        }

        let handler = PaystackPop.setup({
            key: 'pk_live_c1205d0dd34d02a74172a6834b7c2137a544c35e', // Replace with your Paystack public key
            email: email,
            amount: amount,
            currency: 'NGN',
            ref: '' + Math.floor(Math.random() * 1000000000 + 1),
            callback: function(response) {
                // Send the reference to the server
                fetch('/verify-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reference: response.reference })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        // Update balance on the dashboard
                        document.querySelector('.hold p').innerText = data.newBalance;
                        modal.style.display = 'none';
                    } else {
                        alert('Payment verification failed. Please try again.');
                    }
                });
            },
            onClose: function() {
                alert('Transaction was not completed, window closed.');
            }
        });
        handler.openIframe();
    });
});
