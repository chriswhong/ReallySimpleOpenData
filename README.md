# ReallySimpleOpenData (RSOD)
A no-frills open data portal built with node, express, mongodb and angular

## Key Tenets
- You don't need expensive or complicated software to have an Open Data Portal
- RSOD is just a searchable catalog.  That's it.  No mapping, charting, APIs, databases, user accounts, etc... 
- Designed around the [data.json catalog standard](https://project-open-data.cio.gov/catalog/#machine-readable-format).  
- Built on a modern stack - MEAN - MongoDB, Express.js, Angular.js, Node.js - Full Stack javascript FTW
- Developed by Civic Hackers and Open Data Enthusiasts who want to give data publishers another open source option for Open Data

## Keep It Simple
- Data is stored in exactly the same structure as a valid data.json file in a single MongoDB collection
- The frontend consumes a valid data.json endpoint (so it's automatically exposed for anyone who wants to consume it elsewhere)
- Just 2 environment variables are required: a MongoDB URI and an admin password
- 

## How to Deploy
- This project is still in development.  Please feel free to contribute!

## License 
- This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
