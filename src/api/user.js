import PebblesApi from "./base"

class UserApi extends PebblesApi {

    /* Get public or private user data*/
    static async getUserInfo(username) {

        let res = await this.request(`users/${username}`)
        return res.user
    }

    /* Update user info */
    static async updateUserInfo(userData) {
        const { username, firstName, lastName, email } = userData
        let res = await this.request(`users/${username}`, { firstName, lastName, email }, "PATCH")
        return res
    }

    /* Apply for job */
    static async apply(username, jobid) {
        let res = await this.request(`users/${username}/jobs/${jobid}`, {}, "POST")
        return res
    }
    // obviously, you'll add a lot here ...
}

export default UserApi