// notes
// use axios to make an api request for owner, repo names, starring  to github (code from class activity 33 used "axios"): 
// GET /users/:username
// git avatar: GET /user/:username/avatar_url
// git repository: GET /user/repos
// git followers: GET /users/:username/followers
// git starring: GET /repos/:owner/:repo/stargazers
// git following: GET /users/:username/following

// links to:
// user location: npm install google-locations?
// User github profile: GET /users/:username/html_url
// user blog: GET /users/:username/blog

// while waiting on user data from api, function to create a html document is created with specific parameters from GitHub to be placed on page.

// Get a better understanding on promis, and callbacks .then, error result



const questions = [
  
];

function writeToFile(data) {
    fs.writeFileSync('generatedHtml.html', data);
}

// function init() {
// }

// init();




// _____sample using axios to get repo from github_____ 
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertFactory = require('electron-html-to');
const path = require('path');


inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username",
    validate: function(response) {
        return response.length > 0;
    }
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
        var html = generateHtml(res.data);
        console.log(html);
        writeToFile(html);
        const conversion = convertFactory({
            converterPath: convertFactory.converters.PDF
          });
           
          conversion({ html }, function(err, result) {
            if (err) {
                console.log('Our error occured')
              return console.error(err);
            }
          
            result.stream.pipe(fs.createWriteStream(path.join(__dirname, 'githubprofile.pdf')));
            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
          });
    }).catch(function(err){
        if(err) {
            console.log('User not found')
        }
    });
   });

function generateHtml(userData) {
    console.log(userData)
    /* 
    1. Write out ehtml as a regular strnig using concatenation to incorporate variables - simple, until alot of code then sort of hard to understand
    2. Same as above but use template strings from es6 which allows for interpolation of variables and supports multi-line strings which allows code to be written in same manner as regular html andis miych more readable
    3. use VJS to create elements and use API to create the html
    4. same as above but user JQuery
    */

    return `
                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
                
                    <style>
                    body {
                    font-family: 'Raleway', sans-serif;
                
                }
                
                .first-div {
                    position: relative;
                    margin: auto;
                    width: 600px;
                    height: 600px;
                    background-color: lightgray;
                    border: 4px solid gray;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                }
                .second-div {
                    margin-right: 10px;
                    position: absolute;
                    top: 360px;
                    left: 10px;
                    float: left;
                    width: 250px;
                    height: 220px;
                    background-color: lightgray;
                    border: 4px solid white;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                }    
                .third-div {
                    margin-left: 10px;
                    position: absolute;
                    top: 360px;
                    left: 320px;
                    float: left;
                    width: 250px;
                    height: 220px;
                    background-color: lightgray;
                    border: 4px solid white;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                }       
                    
                    </style>
                </head>
                <body>
                 <div class="first-div"><img src="${userData.avatar_url}"><br><h2><strong>Login:</strong> ${userData.login}</h2>
                 <p><strong>Repositories:</strong> ${userData.public_repos}</p>
                <div class="second-div">
                    <p><strong>Followers:</strong> ${userData.followers}<br>
                    <strong>Following:</strong> ${userData.following}<br>
                    <strong>Stars:</strong> ${userData.stars}</p>
                </div>
                <div class="third-div"><strong>Github Profile:</strong> ${userData.html_url}<br>
                <strong>Blog:</strong> ${userData.blog}<br></p>
                </div>
                </div>
                </body>




                `
                // make html doc within the return and use the generatedHTML.js to use styles. sample above.
                // Repositories: ${userData.repo.name}<br>

}

{/* <div>
                    <p><img src="${userData.avatar_url}"><br>
                    Login: ${userData.login}<br>
                    Repositories: ${userData.public_repos}<br>
                    Followers: ${userData.followers}<br>
                    Following: ${userData.following}<br>
                    Stars: ${userData.stars}<br>
                    Github Profile: ${userData.html_url}<br>
                    Blog: ${userData.blog}<br>
                    </p>
                    
                </div> */}



