
var onBtnClick = function (t, opts) {
  console.log('Someone clicked the button');
};

TrelloPowerUp.initialize({
  "card-buttons": function (t, options) {
    return [
      {
        icon: "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421",
        text: "McPercy",
        callback: function (t) {
          return t.popup({
            title: "McPercy",
            url: "form/",
          });
        },
      },
    ];
  },
});