const { sendSupportEmail } = require('../../utils/mailer');
const { sendSuccess } = require('../../utils/response');
const { status } = require('http-status');

const supportController = {
  /**
   * Send a Support Email
   */
  sendSupport: async (req, res, next) => {
    try {
      const { name, email, message } = req.body;
      await sendSupportEmail({ name, email, message });
      return sendSuccess(res, 'Your message has been sent successfully.', null, {}, status.OK);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = supportController;
