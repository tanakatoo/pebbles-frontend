import PebblesApi from "./base"

class StudyBuddyApi extends PebblesApi {

    /* Get list of study buddies for main screen */
    static async getStudyBuddies(pageNum) {
        let res = await this.request(`study-buddies/1`)
        return res
    }



}

export default StudyBuddyApi