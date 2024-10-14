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



