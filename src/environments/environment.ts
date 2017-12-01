// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDi08iX0ejPj9OZt-dhLF0ZNmdi6yKHA1I",
    authDomain: "ng2-testapp.firebaseapp.com",
    databaseURL: "https://ng2-testapp.firebaseio.com",
    projectId: "ng2-testapp",
    storageBucket: "ng2-testapp.appspot.com",
    messagingSenderId: "1075481487844"
  }
};
