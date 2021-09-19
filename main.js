const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];
// From localQuotes
// const newQuote = function() {
//     //  Pick a random quote from apiQuotes array
//      const quote = localQuotes[Math.floor(Math.   random() * localQuotes.length)];
//     console.log(quote);
// }

// Show Loading
const showLoadingSpinner = function() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
const removeLoadingSpinner = function() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//  Show new Quote
const newQuote = function() {
    showLoadingSpinner();
    //  Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //  Check if Author field is blank and replace it with 'Unknown
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text
    removeLoadingSpinner();
}

// Get Quotes from API
const getQuotes = async function () {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        newQuote();
    } catch (err) {
        console.error(err);
    }
}

// Tweet Quote
const tweetQuote = function() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// On Load
getQuotes();


// newQuote();

// EvenListeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);