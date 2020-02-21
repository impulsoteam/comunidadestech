import { Connection } from 'amqplib-as-promised'
import chalk from 'chalk'
// import amqp from 'amqplib/callback_api'
// import jackrabbit from 'jackrabbit'
import moment from 'moment'

import { amqpTypes } from '../helpers'
import LogController from './LogController'

const { CLOUDAMQP_URL } = process.env

class AmqpController {
  async connect () {
    try {
      const connection = new Connection(CLOUDAMQP_URL)
      await connection.init()
      this.channel = await connection.createChannel()

      for (const queue of Object.values(amqpTypes.queues)) {
        this[queue] = await this.channel.assertQueue(queue, { durable: false })
        console.log(`${chalk.green('✓')} Read to send message on ${queue}`)
      }
    } catch (error) {
      LogController.sendNotify({
        type: 'error',
        file: 'controllers/AmpqController.connect',
        resume: 'Error while connecting',
        details: error
      })
    }
  }

  async publish ({ queue, type, message }) {
    try {
      const payload = { ...message.toObject(), generatedIn: moment().toDate() }
      this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(payload)),
        { type }
      )
    } catch (error) {
      LogController.sendNotify({
        type: 'error',
        file: 'controllers/AmpqController.publish',
        resume: `Error while publishing on ${queue}`,
        details: error
      })
    }
  }
}

export default new AmqpController()
