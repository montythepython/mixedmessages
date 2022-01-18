document.addEventListener('DOMContentLoaded', function() {

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    window.scrollTo(0,150);
  }

  const checkWord = () => {
    try {
      let textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
      let textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string
   console.log(textInputValueLowerCase);
      if (textInputValue != ""){ //checking if text was entered
        addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
        if (textInputValueLowerCase.substr(0,5) == "open ") { //if the first 5 characters = open + space
          openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5) + ".com");
          addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + ".com</b>" + " should be opened now.</i>");
        } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
          openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
          addTextToResults("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
        } else if (textInputValueLowerCase.substr(0,7) == "google ") {
          openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
          addTextToResults("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
        } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
          openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
          addTextToResults("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
        } else{
          clearInput();
        }
      };   
    } catch (e) {
      console.error('script yielded an error: ' + e);
      console.log(e);
    };
  };  

  // Add text to the results div
  const addTextToResults = (textToAdd) => {
    document.getElementById('terminalResultsCont').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  };

  // Scroll to the bottom of the results div
  const scrollToBottomOfResults = () => {
    let terminalResultsDiv = document.getElementById('terminalResultsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }  

  // Opening links in a new window
  const openLinkInNewWindow = (linkToOpen) => {
    window.open(linkToOpen, '_blank');
    clearInput();
  };

  // Clear text input
  const clearInput = () => {
    document.getElementById('terminalTextInput').value = "";
  };

})