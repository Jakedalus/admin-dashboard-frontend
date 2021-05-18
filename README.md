# Admin Dashboard Frontend

## Setup

Download or clone the code. cd into the directory, `/admin-dashboard-frontend`.

There, run

`npm install`

You'll need a database also, the Backend documentation has more info.

If you do not have the included `.env` file, you will need to setup a `.env` file also with REACT_APP_SECRET with the secret key you used in the Backend to salt the hash of the bcrypt passwords (see Backend documentation
for more info).


Once that is finished, you can start up the app by running

`npm start`

The app will not work, however, without the backend also installed and running.
See the [backend repository](https://github.com/Jakedalus/admin-dashboard-backend/tree/main) for the code and instructions there.


## To run the E2E tests

To run the Cypress integration tests, the frontend and backend must both be running (see the Backend README for more details on running the backend, it must be run in test mode). Once both have started, run

`npm run cypress:open`

Cypress will then open. Click the button that says "Run 1 integration spec" to start the tests in the browser.


## Description

The frontend is a React app which also uses Redux and React-Router. Redux with its actions/reducers handle interacting with the backend. The Router implements the various views: the Course and User pages, which list all the courses and users, and the individual course and user pages for each item. 

As stated in the backend README, the users in this case are all admins. It would be ideal to implement views for teacher and student signups, or for creation by admins. A future version of the app would also allow for **taking** the courses, not just creating them, by Student users for example. Implementing the UX for various courses/lessons and a variety of lessons was unfortunately outside the scope of this project I feel.