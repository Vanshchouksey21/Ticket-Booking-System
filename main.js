// JavaScript for booking functionality
// let isLoggedIn =false;

function bookNow(movieName) {
  let isLoggedIn = localStorage.getItem('isLoggedIn'); 
 

  // Check login status before redirecting
  if (isLoggedIn === 'true') {
    // isLoggedIn=true;
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


