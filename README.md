# Card Creator

## Simple Card Creator Built With NextJS, TypeScript, Firebase & RTK Query

To run the application, make a .env.local file and place your Firebase configuration values inside the .env.local file, then install the npm packages with `npm install` and run the the application with `npm run dev`.

The title and description of the cards are stored in Firebase Firestore while the images are stored in Firebase Storage.

RTK Query is used to fetch data from the route handlers provided by NextJS which will in turn make a call to Firebase to receive the data.