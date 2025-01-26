// JSON data for booked seats
const ticketData = {
  TicketDetails: [
    {
      name: "Vansh",
      Email: "vanshchouksey2@gmail.com",
      seat: "A1, A2",
      Tickets: "2",
      Date: "20/02/2025",
      time: "10:00 AM",
    },
    {
      name: "Ansh",
      Email: "anshchouksey2@gmail.com",
      seat: "A5, A3, A6, A8, A7",
      Tickets: "5",
      Date: "10/02/2025",
      time: "01:00 PM",
    },
    {
      "name": "Agam",
      "Email": "agam2@gmail.com",
      "seat": "B5, B3, B6, B8, B7",
      "Tickets": "5",
      "Date": "10/02/2025",
      "time": "01:00 PM"
    },
    {
      "name": "Riya",
      "Email": "riya.kapoor@example.com",
      "seat": "C1, C2, C3",
      "Tickets": "3",
      "Date": "21/02/2025",
      "time": "09:00 AM"
    },
    {
      "name": "Arjun",
      "Email": "arjun.verma@example.com",
      "seat": "D1, D2",
      "Tickets": "2",
      "Date": "22/02/2025",
      "time": "11:30 AM"
    },
    {
      "name": "Meera",
      "Email": "meera.sharma@example.com",
      "seat": "E1, E2, E3, E4",
      "Tickets": "4",
      "Date": "23/02/2025",
      "time": "02:00 PM"
    },
    {
      "name": "Karan",
      "Email": "karan.singh@example.com",
      "seat": "F1, F2, F3, F4, F5",
      "Tickets": "5",
      "Date": "24/02/2025",
      "time": "05:00 PM"
    },
    {
      "name": "Aarav",
      "Email": "aarav.jain@example.com",
      "seat": "G1, G2, G3",
      "Tickets": "3",
      "Date": "25/02/2025",
      "time": "06:00 PM"
    },
    {
      "name": "Ishita",
      "Email": "ishita.malhotra@example.com",
      "seat": "H1, H2, H3, H4",
      "Tickets": "4",
      "Date": "26/02/2025",
      "time": "03:00 PM"
    },
    {
      "name": "Rohan",
      "Email": "rohan.bhatt@example.com",
      "seat": "J1, J2",
      "Tickets": "2",
      "Date": "27/02/2025",
      "time": "07:00 PM"
    },
    {
      "name": "Sanya",
      "Email": "sanya.mehra@example.com",
      "seat": "K1, K2, K3, K4",
      "Tickets": "4",
      "Date": "28/02/2025",
      "time": "08:00 PM"
    },
    {
      "name": "Kabir",
      "Email": "kabir.roy@example.com",
      "seat": "L1, L2",
      "Tickets": "2",
      "Date": "01/03/2025",
      "time": "10:00 AM"
    },
    {
      "name": "Neha",
      "Email": "neha.kapoor@example.com",
      "seat": "M1, M2, M3, M4, M5",
      "Tickets": "5",
      "Date": "02/03/2025",
      "time": "12:00 PM"
    },
    {
      "name": "Raj",
      "Email": "raj.kumar@example.com",
      "seat": "N1, N2, N3",
      "Tickets": "3",
      "Date": "03/03/2025",
      "time": "11:00 AM"
    },
    {
      "name": "Simran",
      "Email": "simran.kaur@example.com",
      "seat": "O1, O2, O3, O4",
      "Tickets": "4",
      "Date": "04/03/2025",
      "time": "02:00 PM"
    },
    {
      "name": "Tara",
      "Email": "tara.mishra@example.com",
      "seat": "P1, P2",
      "Tickets": "2",
      "Date": "05/03/2025",
      "time": "03:30 PM"
    },
    {
      "name": "Aditya",
      "Email": "aditya.shah@example.com",
      "seat": "Q1, Q2, Q3, Q4, Q5",
      "Tickets": "5",
      "Date": "06/03/2025",
      "time": "01:00 PM"
    },
    {
      "name": "Sneha",
      "Email": "sneha.nair@example.com",
      "seat": "R1, R2, R3",
      "Tickets": "3",
      "Date": "07/03/2025",
      "time": "10:30 AM"
    },
    {
      "name": "Aryan",
      "Email": "aryan.malhotra@example.com",
      "seat": "S1, S2, S3, S4",
      "Tickets": "4",
      "Date": "08/03/2025",
      "time": "11:00 AM"
    },
    {
      "name": "Priya",
      "Email": "priya.sharma@example.com",
      "seat": "T1, T2",
      "Tickets": "2",
      "Date": "09/03/2025",
      "time": "04:00 PM"
    }
  ],
};

// Extract booked seats from the JSON
const bookedSeats = ticketData.TicketDetails.flatMap((booking) =>
  booking.seat.split(", ").map((seat) => seat.trim())
);

// Mark booked seats
document.querySelectorAll(".seat").forEach((seatElement) => {
  if (bookedSeats.includes(seatElement.dataset.seatId)) {
    seatElement.classList.add("booked");
    seatElement.innerHTML += " (Booked)";
  }
});

// Select all seat elements and the ticket count element
const seatElements = document.querySelectorAll(".seat");
const ticketCountElement = document.getElementById("ticket-count");
let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || []; // Load from localStorage

// Function to update the displayed ticket count
const updateTicketCount = () => {
  ticketCountElement.textContent = selectedSeats.length;
};

// Function to handle seat selection and deselection
const toggleSeatSelection = (seat) => {
  const seatId = seat.getAttribute("data-seat-id");

  // If seat is already booked, prevent selection
  if (seat.classList.contains("booked")) {
    return; // Don't allow selection of booked seats
  }

  if (selectedSeats.includes(seatId)) {
    // Deselect the seat
    selectedSeats = selectedSeats.filter((id) => id !== seatId);
    seat.classList.remove("selected");
    seat.setAttribute("aria-pressed", "false");
  } else {
    // Select the seat
    selectedSeats.push(seatId);
    seat.classList.add("selected");
    seat.setAttribute("aria-pressed", "true");
  }

  updateTicketCount();

  // Save selected seats to localStorage
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
};

// Add click and accessibility attributes to seats
seatElements.forEach((seat) => {
  seat.addEventListener("click", () => toggleSeatSelection(seat));

  // Accessibility enhancements
  seat.setAttribute("role", "button");
  seat.setAttribute("aria-pressed", "false");

  // Add focus and blur event listeners for keyboard navigation
  seat.addEventListener("focus", () => seat.classList.add("focused"));
  seat.addEventListener("blur", () => seat.classList.remove("focused"));
});

// Booking form handling
const bookingForm = document.querySelector(".booking-form form");
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Show a warning if no seats are selected
    if (selectedSeats.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Seats Selected",
        text: "Please select at least one seat before confirming your booking.",
      });
      return;
    }

    // Collect form data
    const formData = new FormData(bookingForm);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    // Display booking confirmation
    Swal.fire({
      icon: "success",
      title: "Booking Confirmed",
      text: `Thank you for booking! You have selected ${selectedSeats.length} seat(s).`,
    }).then(() => {
      // Reset the form and seat selection
      bookingForm.reset();
      selectedSeats = [];
      seatElements.forEach((seat) => {
        seat.classList.remove("selected");
        seat.setAttribute("aria-pressed", "false"); // Reset aria-pressed
      });
      updateTicketCount();
      // Clear selected seats from localStorage after booking
      localStorage.removeItem("selectedSeats");
    });
  });
}

// Load selected seats on page load
seatElements.forEach((seat) => {
  if (selectedSeats.includes(seat.dataset.seatId)) {
    seat.classList.add("selected");
    seat.setAttribute("aria-pressed", "true");
  }
});

updateTicketCount(); // Update the displayed ticket count on load