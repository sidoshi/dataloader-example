# TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

---

Run `yarn build` to build the project and then `node dist/index.js` to run the server. The server starts on port 5050. Use your favourite REST client to make a request to `localhost:5050`. The handler will then use a mock list of rates that contain `standardCodeId` and fetch each one on their own iteration. But using `dataloader` all those fetches will be batched and only a single request will be made.
