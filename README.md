![Repo Size](https://img.shields.io/github/languages/code-size/JoshuaEngebretson/EZEats.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/JoshuaEngebretson/EZEats.svg?style=for-the-badge) ![FORKS](https://img.shields.io/github/forks/JoshuaEngebretson/EZEats.svg?style=for-the-badge&social) ![Stars](https://img.shields.io/github/stars/JoshuaEngebretson/EZEats.svg?style=for-the-badge)
    
# EZEats

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Acknowledgements](#acknowledgements)
- [Contacts](#contacts)
<!-- - [Usage](#usage) -->
<!-- - [Screenshots](#screenshots) -->

## Description

EZEats is a recipe application designed to simplify your meal planning and grocery shopping

Plan your weekly meals by choosing from the recipes that you have created.

Once you've selected your desired meals, EZEats takes charge of creating a comprehensive grocery shopping list tailored to your specific needs. No more manual list-building or last-minute trips to the store. 

<!-- ## Screenshots

<img src="" /> -->

## Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a><!-- 👈 JavaScript --><a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a><!-- 👈 React.js --><a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a><!-- 👈 Redux.js --><a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a><!-- 👈 Material-Ui --><a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" /></a><!-- 👈 Node.js --><a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a><!-- 👈 Postgres --><a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a><!-- 👈 CSS3 --><a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a><!-- 👈 HTML5 -->

## Getting Started

<!-- What do I need to do or know before attempting to use your project -->

### Prerequisites

- [Node.js](https://nodejs.org/en/)
    - This is for hosting the server and communicating with the database.
- [PostgreSQL](https://www.postgresql.org/)
    - This is used for hosting the database.
- [Postico](https://eggerapps.at/postico/v1.php)
    - This is used to set up your initial test database.

### Installation

1. Node Module
    1. Once Node is installed with the link located in the Prerequisites, you will need to perform the following command within your terminal `npm install`
        -  This will install the node_modules folder which includes the dependencies for the app.

2. Set up your database
    1. Using Postico, create a database titled `EZEats`.
    2. Use the database.sql file to enter your initial starting data into your database.

3. You will need to set up a .env file within the root of the project.
    1. Inside you will need to enter `SERVER_SESSION_SECRET=(your secret here)`
        -  I recommend a random string of characters

4. You will need two terminals to operate the app properly.
    1. The first you will run the command `npm run server`
        - This will host the server on [localhost:5000](http://localhost:5000/)
    2. The second you will run the command `npm run client`
        - This should open up your browser on [localhost:3000](http://localhost:3000/)

<!-- ## Usage

How do I use your project -->

## Acknowledgements

- Thanks to [Prime Digital Academy](www.primeacademy.io) who taught me what I needed to know to make this application a reality.
- Thanks to my wonderful partner, your support really helped me be able to get this app working. 

## Contacts

If you have suggestions or issues, please reach out to me via the following:

<a href="https://www.linkedin.com/in/joshua-engebretson"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>  <a href="mailto:joshua.engebretson@gmail.com"><img src=https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/email_me_button_icon_151852.svg /></a>