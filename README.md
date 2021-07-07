# ![Scale-Up Velocity](./readme-files/logo-main.png) Final 1 - URL shortner 📎

In this project, i built [URL shortener](https://en.wikipedia.org/wiki/URL_shortening) web application. The user passes any url that he would like to make it shorter and the app return the URL Shortener with the numbers of shorter url redirections. Also, to make the use of the web easier i added a copy shorter url button. the makes it 


## backend
* [GET] `/` - Serving the client file.
* I created a route `/api/shorturl/` in your express app that handling all url shortening requests:
- [GET] `/:id` - The `id` is the URL shortener id and if the id is valid it redirects you to the original url the user asked for, else it will returns you a status code 404 with error message. 
- [POST] `/` - The saving url method in the DB.


## client 
The frontend folder divied to three parts:
- `index.html` - The actual UI.
- `main.js` - The functionality of the app.
- `public` folder - css file and favicon.

## Database
- My database is actualy JSON file, i work `fs` npm package that save and read all the data directly to and from this file.
- I used a `class DataBase{}` to read/write all data in your back-end 

## repl.it Deployment
page => https://shorterurl.erezkatsman.repl.co/
repo => https://repl.it/@ErezKatsman/ShorterURL#frontend/public/style.css
