Simple Ionic/Angular app for tasks hangling

#To build the app

##Clone this repo
`git clone ...`

##Follow these steps to get a firebase project's config
`https://firebase.google.com/docs/web/setup`

##Create the firebase config file
Create the file in src/config/firebase.config.ts
Copy-paste your firebase configuration in this file like the following :

export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "tasks-XXXXXXXX.firebaseapp.com",
    databaseURL: "https://tasks-XXXXXXXX.firebaseio.com",
    projectId: "tasks-XXXXXXXX",
    storageBucket: "tasks-XXXXXXXX.appspot.com",
    messagingSenderId: "XXXXXXXXXXXX"
};

##In the project's directory
###Install the ionic cli
`npm install -g ionic`

###Install the dependencies
`npm install`

###Launch the app
`ionic serve`