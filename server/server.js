const express = require("express");

const app = express();
const fs = require("fs");

app.use(express.json());

const path = "./data.json";
const tickets = JSON.parse(fs.readFileSync(path));

function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

app.all("*", checkHttps)

app.get("/api/tickets", (req, res) => {
  let tickets = JSON.parse(fs.readFileSync(path));
  let searchWord = req.query.searchText;
  let regex = new RegExp(searchWord, 'i');
  let outcome = tickets.filter(ticket => regex.test(ticket.title));
  res.send(outcome);
});

app.post('/api/tickets/:ticketId/done', (req, res) => {
  let id = req.params.ticketId;
  let tickets = JSON.parse(fs.readFileSync(path));
  let ticket = tickets.find(ticket => ticket.id === id);
  ticket.done = true;
  fs.writeFileSync("data.json", JSON.stringify(tickets));
});

app.post('/api/tickets/:ticketId/undone', (req, res) => {
  let id = req.params.ticketId;
  let tickets = JSON.parse(fs.readFileSync(path));
  let ticket = tickets.find(ticket => ticket.id === id);
  ticket.done = false;
  fs.writeFileSync("data.json", JSON.stringify(tickets));
});

let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});

module.exports = app;