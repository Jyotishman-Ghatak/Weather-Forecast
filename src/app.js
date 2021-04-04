const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast")

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const app = express();

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    name: "Jyotishman",
    title: "Welcome!!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Jyotishman",
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Jyotishman",
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.Address) {
    return res.send({
      error: "You must provide address"
    })
  }
  geocode(req.query.Address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      }
      )
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location: location,
        Address: req.query.Address
      })
    })
  })
  // res.send({
  //   forecast: "50",
  //   location: "Guwahati",
  //   Address: req.query.Address
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Jyotishman",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
    name: "Jyotishman",
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
