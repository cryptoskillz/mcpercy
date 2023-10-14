var t = TrelloPowerUp.iframe();

window.trelloform.addEventListener("submit", function(event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    var commentText = 'This is a comment to update the activity log.';
  var cardId = t.getContext().card;
console.log(cardId)
console.log(t)
    return t
        .set("card", "shared", "comments", "yay")
        .then(function() {
            t.closePopup();
        });
    /*
      t
        .set('card', 'shared', 'comment', commentText)
        .then(function () {
          console.log('Comment added successfully');
        })
        .catch(function (error) {
          console.error('Error adding comment:', error);
        });
    /*
      t
        .card('id', 'name')  // Add any other fields you need
        .then(function(card) {
          return t
            .set(card.id, 'shared', 'comment', commentText)
            .then(function () {
              console.log('Comment added successfully');
            })
            .catch(function (error) {
              console.error('Error adding comment:', error);
            });
        });
        //return t.closePopup();
        
        return t
          .set("card", "shared", "trelloform", "yay")
          .then(function () {
            t.closePopup();
          });
          )*/
});


t.render(function() {
    t.sizeTo("#trelloform").done();
});

/*
curl --request POST \
  --url 'https://api.trello.com/1/cards/aBFTnUXw/actions/comments?text={text}&key=c86b743cedafad2bf66b12783fa21a36&token=ATTA2335ae7825ebbc5f622cfb249cd57b8e8df58cf251b53f0fb0611f6f0916ba4a234FB042' \
  --header 'Accept: application/json'

get the data to check
curl --request GET --url 'https://api.trello.com/1/cards/aBFTnUXw/pluginData?key=c86b743cedafad2bf66b12783fa21a36&token=ATTA2335ae7825ebbc5f622cfb249cd57b8e8df58cf251b53f0fb0611f6f0916ba4a234FB042'
*/