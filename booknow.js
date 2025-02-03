
const ticketData = {
  TicketDetails: [
    { seat: "1, 2, 3" },
    { seat: "11, 12, 13" }
  ]
};


const bookedSeats = ticketData.TicketDetails.flatMap(booking => booking.seat.split(", ").map(seat => seat.trim()));

// Mark booked seats
document.querySelectorAll('.seat').forEach(seat => {
  const seatId = seat.getAttribute('data-seat-id');
  if (bookedSeats.includes(seatId)) {
    seat.classList.add('booked');
    seat.innerText = 'Booked';
  }
});

// Handle seat selection
let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];

const updateTicketCount = () => {
  document.getElementById('ticket-count').textContent = selectedSeats.length;
};

const toggleSeatSelection = (seat) => {
  const seatId = seat.getAttribute('data-seat-id');

  if (seat.classList.contains('booked')) return; // Don't allow booking of booked seats
  
  if (selectedSeats.includes(seatId)) {
    selectedSeats = selectedSeats.filter(id => id !== seatId);
    seat.classList.remove('selected');
  } else {
    selectedSeats.push(seatId);
    seat.classList.add('selected');
  }

  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  updateTicketCount();
};

// Add event listener to seats
document.querySelectorAll('.seat').forEach(seat => {
  seat.addEventListener('click', () => toggleSeatSelection(seat));
});

// SweetAlert confirmation on form submission
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  Swal.fire({
    title: 'Booking Confirmation',
    text: `You have booked ${selectedSeats.length} seats: ${selectedSeats.join(", ")}.`,
    icon: 'success',
    confirmButtonText: 'Ok'
  });
});
