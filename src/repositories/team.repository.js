const Team = require('../models/team.model');

class TeamRepository {
  async createTeam(data) {
    return await Team.create(data);
  }

  async findAllTeams() {
    return await Team.find();
  }

  async findTeamById(id) {
    return await Team.findById(id);
  }

  async updateTeam(id, data) {
    return await Team.findByIdAndUpdate(id, data);
  }

  async deleteTeam(id) {
    return await Team.findByIdAndDelete(id);
  }
}

module.exports = new TeamRepository();
