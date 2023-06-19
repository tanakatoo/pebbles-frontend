import PebblesApi from "./base"

class ExternalApi extends PebblesApi {


    static async autocompleteLocation(q, lang, sessionToken) {

        let res = await this.request(`external/api/location`, { q, lang, sessionToken })
        return res
    }

    static async autocompleteSelectLocation(id, sessionToken) {

        let res = await this.request(`external/api/select-location`, { id, sessionToken })
        return res
    }
}

export default ExternalApi