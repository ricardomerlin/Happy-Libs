# Happy Libs

HappyLibs is a fun and interactive game that was created based off of my memories of the MadLibs books I used to love as a child. HappyLibs allows users to create their own stories by filling out a form with various types of words (like nouns, verbs, and adjectives). The words are then inserted into a story template, creating a unique and often hilarious story.

## Features

- User-friendly form to input words
- Random story selection
- Inappropriate language filter
- Post custom default stories to a server that can be utilized by future users

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and npm installed on your machine. You can download them [here](https://nodejs.org/en/download/).

## Installation

To run the program on your machine:

1. Clone the repository:
```bash
git clone https://github.com/ricardomerlin/Happy-Libs
```

2. Navigate to the project directory:
```bash
cd Happy-Libs
```

3. Install necessary packages:
```bash
npm install
```

4. Start the application:
```bash
npm start
```

5. In a seperate terminal, start the JSON server:
```bash
json-server --watch db.json
```