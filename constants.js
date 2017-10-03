module.exports = {
  forums: 'https://forums.interpretame.com',
  getUser: function() {
    if (typeof window === 'undefined') return {
      im: {
        role: 0
      }
    };
    var request = new XMLHttpRequest();
    request.open('GET', '/me', false);  // `false` makes the request synchronous
    request.withCredentials = true; //adding credentials
    request.send(null);
    if (request.status === 200) return JSON.parse(request.responseText);
  },
  searchInArray: function(keyName, value, myArray) {
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i][keyName] === value) return myArray[i];
      }
  },
  capitalize: function(word) {
    return word.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  }
};
