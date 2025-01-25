let seatElements = document.querySelectorAll(".seat");
  let ticketCountElement = document.getElementById("ticket-count");
  let selectedSeats = [];


  let updateTicketCount=()=> {
    ticketCountElement.textContent = selectedSeats.length;
  }

 
  seatElements.forEach(seat => {
    seat.addEventListener("click", () => {
      const seatId = seat.getAttribute("data-seat-id");

      
      if (selectedSeats.includes(seatId)) {
        // Deselect the seat
        selectedSeats = selectedSeats.filter(id => id !== seatId);
        seat.classList.remove("selected");
      } else {
        
        selectedSeats.push(seatId);
        seat.classList.add("selected");
      }

      
      updateTicketCount();
    });

   
    seat.setAttribute("role", "button");
    seat.setAttribute("aria-pressed", "false");
  });

 
  let bookingForm = document.querySelector(".booking-form form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission to test SweetAlert2 functionality

      // Show SweetAlert2 confirmation
      if (selectedSeats.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No Seats Selected',
          text: 'Please select at least one seat before confirming your booking.',
        });
        return;
      }

      
      let formData = new FormData(bookingForm);
      let formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      
      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed',
        text: `Thank you for booking! You have selected ${selectedSeats.length} seats.`,
      }).then(() => {
        
        bookingForm.reset();
        selectedSeats = [];
        document.querySelectorAll(".seat").forEach(seat => seat.classList.remove("selected"));
        updateTicketCount();
      });
    });
  }

  seatElements.forEach(seat => {
    seat.addEventListener("focus", () => {
      seat.classList.add("focused");
    });

    seat.addEventListener("blur", () => {
      seat.classList.remove("focused");
    });
  });

