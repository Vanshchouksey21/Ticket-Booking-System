document.addEventListener("DOMContentLoaded", () => {
  const movieImage = document.querySelector(".movie-image");
  const bookingForm = document.querySelector(".booking-form form");
  const seats = document.querySelectorAll(".seat");
  const ticketCountDisplay = document.querySelector(".ticket-count"); 

  // Example dynamic data (replace this with actual data source or API)
  const movies = {
    "The Grand Adventure": "mv/i-1.avif",
    "Space Odyssey": "mv/i-2.avif",
    "Romance in Paris": "mv/i-3.avif",
  };

  // Track selected seats
  let selectedSeats = [];

  // Function to update the movie image based on selected title
  const updateMovieImage = (selectedMovieTitle) => {
    if (movies[selectedMovieTitle]) {
      movieImage.src = movies[selectedMovieTitle];
    } else {
      alert("Movie not found!");
    }
  };

  // Function to toggle the seat selection and update ticket count
  const toggleSeatSelection = (seatElement) => {
    const seatId = seatElement.dataset.seatId;

    // If the seat is already selected, unselect it
    if (seatElement.classList.contains('selected')) {
      seatElement.classList.remove('selected');
      selectedSeats = selectedSeats.filter(seat => seat !== seatId);
    } else if (!seatElement.classList.contains('booked')) {
      seatElement.classList.add('selected');
      selectedSeats.push(seatId);
    }

    // Update the ticket count display
    updateTicketCount();
  };

  // Function to update the ticket count
  const updateTicketCount = () => {
    const ticketCount = selectedSeats.length;
    ticketCountDisplay.textContent = ticketCount; 
  };

  // Handle form submission
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the movie title from the form's select input
    const selectedMovieTitle = document.querySelector('#movie').value;
    updateMovieImage(selectedMovieTitle);

    // Log the selected seats and ticket count
    console.log("Selected seats:", selectedSeats);
    console.log("Total tickets:", selectedSeats.length);

    // Display SweetAlert confirmation
    Swal.fire({
      title: 'Booking Confirmed!',
      text: `You have successfully booked ${selectedSeats.length} ticket(s) for the movie "${selectedMovieTitle}".`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  });

  // Add event listeners to all seats for seat selection
  seats.forEach(seat => {
    seat.addEventListener("click", () => toggleSeatSelection(seat));
  });
});
