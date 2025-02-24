// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("feedback-form");
//     const feedbackList = document.getElementById("feedback-list");
//     const searchBar = document.getElementById("search-bar");

//     // Function to fetch and display all feedback
//     function loadFeedback() {
//         fetch("http://localhost:3000/feedback")
//             .then(response => response.json())
//             .then(data => {
//                 feedbackList.innerHTML = ""; // Clear previous content
//                 data.forEach(feedback => {
//                     const feedbackItem = document.createElement("div");
//                     feedbackItem.classList.add("feedback-item");
//                     feedbackItem.innerHTML = `<strong>${feedback.name}</strong>: ${feedback.message}`;
//                     feedbackList.appendChild(feedbackItem);
//                 });
//             })
//             .catch(error => console.error("Error fetching feedback:", error));
//     }

//     // Handle form submission
//     form.addEventListener("submit", function (event) {
//         event.preventDefault();

//         const name = document.getElementById("name").value;
//         const message = document.getElementById("message").value;

//         fetch("http://localhost:3000/submit-feedback", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, message })
//         })
//         .then(response => response.json())
//         .then(() => {
//             form.reset();  // Clear form fields after submission
//             loadFeedback(); // Reload feedback list
//         })
//         .catch(error => console.error("Error submitting feedback:", error));
//     });

//     // Load feedback when page loads
//     loadFeedback();
// });


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedback-form");
    const feedbackList = document.getElementById("feedback-list");
    const searchBar = document.getElementById("search-bar");

    // Function to fetch and display all feedback
    function loadFeedback() {
        fetch("http://localhost:3000/feedback")
            .then(response => response.json())
            .then(data => {
                displayFeedback(data);
            })
            .catch(error => console.error("Error fetching feedback:", error));
    }

    // Function to display feedback
    function displayFeedback(feedbackArray) {
        feedbackList.innerHTML = ""; // Clear previous content
        feedbackArray.forEach(feedback => {
            const feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-item");

            // Format timestamp
            const date = new Date(feedback.timestamp);
            const formattedTime = date.toLocaleString(); // Converts to readable format

            // Display feedback with timestamp
            feedbackItem.innerHTML = `
                <strong>${feedback.name}</strong> <span class="timestamp">(${formattedTime})</span>: ${feedback.message}
            `;
            feedbackList.appendChild(feedbackItem);
        });
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

    // Function to filter feedback by name
    function filterFeedback() {
        const searchValue = searchBar.value.toLowerCase();

        fetch("http://localhost:3000/feedback")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(feedback =>
                    feedback.name.toLowerCase().includes(searchValue)
                );
                displayFeedback(filteredData);
            })
            .catch(error => console.error("Error filtering feedback:", error));
    }

    // Load feedback when page loads
    loadFeedback();
});
