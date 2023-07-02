import PebblesApi from "./base"

class StudyBuddyApi extends PebblesApi {

    /* Get list of study buddies for main screen */
    static async getStudyBuddies(pageNum) {
        let res = await this.request(`study-buddies/1`)
        return res
    }

    /* Filter study buddies */
    static async getFilteredStudyBuddies(criteria) {
        console.log(criteria)
        let res = await this.request(`study-buddies/search`, criteria)
        return res
    }



}

export default StudyBuddyApi