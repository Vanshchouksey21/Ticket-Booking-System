
async function submitContactForm() {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const statusMessage = document.getElementById("status-message");
    const loadingIndicator = document.getElementById("loading");

    const formData = { name, email, message };

    // Show loading
    loadingIndicator.style.display = "block";
    statusMessage.textContent = "";

    try {
        let response = await fetch("http://localhost:3000/vn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        loadingIndicator.style.display = "none"; // Hide loading

        if (response.ok) {
            statusMessage.textContent = "Message sent successfully!";
            statusMessage.style.color = "green";
            document.querySelector(".contact-form").reset();
            fetchFeedback(); // Refresh feedback list
        } else {
            statusMessage.textContent = "Failed to send message.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        loadingIndicator.style.display = "none";
        statusMessage.textContent = "An error occurred.";
        statusMessage.style.color = "red";
    }

    return false;
}

async function fetchFeedback() {
    const feedbackList = document.getElementById("feedback-list");

    try {
        let response = await fetch("http://localhost:3000/vn");
        let data = await response.json();

        if (data.length === 0) {
            feedbackList.innerHTML = "<p>No feedback yet. Be the first to leave a message!</p>";
            return;
        }

        // Create a wrapper for smooth scrolling
        let feedbackContainer = document.createElement("div");
        feedbackContainer.classList.add("feedback-container");

        // Append feedback items
        data.forEach(feedback => {
            let feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-item");
            feedbackItem.innerHTML = `<strong>${feedback.name}</strong><p>${feedback.message}</p>`;
            feedbackContainer.appendChild(feedbackItem);
        });

        // Append to feedback list
        feedbackList.innerHTML = ""; // Clear old content
        feedbackList.appendChild(feedbackContainer);

        // Clone feedback items for seamless looping effect
        let clone = feedbackContainer.cloneNode(true);
        feedbackList.appendChild(clone);
    } catch (error) {
        feedbackList.innerHTML = "<p>Failed to load feedback.</p>";
    }
}

// Load feedback on page load
document.addEventListener("DOMContentLoaded", fetchFeedback);
