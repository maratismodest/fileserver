![banner](https://innoads.ru/icons/icon-512x512.png)

## Description

File Server

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# pm2
$ pm2 start npm -- start
```

```bash
pm2 start dist/main.js --name fileserver
pm2 startup systemd
pm2 save
```

## Author

- [@Marat Faizerakhmanov](https://www.github.com/maratismodest)