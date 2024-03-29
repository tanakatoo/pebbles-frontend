# Community for learning Japanese and living in Japan
This is a bilingual app connects English speakers living in Japan to each other to share resources, and Japanese people living overseas to connect with each other and share resources. There are 4 areas of the community the users can access: the Study Buddy Board for users to find other users to study together or do a language exchange; the Regional Information Center to get resources and join groups for a certain region in Japan; the Japanese Town to join groups about studying the Japanese language, and for users to ask/answer questions related to the Japanese language; and the Marketplace for users to offer/buy/sell items as leaving a country creates lots of hand-me-downs that future expats can make use of.  
  
Currently users are able to create an account, set up their profile and access the Study Buddy Board to message or save users.

## About the app

This is a React app that uses Redux, Tailwind CSS, Formik, headless UI to create a site that can be used by both Japanese users and English speaking users with an custom translation component.

## APIs

2 external APIs are used and you will need an account for the functionality to work -The Google places API for autocompleting the location information in both English and Japanese; and Zeptomail for sending emails regarding lost passwords, and registration. Make a .env file with your credentials along with the following variables:  

SECRET_KEY =yoursecretkey  
NODE_ENV= dev  
DATABASE_URL= pebbles  
DOMAIN_URL=localhost:3000  
GOOGLE_API_KEY= yourapikey  
ZEPTO_MAIL_API_KEY=yourapikey

## Setting up the App

You will need to clone both pebbles-frontend and pebbles-backend. The system runs on Postgres. To create the database, run psql < pebbles.sql from the root directory of pebbles-backend. 


## Testing

Backend testing was completed on all routes and models using jest. Frontend testing was completed for all views using RTL and jest.

## Deployment

The site is deployed at http://www.pebblescommunity.com using Render.com for the backend, surge for the frontend, and ElephantSQL for PostgreSQL. It might be slow due to using the free tier, so please be patient!
