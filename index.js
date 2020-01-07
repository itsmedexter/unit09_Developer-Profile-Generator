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
var pdf = require("html-pdf");
var options = { format:"Letter"};


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
        return html

    
    }).then(function(html){
        pdf.create(html, options).toFile('./githubprofile.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
          });


        // var conversion = convertFactory({
        //     converterPath: convertFactory.converters.PDF
        //   });
           
        //   conversion({ html:html }, function(err, result) {
        //     if (err) {
        //         console.log('Our error occured')
        //       return console.error(err);
        //     }
          
        //     result.stream.pipe(fs.createWriteStream(path.join(__dirname, 'githubprofile.pdf')));
        //     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        //   });
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
                    <title>GitHub Profile Generator</title>
                    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
                
                    <style>
                    body {
                    font-family: 'Raleway', sans-serif;
                
                }
                
                .first-div {
                    position: relative;
                    margin: auto;
                    width: 600px;
                    height: 560px;
                    background: thistle;
                    border: 4px solid #696969;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                }
                .second-div {
                    margin-right: 10px;
                    position: absolute;
                    top: 360px;
                    left: 10px;
                    width: 250px;
                    height: 180px;
                    background-color: aquamarine;
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
                    width: 250px;
                    height: 180px;
                    background-color: aquamarine;
                    border: 4px solid white;
                    border-radius: 10px;
                    padding: 20px 20px;
                    text-align: center;
                }       
                
                a:link{
                    color: black;
                    text-decoration: none;
                }

                a:visited{
                    color: gray;
                    text-decoration: none;
                }

                a:hover {
                    color: orange;
                    text-decoration: none;
                }

                a:active {
                    color: black;
                    text-decoration: none;
                }
                    </style>
                </head>
                <body>
                 <div class="first-div"><img src="${userData.avatar_url}"><br><h2>Login: ${userData.login}</h2>
                 <p>Location: <a href="https://www.google.com/maps/place/${userData.location}">${userData.location}</a><br>Repositories: ${userData.public_repos}</p>

                <div class="second-div">
                    <p>Followers: ${userData.followers}<br><br>
                    Following: ${userData.following}<br><br>
                    Stars: ${userData.starred}</p>
                </div>
                <div class="third-div"><p>Link to: <a href="${userData.html_url}">Github Profile</a> <br><br>
                Link to: <a href="${userData.blog}">Blog</a> <br></p>
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



