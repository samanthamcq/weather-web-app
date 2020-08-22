# Weather App using MEAN stack and Angular 8

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2. The backend uses ExpressJS web application framework.

**This project uses:**
- Mongoose.js (MongoDB) : database
- Express.js : backend framework
- Angular 8 : frontend framework
- Node.js : runtime environment

**Other tools and technologies used:**
- Angular CLI : frontend scaffolding
- Bootstrap 4 : CSS framework
- Font Awesome : icons

## Description

This application demonstrates how to use MEAN stack with Angular 8 framework. The weather application features a current day weather forecast and a next 5 day forecast. 

Users can create an account and login with their email address. Password authentication is not implemented.

Users can search for weather forecast for any cities in the world and save it to their profile.

## Live

The application is currently running on Heroku and  MongoDB Atlas. Follow the link below to check it out.

https://quiet-tor-23525.herokuapp.com


## Weather API

The application uses [OpenWeatherMap](https://openweathermap.org/) api. The OpenWeatherMap is free, fast and easy to use api. Data is available in JSON format. We can access current weather data for any location in the world. It also offers a 5 day weather forecast. You can call api by city name, or zip code.
 
## Prerequisites

You should already have the following installed on your machine.
- Node.js 
- NPM 
- MongoDB
 
## Install
Download or clone this repository. 

To install the dependencies, run this in the application folder from the command-line:

`$ npm install`

## Development server
Start the mongodb server using the following command :

`$ mongod --dbpath <specify data directory>`

Run a backend server :

`$ node server.js` or 

`$ nodemon server.js`

Run a frontend server :

`$ ng serve`

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Screenshots

![Alt text](/src/assets/images/login.png?raw=true "Login Screen")

![Alt text](/src/assets/images/weatherlist.png?raw=true "List of weather forecasts of cities")

![Alt text](/src/assets/images/weatherdetail.png?raw=true "Detail of weather forcast of a city")
