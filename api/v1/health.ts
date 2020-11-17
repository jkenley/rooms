import { NowRequest, NowResponse } from '@vercel/node'

import { pingMongo } from '../_lib/data/api_health'
import { genericApiMethodHandler } from '../_lib/tools'
import { ENV } from '../_lib/infra/env'

async function GET(request: NowRequest, response: NowResponse): Promise<void> {
  let mongoStatus = 'up'

  const startTime = process.hrtime()
  try {
    await pingMongo()
  } catch (err) {
    mongoStatus = 'down'
  }
  const endTime = process.hrtime(startTime)
  const timeInMs = (endTime[0] * 1000000000 + endTime[1]) / 1000000

  response.status(200).json({
    mongo: {
      status: mongoStatus,
      latency: (mongoStatus === 'up') ? `${timeInMs}ms` : undefined,
    },
    app_version: ENV.APP_VERSION,
  })
}

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
