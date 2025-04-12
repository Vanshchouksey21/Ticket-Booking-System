document.addEventListener("DOMContentLoaded", () => {
    fetchFeedback(); // Load feedback when the page loads
});

// Function to submit the contact form
async function submitContactForm(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitButton = document.querySelector(".contact-form button");

    if (!name || !email || !message) {
        Swal.fire({
            title: 'Oops!',
            text: 'Please fill out all the fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Disable button and update text
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        let response = await fetch("https://js-project-json-vnnw.onrender.com/vn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            Swal.fire({
                title: 'Thank you!',
                text: 'Your message has been sent successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                document.querySelector(".contact-form").reset(); // Reset form
                fetchFeedback(); // Refresh feedback list
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to send your message. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire({
            title: 'Error!',
            text: 'An unexpected error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
}

// Attach event listener to the form
document.querySelector(".contact-form").addEventListener("submit", submitContactForm);

// Function to fetch and display feedback
const fetchFeedback = async () => {
    const feedbackContainer = document.querySelector(".feedback-container");

    try {
        let response = await fetch("https://js-project-json-vnnw.onrender.com/vn");

        if (!response.ok) throw new Error("Failed to fetch feedback.");

        let data = await response.json();

        feedbackContainer.innerHTML = "";

        if (data.length === 0) {
            feedbackContainer.innerHTML = "<p>No feedback yet. Be the first to leave a message!</p>";
            return;
        }

        // Loop through feedback and append to the container
        data.forEach((feedback) => {
            let feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-item");
            feedbackItem.innerHTML = `<strong>${feedback.name}</strong><p>${feedback.message}</p>`;
            feedbackContainer.appendChild(feedbackItem);
        });

    } catch (error) {
        console.error("Error fetching feedback:", error);
        feedbackContainer.innerHTML = "<p>Failed to load feedback.</p>";
    }
};
