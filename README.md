# Admin Dashboard Frontend

Download or clone the code. cd into the directory, `/frontend`.

There, run

`npm install`

Once that is finished, you can start up the app by running

`npm start`


The app will not work, however, without the backend also installed and running.
See the [backend repository](https://github.com/Jakedalus/admin-dashboard-backend/tree/main) for the code and instructions there.

You'll need a database also, the Backend documentation has more info.

You will need to setup a `.env` file also with REACT_APP_SECRET with the secret key you used in the Backend to salt the hash of the bcrypt passwords (see Backend documentation
for more info).


## To run the E2E tests

To run the Cypress integration tests, the frontend and backend must both be running (see the Backend README for more details on 
running the backend). Once both have started, run

`npm run cypress:open`

Cypress will then open. Click the button that says "Run 1 integration spec" to start the tests in a browser.
