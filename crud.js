const apiUrl = 'http://localhost:3000/tickects';

// Fetch Data and Display Booked Tickets
const fetchData = async () => {
    let res = await fetch(apiUrl, { method: "GET" });
    let data = await res.json();
    console.log(data);

    let display = document.querySelector('#crudd');
    display.innerHTML = '';

    data.forEach((e) => {
        display.innerHTML += `
        <div class="card">
            <h2>Name: <span>${e.name}</span></h2>
            <p>Email: <span>${e.Email}</span></p>
            <p>Seat: <span>${e.seat}</span></p>
            <p>Tickets: <span>${e.Tickets}</span></p>
            <p>Date: <span>${e.Date}</span></p>
            <p>Time: <span>${e.time}</span></p>
        </div>`;
    });

    // Mark already booked seats
    let bookedSeats = data.flatMap((booking) => booking.seat.split(", ").map((s) => s.trim()));
    document.querySelectorAll(".seat").forEach((seatElement) => {
        if (bookedSeats.includes(seatElement.dataset.seatId)) {
            seatElement.classList.add("booked");
            seatElement.innerHTML += " (Booked)";
            seatElement.style.pointerEvents = "none"; // Disable clicking on booked seats
        }
    });
};

// Handle Seat Selection
let selectedSeats = [];

const toggleSeatSelection = (seat) => {
    let seatId = seat.getAttribute("data-seat-id");

    if (seat.classList.contains("booked")) return; // Prevent booking a booked seat

    if (selectedSeats.includes(seatId)) {
        selectedSeats = selectedSeats.filter(s => s !== seatId);
        seat.classList.remove("selected");
    } else {
        selectedSeats.push(seatId);
        seat.classList.add("selected");
    }

    document.getElementById("ticket-count").textContent = selectedSeats.length;
};

// Attach Event Listeners to Seats
document.querySelectorAll(".seat").forEach((seat) => {
    seat.addEventListener("click", () => toggleSeatSelection(seat));
});

// Submit Booking Form
const bookTickets = async (event) => {
    event.preventDefault(); // Prevent page reload

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat!");
        return;
    }

    let newBooking = {
        name,
        Email: email,
        seat: selectedSeats.join(", "),
        Tickets: selectedSeats.length,
        Date: date,
        time
    };

    // Send Data to Server
    let res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking)
    });

    if (res.ok) {
        Swal.fire({
            title: "Booking Confirmed!",
            text: `You've booked ${selectedSeats.length} tickets for seats: ${selectedSeats.join(", ")}`,
            icon: "success",
            confirmButtonText: "Ok"
        });

        selectedSeats = [];
        document.getElementById("ticket-count").textContent = 0;
        fetchData(); // Refresh bookings after submission
    } else {
        alert("Booking failed! Please try again.");
    }
};

// Attach Event Listener to Booking Form
document.querySelector("form").addEventListener("submit", bookTickets);

// Fetch initial data
fetchData();
