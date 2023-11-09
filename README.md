# React quiz app

React SPA that lets the player to take a small React quiz.

## Features

- The quiz of 15 questions;
- Progress bar that displays current auestion number and amount of points received;
- Finished game screen with the high score and option to restart the game;
- The timer that finishes the game when expires;

## Details

- Questions are fetched from fake API using json-server (Must run "npm run server" for quiz to work);
- useReducer hook is used to store and update the state;
- Initially the number of seconds is calculated based on number of questions;
- Seconds are reduced via useInterval function, game is finished when seconds reach zero;
