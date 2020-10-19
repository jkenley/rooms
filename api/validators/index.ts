import { NowRequest, NowResponse } from '@vercel/node'
import { genericApiMethodHandler } from '../tools'

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
  await genericApiMethodHandler(request, response, {})
}

/* --------------- internal API methods/structure below --------------- */

export {
  checkRoomType,
} from './room_type'

export {
  checkBooking,
} from './booking'

export {
  checkLogin,
} from './login'

export {
  checkSendOneTimePass,
} from './send_one_time_pass'