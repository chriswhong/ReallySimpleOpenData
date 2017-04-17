# ReallySimpleOpenData (RSOD)
A no-frills open data portal built with node, express,and mongodb.  

## Key Tenets
- You don't need expensive or complicated software to have an Open Data Portal
- "Bells and Whistles" on Open Data Portals tend to get in the way of raw data access
- Discoverability first, download second, utility *somewhere else*
- Link to the data "where it lies".  No need to host it all in the same place... host individual datasets where they are most useful and easiest to access
- RSOD is just a searchable metadata catalog.  That's it.  No mapping, charting, data APIs, databases, user accounts, etc... 
- Designed around the [data.json catalog standard](https://project-open-data.cio.gov/catalog/#machine-readable-format).  Think of this app as a data.json server.  
- Developed by Civic Hackers and Open Data Enthusiasts who want to give data publishers another open source option for publishing an Open Data catalog

## Vision
People who want to create a searchable, standards-compliant open data catalog should be able to get started in just a few minutes for free.

## Data
- All data are stored *elsewhere*.  The user can paste in a link and choose the correct resource type.
- One idea is to automate the use of third party services.  (put in your Amazon S3 key and RSOD will retain it and give you a UI for uploading files when you create a dataset.  Same for CartoDB, Github, generic FTP server, etc.  RSOD can act as broker for the upload, but never hosts the data itself.)

## Project Needs
- Node developers
- UI/UX Help
- Design Help

## Try it out - No guarantees at this point, it's very much in-progress
- Clone this repo `git clone https://github.com/chriswhong/ReallySimpleOpenData.git`
- Start MongoDB (`mongod` on a Mac)
- Install dependencies `npm install`
- Run reallysimpleopendata `npm start`
- Open `http://localhost:3000` in your browser
- Create a new user account and start adding datasets

### To populate with dummy data

- read `scripts/README.md` for configuration details on how to execute insert.js to populate the DB with datasets from Baltimore 


## License 
- This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

## Attribution
Latest incarnation is largely based on [https://github.com/madhums/node-express-mongoose-demo](https://github.com/madhums/node-express-mongoose-demo)

Catalog UI based on CKAN
