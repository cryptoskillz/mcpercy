//set the headers
document.getElementById("leftImage").innerHTML = "CONTROL"
document.getElementById("rightImage").innerHTML = "VARIANT"
//get the control
const controlElement = document.getElementById("controlImageScroller");
//get the variant
const variantElement = document.getElementById("variantImageScroller");
//set the image width
const setRes = 500;

//check if its localhost
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    theUrl = `http://localhost:8789/`
} else {
    theUrl = 'https://mcpercy.pages.dev/'
    //get the card id
}

//get the id 
const imageId = getUrlParam('id');
//build the control image
const controlImage = `${theUrl}api/image?id=${imageId}-control`;
//build the varaint image
const variantImage = `${theUrl}api/image?id=${imageId}-variant`;
//set the different images
let differentImage = "";

//set the elements
controlElement.innerHTML = `<img src="${controlImage}" style="width:${setRes}px" class=""/>`;
variantElement.innerHTML = `<img src="${variantImage}" style="width:${setRes}px" class=""/>`;

//get a url paramater
function getUrlParam(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}


//compare images function 
const compareImages = (setImageDifferent) => {
    let setRes = 500;

    //check we have both a baseline and a snapshop imates
    //if (baselineImage != "" && snapshotImage != "") {
        //check if we want to show the difference
        if (setImageDifferent == 1) {
            //check uf we have already processed the differences
            if (differentImage == "") {
                ///compare the images
                resemble(controlImage).compareTo(variantImage).onComplete(function(data) {
                    // Display the image comparison data as an image
                    var comparisonResultElement = document.getElementById('variantImageScroller');
                    var image = new Image();
                    image.src = data.getImageDataUrl();
                    //add it to the element
                    comparisonResultElement.innerHTML = `<img src="${image.src }" style="width:${setRes}px" class=""/>`;
                    differentImage = image.src;
                })
            } else {
                //use the saved differences image
                var comparisonResultElement = document.getElementById('variantImageScroller');
                comparisonResultElement.innerHTML = `<img src="${differentImage}" style="width:${setRes}px" class=""/>`;
            }
            //show the hide diff button
            document.getElementById('showDiff').classList.add("d-none");
            document.getElementById('hideDiff').classList.remove("d-none");
        } else {
            //show the normal sbnapshot image
            var comparisonResultElement = document.getElementById('variantImageScroller');
            comparisonResultElement.innerHTML = `<img src="${variantImage}" style="width:${setRes}px" class=""/>`;
            //show the show differences buttons
            document.getElementById('showDiff').classList.remove("d-none");
            document.getElementById('hideDiff').classList.add("d-none");
        }
  //  }
}