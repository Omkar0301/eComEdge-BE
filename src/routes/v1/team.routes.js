const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/v1/team.controller');
const validate = require('../../middlewares/validation');
const teamValidation = require('../../validations/team.validation');
const { uploadSingleImage } = require('../../middlewares/multer');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(teamController.getAllTeams)
  .post(
    auth('admin'),
    uploadSingleImage('team'),
    validate(teamValidation.createTeam),
    teamController.createTeam
  );

router
  .route('/:id')
  .get(validate(teamValidation.getTeam), teamController.getTeam)
  .patch(
    auth('admin'),
    uploadSingleImage('team'),
    validate(teamValidation.updateTeam),
    teamController.updateTeam
  )
  .delete(auth('admin'), validate(teamValidation.deleteTeam), teamController.deleteTeam);

module.exports = router;
