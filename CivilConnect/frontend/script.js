document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedback-form");
    const feedbackList = document.getElementById("feedback-list");

    // Function to fetch and display all feedback
    function loadFeedback() {
        fetch("http://localhost:3000/feedback")
            .then(response => response.json())
            .then(data => {
                feedbackList.innerHTML = ""; // Clear previous content
                data.forEach(feedback => {
                    const feedbackItem = document.createElement("div");
                    feedbackItem.classList.add("feedback-item");
                    feedbackItem.innerHTML = `<strong>${feedback.name}</strong>: ${feedback.message}`;
                    feedbackList.appendChild(feedbackItem);
                });
            })
            .catch(error => console.error("Error fetching feedback:", error));
    }

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;

        fetch("http://localhost:3000/submit-feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message })
        })
        .then(response => response.json())
        .then(() => {
            form.reset();  // Clear form fields after submission
            loadFeedback(); // Reload feedback list
        })
        .catch(error => console.error("Error submitting feedback:", error));
    });

    // Load feedback when page loads
    loadFeedback();
});
