var t = TrelloPowerUp.iframe();
let isLocal = 0;

//check URL
let isURL = (str) => {
    // Regular expression for a simple URL pattern
    var urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    // Test if the string matches the URL pattern
    return urlPattern.test(str);
}

//function to update the div content
let updateDiv = () => {
    //logic  to update the content
    let theDiv = document.getElementById('processingdiv');
    //add a scroller
    if (theDiv.innerText != "Processing...")
        theDiv.innerText = theDiv.innerText + ".";
    else
        theDiv.innerText = "Processing";
}

//set the state of the form
//1 = control form
//2 = variant form 
let setForm = (state, theUrl = "") => {
    //show the control form
    if (state == 1) {
        document.getElementById('variantForm').style.display = 'none';
        document.getElementById('controlForm').style.display = '';
    } else {
        //show the variant form
        //hide the control form
        document.getElementById('controlForm').style.display = 'none';
        //show the varaint form
        document.getElementById('variantForm').style.display = '';
        //set the control URL
        document.getElementById('controlURLSet').innerText = theUrl;
        //set the control URL
        document.getElementById('controlURL').value = theUrl;
    }

}

//check the form state
//1 = control form 
//2 = variant form
let checkForm = (check) => {
    if (check == 1) {
        document.getElementById('controlError').innerText = "";
        if (isURL(document.getElementById('controlURL').value) == false) {
            document.getElementById('controlError').innerText = "Please enter a valid URL"
            return (0); //false
        } else {
            return (1); //true
        }
    }
    if (check == 2) {
        document.getElementById('variantError').innerText = ""
        let allowIt = 1;
        if (isURL(document.getElementById('variantURL').value) == false) {
            document.getElementById('variantError').innerText = "Please enter a valid URL!"
            allowIt = 0;
        }
        if (document.getElementById('variantURL').value == document.getElementById('controlURL').value) {
            document.getElementById('variantError').innerText = "URL's must be different"
            allowIt = 0
        }
        return (allowIt)

    }
}

//take a snapshot
//1 = control 
//2 = variant
let takeSnapshot = (state) => {
    document.getElementById('controlForm').style.display = 'none';
    document.getElementById('variantForm').style.display = 'none';
    document.getElementById('processingdiv').style.display = '';
    var intervalId = setInterval(updateDiv, 1000);
    let snapshotAPI = 'https://mcpercy.pages.dev/';
    let cardId = "aBFTnUXw"
    if (isLocal == 1)
        snapshotAPI = 'http://localhost:8789/';
    else
        cardId = t.getContext().card;
    //get the control url
    let theURL = document.getElementById('controlURL').value;
    if (state == 2)
        theURL = document.getElementById('variantURL').value;
    //get the device 
    let device = document.getElementById('device').value;
    //as we add more device it we will update the device check
    if (device == 1)
        device = "desktop"
    //get the variant url 
    const theMethod = `api/snapshot/?url=${theURL}&state=${state}&device=${device}&cardid=${cardId}&requestor=1`;
    //call it
    fetch(`${snapshotAPI}${theMethod}`)
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
            clearInterval(intervalId);
            //return t.closePopup();
            if (state == 1) {
                document.getElementById('controlForm').style.display = 'none';
                document.getElementById('variantForm').style.display = '';
                document.getElementById('processingdiv').style.display = 'none';
            }
            if (state == 2)
                return t.closePopup();
        })
        .catch(error => {
            // Handle errors during the fetch
            clearInterval(intervalId);
            console.error('Error:', error);
        });

}


/*
this functon lets us run locally to make debugging easier.
*/
// Get the query string from the URL
const queryString = window.location.search;
// Create a URLSearchParams object from the query string
const urlParams = new URLSearchParams(queryString);
//check if we are local and if so set it up 
if (urlParams.has('local')) {
    isLocal = 1;
    //debug set the control URL 
    document.getElementById("controlURL").value = "http://www.purdyandfigg.com";
    document.getElementById("variantURL").value = "http://www.purdyandfigg.com";
    if (document.getElementById("controlURL").value == "")
        setForm(1)
    else
        setForm(2, document.getElementById("controlURL").value)
}


document.getElementById('snapControl').addEventListener("click", function() {
    takeSnapshot(1);

});

document.getElementById('snapVariant').addEventListener("click", function() {

    if (checkForm(2) == 1) {
        takeSnapshot(2);
        return t
            .set("card", "shared", "variantURL", document.getElementById('variantURL').value)
            .then(function() {
                //close the pop up
                t.closePopup();
            });
    }
});


//function that checks for a control button being pressed
document.getElementById('addControl').addEventListener('click', function() {
    if (checkForm(1) == 1) {
        //event.preventDefault();
        //set the control url
        return t
            .set("card", "shared", "controlURL", document.getElementById('controlURL').value)
            .then(function() {
                //add it the control text div
                //show the variant div
                //hide the control div
                setForm(2);
                //t.closePopup();
            });
    }
});



//render function
t.render(function() {
    //get the variant URL
    t.get("card", "shared", "variantURL")
        .then(function(variantURL) {
            if ((variantURL != '') && (variantURL != undefined))
                document.getElementById("variantURL").value = variantURL
        })
    //check if we have a control URL
    return t
        .get("card", "shared", "controlURL")
        .then(function(controlURL) {
            //check if is set
            if ((controlURL != '') && (controlURL != undefined)) {
                //show the control form
                setForm(2, controlURL);

            } else {
                //show the variant form
                setForm(1, controlURL);
                //document.getElementById('variantForm').style.display = '';
            }

        })
        .then(function() {
            // t.sizeTo("#estimate").done();
        });
});



//submit the form (old code)
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