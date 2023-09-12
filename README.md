<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs, Tailwind CSS
</p>

## clone or download
```terminal
$ git clone https://github.com/kumarshivam01/photo-search
$ yarn # or npm i
```

## project structure
```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check)
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally

```

## Server-side usage(PORT: 8080)

run the script at the first level:

(You need to add a MONGO_URL in .env to connect to MongoDB)


### Start

```terminal
$ cd server   // go to gallery folder
$ npm i       // npm install packages
$ npm run dev // run it locally
```

