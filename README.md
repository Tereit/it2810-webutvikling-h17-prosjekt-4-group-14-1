# Project Description  

***

## Introduction  

In this project, we will be building a music-search-engine. It will search a local database for artists or songs, and if there are no results, it will search lastFM and store the results in our own database. By doing this, the user will help us build the database to contain queries that are frequently searched for.  

## Architecture  

For a detailed description of how components work, please check the wiki.  

#### Frontend  
The application will be built in Angular v4, running on a nodeJS server. Components are styled using Bootstrap 4.  

#### Backend  
The backend will be based on NodeJS and Express4. We use mongoDB as our database, along with mongoose to make searching easy. There were some problems connecting mongoose directly to angular, so we are creating an API to access the CRUD operations.
The search functionality and lastFM integration will also be built on the backend server.  

## Data  
Data for the database are artist and song objects. These will be gathered from lastFM, and stored locally.  

## Search feature  
At the core of the website is our search-function. It will be the first thing the users encounter when they open our website. By using it, the user searches both our own database and lastFMs database.  

#### Filters  
Since the webiste searches for both artists and songs, the user will have the ability to filter the results for either aritsts, songs or both.  

## Planned Design  
The frontpage will consist of two elements; a search field and a view of pre made playlists. If the user clicks on one of the playlists, he/she will be redirected to a page containing the playlist.  
If the user decides to search for something, the results will appear underneath the search field. There will also be options to filter and sort the results.
