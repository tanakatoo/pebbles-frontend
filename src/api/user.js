import PebblesApi from "./base"

class UserApi extends PebblesApi {

    /* Get public or private user data*/
    static async getUserInfo(username) {
        let res = await this.request(`users/${username}`)
        return res
    }

    /* Get contact list without blocked users */
    static async getContacts() {
        let res = await this.request(`users/contacts`)
        return res
    }

    /* Block user */
    static async blockUser(username) {
        let res = await this.request(`users/block/${username}`, {}, 'POST')
        return res
    }

    /* Get list of blocked users */
    static async getBlocked() {
        let res = await this.request(`users/blocked`)
        return res
    }

    /* Unblock a user*/
    static async unblockUser(username) {
        let res = await this.request(`users/unblock/${username}`, {}, 'DELETE')
        return res
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

}

export default UserApi