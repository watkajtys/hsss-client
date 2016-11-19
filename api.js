'use strict';

const express    = require('express');
const bodyParser = require('body-parser');

function getModel() {
  return require('./model-cloudsql.js');
}

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

/**
 * GET /api/sessions
 *
 * Retrieve a page of sessions
 */
// router.get('/', (req, res, next) => {
//   getModel().list(10, req.query.pageToken, (err, entities, cursor) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.json({
//       items: entities,
//       nextPageToken: cursor
//     });
//   });
// });

/**
 * POST /api/sessions
 *
 * Create a new session.
 */
router.post('/', (req, res, next) => {
  console.log(req.body, 'da body');
  getModel().create(req.body, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * GET /api/sessions/:id
 *
 * Retrieve a session.
 */
router.get('/:session', (req, res, next) => {
  getModel().read(req.params.session, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * PUT /api/sessions/:id
 *
 * Update a session.
 */
router.put('/:session', (req, res, next) => {
  getModel().update(req.params.session, req.body, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * DELETE /api/sessions/:id
 *
 * Delete a session.
 */
router.delete('/:session', (req, res, next) => {
  getModel().delete(req.params.session, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.status(200).send('OK');
  });
});

/**
 * Errors on "/api/sessions/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message      : err.message,
    internalCode : err.code
  };
  next(err);
});

module.exports = router;
