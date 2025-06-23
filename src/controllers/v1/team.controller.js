const { status } = require('http-status');
const teamService = require('../../services/team.service');
const { sendSuccess } = require('../../utils/response');

const teamController = {
  /**
   * Create new team member
   */
  createTeam: async (req, res, next) => {
    try {
      const { name, role, socialLinks } = req.body;
      const image = req.file ? `/uploads/team/${req.file.filename}` : null;
      const teamData = {
        name,
        role,
        image,
        socialLinks: socialLinks ? JSON.parse(socialLinks) : []
      };

      const team = await teamService.createTeam(teamData);
      return sendSuccess(res, 'Team member created successfully', team, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all team members
   */
  getAllTeams: async (req, res, next) => {
    try {
      const teams = await teamService.getAllTeams();
      return sendSuccess(res, 'Team members fetched successfully', teams, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get team member by ID
   */
  getTeam: async (req, res, next) => {
    try {
      const team = await teamService.getTeamById(req.params.id);
      return sendSuccess(res, 'Team member fetched successfully', team, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update team member
   */
  updateTeam: async (req, res, next) => {
    try {
      const { name, role, socialLinks } = req.body;
      const image = req.file ? `/uploads/team/${req.file.filename}` : null;

      const updateData = { name, role };
      if (image) updateData.image = image;
      if (socialLinks) updateData.socialLinks = JSON.parse(socialLinks);

      const team = await teamService.updateTeam(req.params.id, updateData);
      return sendSuccess(res, 'Team member updated successfully', team, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete team member
   */
  deleteTeam: async (req, res, next) => {
    try {
      await teamService.deleteTeam(req.params.id);
      return sendSuccess(res, 'Team member deleted successfully', null, {}, status.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = teamController;
