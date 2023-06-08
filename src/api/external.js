import PebblesApi from "./base"

class ExternalApi extends PebblesApi {


    static async autocompleteLocation(q, lang) {
        let res = await this.request(`external/api/location`, { q, lang })
        return res
    }
}

export default ExternalApi