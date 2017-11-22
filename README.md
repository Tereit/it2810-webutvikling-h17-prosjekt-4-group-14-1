# Project Description  

## Introduction  

In this project, we have built a music-search-engine with Angular 5. It searches a local database for artists, and if there are no results, it searches lastFM and stores the results in our own database. By doing this, the user will help us build the database to contain queries that are frequently searched for.

The front page consists of three playlist covers that each will direct you to a new page that shows top 50 songs. The front page also has a navbar that will direct you to a search page, log in and a word cloud.

The search page has a search input field where you can search for artists. It will first appear at most 15 results, and we have used infinite scroll to retrieve more results. The results can be sorted by artists alphabetically, or by popularity. Also, you can filter by the artists’ genre and a minimum popularity.

The results from the playlist pages and the search page can be clicked and a pop-up window will show more information about the song/artist.

Our “fancy view” is a word cloud that shows the artists in our database and ranks them based on their popularity on LastFM.

Our system also has the opportunity to create a user and log in. By doing this, our search-engine will remember the user’s latest search.


**Further information on how we solved the project requirements can be found in [here](Documentation.pdf)**

**A documentation of our architecture can be found [here](Architecture.md)**


# Instructions (how to open our site)  
**There is a known bug where the app opens a new tab the first time the navbar is used.**
If you don't have angular/cli installed, enter the following into your terminal `npm i -g @angular/cli` and hit enter.
Once this is done, run `npm install` and wait for the process to finish.

Make sure you have mongodb installed on your computer, if not, please refer to https://docs.mongodb.com/manual/installation/#tutorials in order to install it on your operating system.

Once everything is installed and mongodb is running on your machine, type `ng build` to build the project. This might take some time, so just be patient :). When finished, type `node servjer.js` to start the application. Now the app is available on http://localhost:8084.
