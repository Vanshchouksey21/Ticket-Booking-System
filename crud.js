document.getElementById("logoutBtn").addEventListener("click", function() {
    Swal.fire({
        title: 'Logging Out',
        text: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear login session
            localStorage.removeItem('isLoggedIn');

            // Show success message
            Swal.fire({
                title: 'Logged Out!',
                text: 'You have successfully logged out.',
                icon: 'success'
            }).then(() => {
                // Redirect to index.html
                window.location.href = 'index.html';
            });
        }
    });
});

// Chart configuration
const ctx = document.getElementById('chart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Bookings',
            data: [10, 20, 30, 40, 50],
            backgroundColor: 'blue'
        }]
    }
});
