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
      if (textInputValue != ""){ //checking if text was entered
        addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
        if (textInputValueLowerCase.substr(0,4) == "help") { //if the first 4 characters = help
          postHelpList();
          clearInput();
          return;
        }    
        if (textInputValueLowerCase.substr(0,7) == "message") { //if the first 4 characters = help
          messageGenerator();
          clearInput();
          return;
        }            
        if (textInputValueLowerCase.substr(0,5) == "open ") { //if the first 5 characters = open + space
          openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5) );
          addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
          return;
        } 
        if (textInputValueLowerCase.substr(0,8) == "youtube ") {
          openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
          addTextToResults("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
          return;
        } 
        if (textInputValueLowerCase.substr(0,7) == "google ") {
          openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
          addTextToResults("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
          return;
        } 
        if (textInputValueLowerCase.substr(0,5) == "wiki "){
          openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
          addTextToResults("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
          return;
        } else {
            postHelpList();
            clearInput();
            return;
        }
      };     
    } catch (e) {
      console.error('script yielded an error: ' + e);
      console.log(e);
    };
  }; 
  
  // Generate random message
  const messageGenerator = () => {
    const quotes = {
      adams: ["adam1", "adam2"],
      bukowski: ["buk1", "buk2"],
      napoleon: ["nap1", "nap2"]
    };

    const authors = Object.keys(quotes);
    const randomAuthorIndex = Math.floor(Math.random() * authors.length);
    const randomAuthor = authors[randomAuthorIndex];
    const randomQuoteIndex = Math.floor(Math.random() * quotes[randomAuthor].length);
    const randomQuote = quotes[randomAuthor][randomQuoteIndex]

    addTextToResults(randomQuote);
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

  // Getting the list of keywords for help & posting it to the screen
  const postHelpList = () => {
    // Array of all the help keywords
    const helpKeyWords = [
      "Try one of the following:",
      "- Message to get a random quote",
      "- Open + website URL to open it in the browser (ex. open webdevtrick.com)",
      "- Google + keyword to search directly in Google (ex. google web development)",
      "- YouTube + keyword to search directly in YouTube (ex. Technical Freaks)",
      "- Wiki + keyword to search directly in Wikipedia (ex. wiki numbers)",
    ].join('<br>');
    addTextToResults(helpKeyWords);
  };  

})