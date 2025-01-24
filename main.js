let isLoggedIn = localStorage.getItem('isLoggedIn'); 
const logoutButton = document.querySelector('#log .logout-btn');

let =opa=()=>{
  let isLoggedIn = localStorage.getItem('isLoggedIn'); 
  let lt = document.querySelector('#log');
  if(isLoggedIn === 'true'){
    lt.style="opacity:1";
  }
}

function bookNow(movieName) {
  let isLoggedIn = localStorage.getItem('isLoggedIn'); 
  let lout=document.querySelector('#log');
 
 

  // Check login status before redirecting
  if (isLoggedIn === 'true') {
    // isLoggedIn=true;
    lout.style="opcacity:1";
      alert(`Booking confirmed for "${movieName}"!`);
      window.location.href = 'booknow.html'; // Proceed to book now page
      
  }
  
 
  
  else {
    // isLoggedIn=false;
      alert(`Please log in to book tickets for "${movieName}".`);
      window.location.href = 'signup.html'; // Redirect to signup page
      
  }

  
}




// JavaScript for form submission
function submitContactForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
      alert('Thank you for contacting us! We will get back to you soon.');
      return true; // Allow form submission
  } else {
      alert('Please fill out all the fields.');
      return false;
  }
}

// for logout 
let logoutt=()=>{
  if(isLoggedIn === 'true'){
  
    localStorage.clear();
    alert('You have been logged out successfully.');
    window.location.href = 'index.html';
  }
}


// Function to toggle the navigation menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.style="display:block";
  navLinks.classList.toggle('active');
  navLinks.classList.toggle('active')===true?navLinks.style="display:block":navLinks.style="display:none";

}



