# Rover-Rover

# Table of Contents
[Overview](#overview)
[How to run](#live-demo)

## Overview
- I made Rover Rover for two reasons: First, I believe that your average person should have access to the cutting edge and meaningful data that exists in our world. When I found out that NASA maintains an API to expose this to the general public, I knew I wanted to make a project that consumes and displays that data. This NASA Mars rover data (and more) is maintained, is free, and was just floating around out there and that irked me. Hopefully this project makes it more accessible to the general public in a fun and intuitive way.
Second: I wanted to have a project that I built with React that I can keep coming back to and learning from. React is growing fast, and there are new features like Hooks, and new paradigms like Redux-Saga that I just hadn't gotten around to diving into yet. This project currently uses Redux-Saga and creating Rover Rover helped me get a deeper understanding of why Saga's are needed and how to use them. I also plan to revise this project so that it ditches class components and runs strictly on Hooks. 

## Live Demo
- The live demo can be viewed here: https://rover-rover-nasa.herokuapp.com/
- If you're interested in running the project locally, first clone this repo.
- Run `npm install` to install the related packages.
- Register for a NASA API key here: `https://api.nasa.gov/index.html#apply-for-an-api-key` and once you have your API key on hand you can move to the next step.
- Then, create an `env.sh` file in the root directory of the project and add this line `export REACT_APP_NASA_API_KEY='PLACEHOLDER';` and replace `PLACEHOLDER` with your Nasa API key.
- Save your env.sh file, and navigate to the root directory of your project in your terminal. 
- To run the project, in your terminal, run `source env.sh && cd src && npm run start`. A new window will open in your browser.

## Known issues / bugs

## Outlook / Trello Board
- Trello board: https://trello.com/b/C951j6s1/rover-rover
- Future major change: migrate to solely using React Hooks
