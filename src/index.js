document.addEventListener("DOMContentLoaded", () => {
    const pupsUrl = "http://localhost:3000/pups"
    // Defines the API Endpoint

    const dogBar = document.querySelector("#dog-bar");
    //Selects the #dog-bar where the dog names will be displayed.

    const dogInfo = document.querySelector("#dog-info");
    //Seletcs #dog-info where the pup details will be shown.

    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");
    //Creates an <img>, <h2>, and <button> for displaying details.

    dogInfo.appendChild(img);
    dogInfo.appendChild(h2);
    //Appends the image and name header to #dog-info.


    fetch(pupsUrl)
        .then(resp => resp.json())
        .then(data => {
            data.forEach((pup) => addNameToBar(pup))
        })
        //Fetches data from the URL API and converts the response to JSON.
        //addNameToBar displays dog names in #dog-bar iterating over each pup object.

    function addNameToBar(pup) {
        const span = document.createElement("span");
        span.textContent = pup.name;
        dogBar.appendChild(span);
        span.addEventListener("click", () => pupClicked(pup))
    }
        //Creates a <span> for each pup's name and appends it to #dog-bar.
        //Adds a click event to call pupClicked(pup) when the use clicks on a pup name.

    function pupClicked(pup) {
        img.src = pup.image;
        h2.textContent = pup.name;
        if (dogInfo.contains(button) === false) {
            dogInfo.appendChild(button);
        }
        if (pup.isGoodDog) {
            button.textContent = "Good Dog!";
        } else {
            button.textContent = "Bad Dog!";
        }
        button.addEventListener("click", () => buttonClicked(pup.isGoodDog, pup));
    }
        //Updates the image (img.src) and name (h2.textContent) in #dog-info.
        //Checks if the button is already present in #dog-info before appending it.
        //Sets button text based on pup.isGoodDog (either "Good Dog!" or "Bad Dog!").
        //Adds a click event to toggle the pup’s isGoodDog status when clicked.
        //button.addEventListener("click", () => buttonClicked(button.parentNode));
    
    function buttonClicked(isGoodDog, pup) {
        let good = true;
        if (isGoodDog) {
            good = false;
        }
        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": good,
            }),
        })
            .then(resp => resp.json())
            .then(data => {
                if(good){
                    button.textContent = "Good Dog!"
                } else {
                    button.textContent = "Bad Dog!"
                }
            })
    }
})
//Toggles isGoodDog status (true ⇄ false).
//Sends a PATCH request to update the pup’s status in the database.
//Updates the button text based on the new isGoodDog status.