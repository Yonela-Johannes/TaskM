# TourAxis NodeJS Assignment

## Purpose
This is a test designed to be open-ended and non-prescriptive.
It's to gain insight to my individual abilities and what I consider significant in my work.
With an understanding and an appreciation that developers posses diverse set of skills and talents, each with our own unique toolbox.

&nbsp;

## Overview

A simple NodeJS restfull application that manages users and tasks for those users.

&nbsp;

##  Requirements:

- Only Rest endpoints - No UI
- Application should be able to CRUD user via REST
- Application should be able to CRUD task for user via REST
- Data must be persisted to a storage mechanism (Mongo or Mysql)
- (If required) user migration to setup database

&nbsp;

##  Bonus Requirements:

- Setup a scheduled job to check all tasks in the database that have a status of "pending" and next_execute_date_time has passed - print it to the console  and update the task to done.

&nbsp;

##  Tools Requirements:

- Node.js version 18 or above.
- npm version 10.2.3.
- MongoDB Atlas
- Text Editor or IDE
- Git
- Postman (Optional)

&nbsp;

## Technologies Used:

1. TypeScript & JavaScript
2. NodeJs (Node version 18 or above)
3. ExpressJs
4. MongoDB (Database)

&nbsp;

## Features Include (Client side):

1. User Account - Create/Read/Update/Delete
2. User task - Create/Read/Update/Delete

&nbsp;

# Server Setup

## Environment variables
First, create the environment variables file `.env` in the server folder. The `.env` file contains the following environment variables:

- MONGODB_URL = `your MongoDB URL`
- PORT = `8800` or any port number

&nbsp;

## Steps to run server

1. Open the project in any editor of choice.
2. Run `npm i` to install the packages.
3. Run `npm start` to start the server.

If configured correctly, you should see a message indicating that the server is running successfully and `Database Connected`.

&nbsp;

## For more details, Contact:

- Email: johannesyonelae@gmail.com
