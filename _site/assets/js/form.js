var t = TrelloPowerUp.iframe();

window.estimate.addEventListener("submit", function (event) {
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t
    .set("card", "shared", "trelloform", "yay")
    .then(function () {
      t.closePopup();
    });
});

t.render(function () {
  t.sizeTo("#trelloform").done();
});

//get id of the card
//curl --request GET --url 'https://api.trello.com/1/cards/aBFTnUXw/pluginData?key=c86b743cedafad2bf66b12783fa21a36&token=ATTA2335ae7825ebbc5f622cfb249cd57b8e8df58cf251b53f0fb0611f6f0916ba4a234FB042'
