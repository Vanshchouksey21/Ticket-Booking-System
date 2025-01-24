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
    if (
        !(
          loginPassword.match(/[1234567890]/) &&
          loginPassword.match(/[!@#$%^&*()]/) &&
          loginPassword.match(/[a-z]/) &&
          loginPassword.match(/[A-Z]/)
        )
      ) {
        document.querySelector("#password").focus();
        Swal.fire({
          title: "Weak Password",
          text: "Your password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK"
        });
        return false;
      } else if (loginPassword === "") {
        errorPassword.setAttribute("placeholder", "Please Enter your Password");
        errorPassword.classList.add("error");
        document.querySelector("#password").focus();
        Swal.fire({
          title: "Password Required",
          text: "Please enter your password.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK"
        });
        return false;
      }
      

    // Get stored email and password
    let storedEmail = localStorage.getItem("email");
    let storedPassword = localStorage.getItem("password");

    // Check if login credentials match
    if (loginEmail === storedEmail && loginPassword === storedPassword) {
        localStorage.setItem('isLoggedIn', "true"); 
        Swal.fire({
          title: "Login Successful",
          text: "Welcome back!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK"
        }).then(() => {
          location.href = "index.html"; // Redirect after user acknowledges the success alert
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: "Login credentials do not match!",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again"
        });
      }
      return false;
    };
