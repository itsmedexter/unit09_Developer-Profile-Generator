// 


// use axios to make an api request for owner, repo names, starring  to github: 
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
          
            result.stream.pipe(fs.createWriteStream(path.join(__dirname, 'fakeData.pdf')));
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
                <div>
                    <p><img src="${userData.avatar_url}"><br>
                    Login: ${userData.login}<br>
                    Repositories: ${userData.public_repos}<br>
                    Followers: ${userData.followers}<br>
                    Following: ${userData.following}<br>
                    Stars: ${userData.stars}<br>
                    Github Profile: ${userData.html_url}<br>
                    Blog: ${userData.blog}<br>
                    </p>
                    
                </div>
                `
                // make html doc within the return and use the generatedHTML.js to use styles. sample above.
                // Repositories: ${userData.repo.name}<br>

}




