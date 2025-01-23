let login = () => {
    let loginEmail = document.querySelector("#email").value;
    let loginPassword = document.querySelector("#password").value;

    let errorEmail = document.querySelector("#email");
    let errorPassword = document.querySelector("#password");

    // Clear previous error states
    errorEmail.classList.remove("error");
    errorPassword.classList.remove("error");

    errorEmail.setAttribute("placeholder", "");
    errorPassword.setAttribute("placeholder", "");

    // Validate email
    if (loginEmail === "") {
        errorEmail.setAttribute("placeholder", "Please Enter your Email");
        errorEmail.classList.add("error");
        document.querySelector("#email").focus();
        return false;
    }

    // Validate password
    if (!(loginPassword.match(/[1234567890]/) &&
        loginPassword.match(/[!@#$%^&*()]/) &&
        loginPassword.match(/[a-z]/) &&
        loginPassword.match(/[A-Z]/))) {
        document.querySelector("#password").focus();
        alert("Create a Strong password it must Contains special character digits and uppercase letter ");
        return false;
    } else if (loginPassword === "") {
        errorPassword.setAttribute("placeholder", "Please Enter your Password");
        errorPassword.classList.add("error");
        document.querySelector("#password").focus();
        return false;
    }

    // Get stored email and password
    let storedEmail = localStorage.getItem("email");
    let storedPassword = localStorage.getItem("password");

    // Check if login credentials match
    if (loginEmail === storedEmail && loginPassword === storedPassword) {
        localStorage.setItem('isLoggedIn',"true"); 
        alert("Login Successful");
        location.href = "index.html"; 
        // return true ;

       
    }
    
    else {
        alert("Login credentials do not match!");
      
    }
   return false;
}
