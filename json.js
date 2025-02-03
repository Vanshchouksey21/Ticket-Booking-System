// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    fetchFeedback(); // Load feedback when the page loads
});

// Function to submit the contact form
let submitContactForm = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const statusMessage = document.getElementById("status-message");
    const loadingIndicator = document.getElementById("loading"); // Updated ID

    // Simple form validation
    if (!name || !email || !message) {
        statusMessage.textContent = "All fields are required.";
        statusMessage.style.color = "red";
        return;
    }

    // Show loading indicator
    loadingIndicator.style.display = "block";
    statusMessage.textContent = ""; // Clear previous messages

    const formData = { name, email, message };

    try {
        let response = await fetch("http://localhost:3000/vn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        loadingIndicator.style.display = "none"; // Hide loading indicator

        if (response.ok) {
            statusMessage.textContent = "Message sent successfully!";
            statusMessage.style.color = "green";
            document.querySelector(".contact-form").reset(); // Reset form
            fetchFeedback(); // Refresh feedback list
        } else {
            statusMessage.textContent = "Failed to send message.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Error:", error);
        loadingIndicator.style.display = "none";
        statusMessage.textContent = "An error occurred. Please try again later.";
        statusMessage.style.color = "red";
    }
};

// Function to fetch and display feedback
async function fetchFeedback() {
    const feedbackList = document.getElementById("feedback-list");
    const feedbackContainer = document.querySelector(".feedback-container");

    try {
        let response = await fetch("http://localhost:3000/vn");
        let data = await response.json();

        if (data.length === 0) {
            feedbackList.innerHTML = "<p>No feedback yet. Be the first to leave a message!</p>";
            return;
        }

        feedbackContainer.innerHTML = ""; // Clear old content

        data.forEach(feedback => {
            let feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-item");
            feedbackItem.innerHTML = `<strong>${feedback.name}</strong><p>${feedback.message}</p>`;
            feedbackContainer.appendChild(feedbackItem);
        });

    } catch (error) {
        console.error("Error fetching feedback:", error);
        feedbackList.innerHTML = "<p>Failed to load feedback.</p>";
    }
}

// Attach form submission event listener
document.querySelector(".contact-form").addEventListener("submit", submitContactForm);
