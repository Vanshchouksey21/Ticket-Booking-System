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
  
  if (selectedSeats.length === 0) {
    return Swal.fire({
      title: 'No Seats Selected',
      text: 'Please select at least one seat to continue with the booking.',
      icon: 'error',
    });
  }

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
    const response = await fetch('https://js-project-json-vnnw.onrender.com/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    });
    
    if (response.ok) {
      await Swal.fire({
        title: 'Booking Confirmed!',
        text: `Your ticket has been successfully booked for ${newBooking.name}.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Mark selected seats as booked
      selectedSeats.forEach(seatId => {
        const seat = document.querySelector(`.seat[data-seat-id='${seatId}']`);
        seat.classList.add('booked');
        seat.classList.remove('selected');
      });

      bookingForm.reset();
      selectedSeats = [];
      updateTicketCount();
    } else {
      throw new Error('Failed to save booking');
    }
  } catch (error) {
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
    const response = await fetch('https://js-project-json-vnnw.onrender.com/tickets');
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

window.onload = loadBookedSeats;
