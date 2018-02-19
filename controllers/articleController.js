const db = require("../models");
const request = require("request");
// Defining methods for the articleController
module.exports = {
  findAll: function (req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  scrape: function (req, res) {
    const apikey = process.env.NYTIMES_API_KEY;
    const query = req.body.query;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json`
    request.get({
      url: url,
      qs: {
        'api-key': apikey,
        'q': query
      },
    }, function(err, response, body) {
      body = JSON.parse(body);
      res.json(body.response.docs);
    })
  }
};
