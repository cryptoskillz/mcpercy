var t = TrelloPowerUp.iframe();

//check URL
function isURL(str) {
    // Regular expression for a simple URL pattern
    var urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    // Test if the string matches the URL pattern
    return urlPattern.test(str);
}

//submit the form
window.trelloform.addEventListener("submit", function(event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    //check all the fields are done.
    const control = document.getElementById('control').value;
    const variant = document.getElementById('variant').value;
    //reset the errors
    document.getElementById('controlError').innerText = ""
    document.getElementById('variantError').innerText = ""
    document.getElementById('errorDiv').innerText = ""
    //set an allow var
    let allowIt = 1;
    //check if the control is a URL
    if (isURL(control)  ==false) {
        allowIt = 0;
        document.getElementById('controlError').innerText = "Please enter a valid URL"
    }
    //check if the variant is a URL
    if (isURL(variant) == false ) {
        allowIt = 0;
        document.getElementById('variantError').innerText = "Please enter a valid URL"

    }
    //check the URL's do not match
    if (control == variant) {
        allowIt = 0;
        document.getElementById('errorDiv').innerText = "URL's must be different"
    }

    //check to see if we want to call the snapshop API
    if (allowIt == 1) {
        //set card id to a test one for well you know testing purposes
        let cardId = "aBFTnUXw"
        //set a url var
        let theUrl = "";
        //check if its localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            theUrl = `http://localhost:8789/`
        } else {
            theUrl = 'https://mcpercy.pages.dev/'
            //get the card id
            cardId = t.getContext().card;

        }

        //get the control url
        let control = document.getElementById('control').value;
        //get the variant url 
        let variant = document.getElementById('variant').value;
        //get the device 
        let device = document.getElementById('device').value;

        //add it to the snaopshot method

        //set the method
        const theMethod = `api/snapshot/?control=${control}&variant=${variant}&device=${device}&cardid=${cardId}`;
        console.log(theMethod)
        //call it
        fetch(`${theUrl}${theMethod}`)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the JSON in the response
                return response.json();
            })
            .then(data => {
                // Handle the data from the response
                console.log('API Response:', data);
                return t.closePopup();
            })
            .catch(error => {
                // Handle errors during the fetch
                console.error('Error:', error);
            });
    }

});
t.render(function() {
    t.sizeTo("#trelloform").done();
});
