var t = TrelloPowerUp.iframe();

//check URL
let isURL = (str) => {
    // Regular expression for a simple URL pattern
    var urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    // Test if the string matches the URL pattern
    return urlPattern.test(str);
}

// Function to update the div content
let updateDiv = () => {
    // You can put any logic here to update the content
    let theDiv = document.getElementById('processingdiv')
    if (theDiv.innerText != "Processing...")
      theDiv.innerText = theDiv.innerText+".";
    else
      theDiv.innerText = "Processing";
}


document.getElementById('addControl').addEventListener('click', function() {
  event.preventDefault();
  let theControlURL = document.getElementById('controlURL').value;
  alert(theControlURL);
  return t
    .set("card", "shared", "controlURL", theControlURL)
    .then(function () {
      //t.closePopup();
    });
});


//submit the form
/*
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
        //show the processing class. 
        document.getElementById('formdiv').style.display = 'none';
        document.getElementById('processingdiv').style.display = '';
        // Update the div every second
         var intervalId = setInterval(updateDiv, 1000);
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
        //set the method
        const theMethod = `api/snapshot/?control=${control}&variant=${variant}&device=${device}&cardid=${cardId}&requestor=1`;
        //console.log(theMethod)
        //call it
        fetch(`${theUrl}${theMethod}`)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the JSON in the response
                clearInterval(intervalId);
                return response.json();
            })
            .then(data => {
                // Handle the data from the response
                console.log('API Response:', data);
                clearInterval(intervalId);
                return t.closePopup();
            })
            .catch(error => {
                // Handle errors during the fetch
                clearInterval(intervalId);
                console.error('Error:', error);
            });
    }

});

*/

t.render(function() {
   return t
    .get("card", "shared", "controlURL")
    .then(function (controlURL) {
      if ((controlURL != '') && (controlURL != undefined))
      {
        document.getElementById('controlForm').style.display = '';
        window.controlURL.value = controlURL;  
      }
      else
      {
        document.getElementById('variantForm').style.display = '';
      }
      
    })
    .then(function () {
      //t.sizeTo("#estimate").done();
    });
});
