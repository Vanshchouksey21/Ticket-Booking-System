// Function to adjust the opacity based on login status
function opa() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const lt = document.querySelector('#log');

}

// Function to handle the booking process
function bookNow(movieName) {
  Swal.fire({
    title: "Are you sure?",
    text: `you want to book ${movieName}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, book now"
  }).then((result) => {
    if (result.isConfirmed) {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const lout = document.querySelector('#log');

      if (isLoggedIn === 'true') {
        // lout.style.opacity = "1"; // Ensure correct spelling and use of `opacity`
        Swal.fire({
          title: "Booking Confirmed!",
          text: `Proceeding with booking for "${movieName}".`,
          icon: "success"
        }).then(() => {
          window.location.href = 'booknow.html'; // Proceed to book now page
        });
      } else {
        Swal.fire({
          title: "Not Logged In",
          text: `Please log in to book tickets for "${movieName}".`,
          icon: "info"
        }).then(() => {
          window.location.href = 'signup.html'; // Redirect to signup page
        });
      }
    }
  });
}

// Ensure the 'opa' function runs on page load
// document.addEventListener('DOMContentLoaded', () => {
//   opa();
// });
let updateAuthButtons=()=> {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const authBtn = document.querySelector('#auth-btn');

  if (isLoggedIn === 'true') {
    // Show Logout button
    authBtn.innerHTML = `
      <button onclick="logoutt()" class="btn logout-btn">Logout</button>
    `;
  } else {
    // Show Signup button
    authBtn.innerHTML = `
      <button onclick="signupPage()" class="btn signup-btn">Signup</button>
    `;
  }
}

// Function to redirect to the signup page
let signupPage=()=> {
  window.location.href = 'signup.html'; 
}

// Function for logout
let logoutt = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear(); 
      Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        icon: "success"
      }).then(() => {
        updateAuthButtons();
      });
    }
  });
};

// Initial button setup
updateAuthButtons();



// Function to toggle the navigation menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');

 
  if (navLinks.classList.contains('active')) {
    navLinks.style.display = 'none'; 
    navLinks.classList.remove('active'); 
  } else {
    navLinks.style.display = 'block';  
    navLinks.classList.add('active'); 
  }
}



