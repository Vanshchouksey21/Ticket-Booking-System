document.addEventListener("DOMContentLoaded", () => {
    // Select elements for movie image, form, seat layout, and ticket count
    const movieImage = document.querySelector(".movie-image");
    const bookingForm = document.querySelector(".booking-form form");
    const seats = document.querySelectorAll(".seat");
    const ticketCountDisplay = document.querySelector(".ticket-count"); // To display the number of selected tickets
    
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
        alert(`Booking confirmed for: ${selectedMovieTitle}`);
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
      ticketCountDisplay.textContent = ticketCount; // Display the count of selected seats
    };

    // Handle form submission
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Get the movie title from the form or a dynamic selection
      const selectedMovieTitle = "Space Odyssey"; // Replace this with logic to dynamically select the movie
      updateMovieImage(selectedMovieTitle);
      
      // Log the selected seats and ticket count
      console.log("Selected seats:", selectedSeats);
      console.log("Total tickets:", selectedSeats.length);
    });

    // Add event listeners to all seats for seat selection
    seats.forEach(seat => {
      seat.addEventListener("click", () => toggleSeatSelection(seat));
    });
  });
