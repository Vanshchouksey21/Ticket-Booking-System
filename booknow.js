
const seats = document.querySelectorAll('.seat');
const bookingForm = document.getElementById('booking-form');
const ticketCountElem = document.getElementById('ticket-count');
let selectedSeats = [];

// Function to update ticket count
const updateTicketCount = () => {
  ticketCountElem.textContent = selectedSeats.length;
};

// Event listener for seat selection
seats.forEach(seat => {
  seat.addEventListener('click', () => {
    const seatId = seat.getAttribute('data-seat-id');
    
    // Prevent selecting already booked seats
    if (seat.classList.contains('booked')) return;
    
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      selectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      seat.classList.add('selected');
      selectedSeats.push(seatId);
    }

    updateTicketCount();
  });
});

// Handle booking form submission
bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // If no seats are selected, show an alert
  if (selectedSeats.length === 0) {
    return Swal.fire({
      title: 'No Seats Selected',
      text: 'Please select at least one seat to continue with the booking.',
      icon: 'error',
    });
  }

  // Gather form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const newBooking = {
    name,
    email,
    date,
    time,
    seats: selectedSeats
  };

  try {
    // Send new booking data to your backend
    const response = await fetch('http://localhost:3000/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    });
    
    if (response.ok) {
      // Wait for the user to click "OK" before proceeding
      await Swal.fire({
        title: 'Booking Confirmed!',
        text: `Your ticket has been successfully booked for ${newBooking.name}.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      // Mark selected seats as booked AFTER user clicks "OK"
      selectedSeats.forEach(seatId => {
        const seat = document.querySelector(`.seat[data-seat-id='${seatId}']`);
        seat.classList.add('booked');
        seat.classList.remove('selected');
      });
  
      // Clear the form and reset selected seats
      bookingForm.reset();
      selectedSeats = [];
      updateTicketCount();
    } else {
      throw new Error('Failed to save booking');
    }
  } catch (error) {
    // Show error message if something goes wrong
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Try Again',
    });
  }
});

// Load booked seats from the server and mark them as booked
const loadBookedSeats = async () => {
  try {
    const response = await fetch('http://localhost:3000/tickets');
    if (!response.ok) throw new Error('Failed to fetch bookings');
    
    const bookings = await response.json();

    let bookedSeats = new Set();
    bookings.forEach(booking => {
      if (Array.isArray(booking.seats)) {
        booking.seats.forEach(seatId => {
          bookedSeats.add(seatId);
        });
      } else {
        console.warn("Invalid seats data format:", booking.seats);
      }
    });
    

    // Apply 'booked' class to booked seats
    seats.forEach(seat => {
      const seatId = seat.getAttribute('data-seat-id');
      if (bookedSeats.has(seatId)) {
        seat.classList.add('booked');
      }
    });
  } catch (error) {
    console.error("Error loading booked seats:", error);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to load booked seats. Please try again later.',
      icon: 'error',
    });
  }
};

// Call the function to load booked seats on page load
window.onload = loadBookedSeats;
