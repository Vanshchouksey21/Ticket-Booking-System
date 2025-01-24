let signup = () => {
  let signname = document.querySelector("#name").value;
  let signmobile = document.querySelector("#mobile").value;
  let signemail = document.querySelector("#email").value;
  let signpassword = document.querySelector("#password").value;

  let errorname = document.querySelector("#name");
  let errormobile = document.querySelector("#mobile");
  let erroremail = document.querySelector("#email");
  let errorpassword = document.querySelector("#password");

  // Clear previous error states
  errorname.classList.remove('error');
  errormobile.classList.remove('error');
  erroremail.classList.remove('error');
  errorpassword.classList.remove('error');

  // Reset placeholder text
  errorname.setAttribute("placeholder", "");
  errormobile.setAttribute("placeholder", "");
  erroremail.setAttribute("placeholder", "");
  errorpassword.setAttribute("placeholder", "");

  if (signname === "") {
      errorname.setAttribute("placeholder", "Please Enter your Name");
      errorname.classList.add('error');
      document.querySelector("#name").focus();
      return false;
  }

  if (isNaN(signmobile)) {
      errormobile.setAttribute("placeholder", "Please Enter a valid Mobile Number");
      errormobile.classList.add('error');
      document.querySelector("#mobile").focus();
      return false;
  } else if (signmobile === "") {
      errormobile.setAttribute("placeholder", "Please Enter your Mobile");
      errormobile.classList.add('error');
      document.querySelector("#mobile").focus();
      return false;
  } else if (signmobile.length !== 10) {
      errormobile.setAttribute("placeholder", "Please Enter 10 digit Mobile Number");
      errormobile.classList.add('error');
      document.querySelector("#mobile").focus();
      return false;
  }

  if (!(signemail.includes('@') && signemail.includes('.com'))) {
      erroremail.setAttribute("placeholder", "Please Enter a Valid Email");
      erroremail.classList.add('error');
      document.querySelector("#email").focus();
      return false;
  } else if (signemail === "") {
      erroremail.setAttribute("placeholder", "Please Enter your Email");
      erroremail.classList.add('error');
      document.querySelector("#email").focus();
      return false;
  }

  if (
    !(
      signpassword.match(/[1234567890]/) &&
      signpassword.match(/[!@#$%^&*()]/) &&
      signpassword.match(/[a-z]/) &&
      signpassword.match(/[A-Z]/)
    )
  ) {
    document.querySelector("#password").focus();
    Swal.fire({
      title: "Weak Password",
      text: "Password should have at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK"
    });
    return false;
  } else if (signpassword === "") {
    errorpassword.setAttribute("placeholder", "Please Enter your Password");
    errorpassword.classList.add('error');
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
  

  // Store values in localStorage if validation passes
  localStorage.setItem("name", signname);
  localStorage.setItem("mobile", signmobile);
  localStorage.setItem("email", signemail);
  localStorage.setItem("password", signpassword);

  // Redirect to login page
  location.href = "login.html";
  return false;
}
