const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const teamRepository = require('../repositories/team.repository');

class TeamService {
  async createTeam(data) {
    return await teamRepository.createTeam(data);
  }

  async getAllTeams() {
    const teams = await teamRepository.findAllTeams();
    if (!teams || teams.length === 0) {
      throw new ApiError(status.NOT_FOUND, 'No team members found');
    }
    return teams;
  }

  async getTeamById(id) {
    const team = await teamRepository.findTeamById(id);
    if (!team) {
      throw new ApiError(status.NOT_FOUND, 'Team member not found');
    }
    return team;
  }

  async updateTeam(id, updateData) {
    const team = await teamRepository.findTeamById(id);
    if (!team) {
      throw new ApiError(status.NOT_FOUND, 'Team member not found');
    }
    if (updateData.socialLinks === undefined) {
      delete updateData.socialLinks;
    }
    return await teamRepository.updateTeam(id, updateData);
  }

  async deleteTeam(id) {
    const team = await teamRepository.findTeamById(id);
    if (!team) {
      throw new ApiError(status.NOT_FOUND, 'Team member not found');
    }
    return await teamRepository.deleteTeam(id);
  }
}

module.exports = new TeamService();
