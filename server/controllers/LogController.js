import dotenv from 'dotenv'
import moment from 'moment'
import Pretty from 'pretty-error'
import SlackNotify from 'slack-notify'

dotenv.config()

const slack = SlackNotify(process.env.SLACK_LOG);

slack.onError = function (err) {
  console.log('API error:', err)
}
class LogController {
  sendNotify({ type, file, resume, details }) {
    const text =
      type === 'error'
        ? new Pretty().withoutColors().render(details)
        : JSON.stringify(details, null, '  ')

    this.sendSlackMessage({ type, file, resume, details, text })
    if (process.env.HEROKU_ENV !== 'production') {
      const log = type === 'error' ? new Pretty().render(details) : text
      console.log(log)
    }
  }

  sendSlackMessage({ type, file, resume, details, text }) {
    slack.send({
      channel: process.env.SLACK_CHANNEL,
      icon_url: 'https://impulsowork.slack.com/services/BLA0E0RA5',
      username: `Ctech - [${process.env.HEROKU_ENV}]`,
      attachments: [
        {
          fallback: 'Error while rendering message',
          pretext: `*${file}*`,
          title: resume ? resume.replace(/  +/g, '') : 'unknown error',
          color: type === 'error' ? '#e74c3c' : '#3498db',
          text: details ? `${'```'}${text}${'```'}` : null,
          ts: moment().format('X')
        }
      ]
    })
  }
}

export default new LogController()
