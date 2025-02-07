document.addEventListener("DOMContentLoaded", () => {
    // Fetch pup data when the page loads
    fetch("http://localhost:3000/pups") // Replace with your server's URL
        .then(response => response.json()) // Parse the JSON response
        .then(pups => {
            const dogBar = document.getElementById("dog-bar");

            // Iterate over each pup and create a span for their name
            pups.forEach(pup => {
                const pupSpan = document.createElement("span");
                pupSpan.textContent = pup.name; // Set the span's text to the pup's name

                // Append the span to the dog bar
                dogBar.appendChild(pupSpan);
            });
        })
        .catch(error => console.error("Error fetching pup data:", error));
});