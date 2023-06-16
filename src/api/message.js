import PebblesApi from "./base"

class MessageApi extends PebblesApi {

    /* Get all contacting users and latest message for main display*/
    static async getAllUsersLatestMsg() {
        let res = await this.request(`messages`)
        return res
    }


}

export default MessageApi