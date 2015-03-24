# ReallySimpleOpenData (RSOD)
A no-frills open data portal built with node, express, mongodb and angular.  
Development site is live at [http://rsod.herokuapp.com](http://rsod.herokuapp.com)

## Key Tenets
- You don't need expensive or complicated software to have an Open Data Portal
- RSOD is just a searchable metadata catalog.  That's it.  No mapping, charting, APIs, databases, user accounts, etc... 
- Designed around the [data.json catalog standard](https://project-open-data.cio.gov/catalog/#machine-readable-format).  
- Built on a modern stack - MEAN - MongoDB, Express.js, Angular.js, Node.js - Full Stack javascript FTW
- Bootstrap 3 for a responsive-first layout
- Developed by Civic Hackers and Open Data Enthusiasts who want to give data publishers another open source option for Open Data

## KISS
- Catalog Data is stored in exactly the same structure as a valid data.json file in a single MongoDB collection
- The frontend consumes a valid data.json endpoint (so it's automatically exposed for anyone who wants to consume it elsewhere)
- Just 2 environment variables are required: a *MongoDB URI* and an *admin password*
- RSOD is a single-page app.  
- Angular loads the entire data.json file once.  All searching & filtering are done in the browser. No server side rendering.
- The admin can choose to upload data files to the server, or link to existing files elsewhere on the web.
- Layout based on [CKAN](http://ckan.org/) catalog

## How to Deploy
- Coming soon, this project is still in development.  Please feel free to contribute!

## License 
- This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

![Screengrab from 3/22/2015](https://www.evernote.com/shard/s288/sh/20e054d9-7be1-45d4-ba91-1f4ef8ff9c99/0e7c0b2642bb84c54120d71d6bd03abf/res/361e3f67-8776-4af1-beac-323fad687799/skitch.png?resizeSmall&width=832)
