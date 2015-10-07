# ReallySimpleOpenData (RSOD)
A no-frills open data portal built with node, express, mongodb and angular.  

## Key Tenets
- You don't need expensive or complicated software to have an Open Data Portal
- "Bells and Whistles" on Open Data Portals tend to get in the way of raw data access
- Discoverability first, download second, utility *somewhere else*
- Link to the data "where it lies".  No need to host it all in the same place... host individual datasets where they are most useful and easiest to access
- RSOD is just a searchable metadata catalog.  That's it.  No mapping, charting, data APIs, databases, user accounts, etc... 
- Designed around the [data.json catalog standard](https://project-open-data.cio.gov/catalog/#machine-readable-format).  
- Built on a modern stack - MEAN - MongoDB, Express.js, Angular.js, Node.js - Full Stack javascript FTW
- Developed by Civic Hackers and Open Data Enthusiasts who want to give data publishers another open source option for Open Data

## Vision
People who want to create a searchable, standards-compliant open data catalog should be able to do so in just a few minutes.  RSOD is a multi-tenant web app that will have a custom subdomain for each open data portal. ({myorg}.reallysimpleopendata.com)
RSOD is a simple catalog UI and metadata store, all of the data will be hosted externally.


## Architecture
- Each portal's catalog data is stored in MongoDB in the same structure as data.json. [Here's some info on data.json ](https://project-open-data.cio.gov/v1.1/api/)  
- The frontend consumes a valid data.json endpoint.
- Angular loads the entire data.json file once.  All searching & filtering are done in the browser. No server side rendering, no pagination.  This may be more difficult as a catalog grows.
- The admin can choose to upload data files to the server, or link to existing files elsewhere on the web.
- Layout based on [CKAN](http://ckan.org/) catalog

##Data
- Data will be stored elsewhere.  The user can paste in a link and choose the correct resource type.
- One idea is to eautomate the use of third party services.  (put in your Amazon S3 key and RSOD will retain it and give you a UI for uploading files when you create a dataset.  Same for CartoDB, Github, generic FTP server, etc.  RSOD can act as broker for the upload, but never hosts the data itself.)

##API
Root URL:`http://{myorg}.reallysimpleopendata.com`

`/data.json OR /datasets`
Gets the dataset as an array of objects for the current subdomain

#CRUD 
 `POST /dataset` Create new dataset 
 `GET /dataset/:id` Get one dataset
 `PUT /dataset/:id` Update dataset
 `DELETE /dataset/:id` Delete dataset

##Login
There is one login and password for each domain, this user will have the ability to create, update, and delete datasets.

## Project Needs
- Node developers
- UI/UX Help
- Design Help

## How to Deploy
- Coming soon, this project is still in development.  Please feel free to contribute!

## License 
- This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

![Screengrab from 3/22/2015](https://www.evernote.com/shard/s288/sh/20e054d9-7be1-45d4-ba91-1f4ef8ff9c99/0e7c0b2642bb84c54120d71d6bd03abf/res/361e3f67-8776-4af1-beac-323fad687799/skitch.png?resizeSmall&width=832)
