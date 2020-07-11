This is a self hosted app with a chat, notes, todos, shopping list and a watch list, written in React and Typescript.

All registered users under one instance get all the data. To separate the users, create another Firebase project, set the credentials and deploy to another server (or use locally).

Use the chat shortcuts, to directly create notes or todos, add to shopping and to watch list.
- T: Add a todo
- N: Add a note
- S: Add to shopping list
- W: Add to watchlist

There is no backend to it, all values go directly from the React app to Firebase Realtime database.

### Self hosting

- Register on firebase
- Create a new project
- Get the credentials:
  - api key
  - auth domain
  - database url
  - project id
  - storage bucket
- Rename `env` to `.env` and insert the values.

### Accounts and registrations

Use the env variable REACT_APP_DISABLE_REGISTRATIONS to enable/disable registrations. On first run, create your accounts and set this variable to disable all future registrations.

### Design

Design by [https://magicadimitrova.com/](https://magicadimitrova.com/)

Edit the variables in `src/variables.scss` to create a custom theme.

### Install dependencies

`yarn`

### Start the app

`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

