



// Get all the menu items
const menuItems = document.querySelectorAll('.menu a');

// Add click event to each item
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'active' class from all menu items
        menuItems.forEach(item => item.classList.remove('active'));
        
        // Add 'active' class to the clicked menu item
        this.classList.add('active');
    });
});



// close sidebar and open sidebar 
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    container.classList.toggle('sidebar-closed');

    // Change the icon direction
    const icon = toggleBtn.querySelector('i');
    if (sidebar.classList.contains('closed')) {
        // Change to right arrow when sidebar is closed
        icon.classList.remove('fa-angle-left');
        icon.classList.add('fa-angle-right');
    } else {
        // Change to left arrow when sidebar is open
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-left');
    }
});




// Select all network elements
const networkItems = document.querySelectorAll('.network');

// Loop through each network element and add click event listener
networkItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove 'active' class from any previously active item
        networkItems.forEach(el => el.classList.remove('active'));

        // Add 'active' class to the clicked item
        this.classList.add('active');
    });
});





// HAMBURGER 
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const menuContainer = document.getElementById("menu-container");
    const openIcon = document.getElementById("open-menu");
    const closeIcon = document.getElementById("close-menu");

    // Toggle menu visibility
    hamburgerMenu.addEventListener("click", function() {
        menuContainer.classList.toggle("active");

        // Toggle hamburger icons
        if (menuContainer.classList.contains("active")) {
            openIcon.style.display = "none";
            closeIcon.style.display = "block";
        } else {
            openIcon.style.display = "block";
            closeIcon.style.display = "none";
        }
    });
});




// SWIPPER IN SMALL SCREEN IN OFFER 
