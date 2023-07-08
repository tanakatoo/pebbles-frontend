import PebblesApi from "./base"

class EmailApi extends PebblesApi {

    /* Send an email to info@pebblescommunity.com from contact us page*/
    static async sendToInfo(data) {

        console.log('in fontendapi', data)
        let res = await this.request(`email`, data, "POST")
        return res
    }



}

export default EmailApi