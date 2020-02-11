import amqp from 'amqplib/callback_api'
import moment from 'moment'

const { CLOUDAMQP_URL } = process.env

class AmqpController {
  publish ({ queue, message }) {
    amqp.connect(CLOUDAMQP_URL, function (err, conn) {
      if (err) console.error(err)

      conn.createChannel(async function (err, ch) {
        if (err) console.error(err)

        await ch.assertQueue(queue, { durable: false })

        const success = await ch.sendToQueue(
          queue,
          Buffer.from(JSON.stringify({ ...message, generatedIn: moment().toDate() })),
          { type: queue },
          function (err, ok) {
            if (err) console.error(err)
            conn.close()
          }
        )
        success && console.log(`Message sent to ${queue}`)
      })
    })
  }
}

export default new AmqpController()
