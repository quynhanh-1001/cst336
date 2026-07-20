import { shuffle } from "fast-shuffle";
import { getTodaysQuote } from "success-motivational-quotes";
import fetch from 'node-fetch';

const quotes = (await import("success-motivational-quotes")).default;

async function displayQuoteFromWebAPI() {
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    
}

//const url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";

// try {
//     const response = await fetch(url);

//     if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//     }

//     const data = await response.json();

//     console.log(data);
// } catch (error) {
//     console.error("Error:", error.message);
// }

// let response = await fetch(url);
// let data = await response.json();
// console.log(data);


quotes.getTodaysQuote();

console.log(getTodaysQuote());

console.log("hello!");
let letters = ["a","b","c","d","e"];

const shuffLetters = shuffle(letters);
console.log(letters);
console.log(shuffLetters);

//function Expression
const displayQuote = () => {
    console.log(quotes.getTodaysQuote());
};

displayQuote();
// //function declaration
// function displayQuote() {
//     console.log(quotes.getTodaysQuote())
// }

