import amqp from 'amqplib/callback_api'
import moment from 'moment'

import { amqpTypes } from '../helpers'

const { CLOUDAMQP_URL } = process.env

class AmqpController {
  publish ({ type, message }) {
    amqp.connect(CLOUDAMQP_URL, function (err, conn) {
      if (err) console.error(err)

      conn.createChannel(async function (err, ch) {
        if (err) console.error(err)

        await ch.assertQueue(amqpTypes.queue, { durable: false })
        const payload = { ...message.toObject(), generatedIn: moment().toDate() }

        const success = await ch.sendToQueue(
          amqpTypes.queue,
          Buffer.from(JSON.stringify(payload)),
          { type },
          function (err, ok) {
            if (err) console.error(err)
            conn.close()
          }
        )
        success && console.log(`Message sent to ${amqpTypes.queue}`)
      })
    })
  }
}

export default new AmqpController()
