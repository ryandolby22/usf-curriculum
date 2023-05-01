const express = require('express');
const axios = require('axios');
const router = new express.Router();
const ExpressError = require('../expressError');

/** GET LIST OF USERS FROM ARRAY */
router.post('/', async (req, res, next) => {
  try {
    if (req.body.developers.length == 0)
      throw new ExpressError('usernames are required', 400);

    let results = await Promise.all(
      req.body.developers.map(d => {
        return axios.get(`https://api.github.com/users/${d}`);
      })
    );
    let output = results.map(r => {
      return { name: r.data.name, bio: r.data.bio };
    });
    return res.json(output);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;