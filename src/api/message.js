import PebblesApi from "./base"

class MessageApi extends PebblesApi {

    /* Get all contacting users and latest message for main display*/
    static async getAllUsersLatestMsg() {
        let res = await this.request(`messages`)
        return res
    }

    /** Get all messages for 1 conversation 
     * In the future maybe limit to return 50 messages
    */
    static async getConversation(username) {
        let res = await this.request(`messages/${username}`)
        return res
    }

    /** Send a message  
         * In the future maybe limit to return 50 messages
        */
    static async sendMsg(username, msg) {
        let res = await this.request(`messages/${username}/send`, { msg }, "POST")
        return res
    }

}

export default MessageApi