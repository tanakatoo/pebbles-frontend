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
        console.log('frontened api data', userData)
        let res = await this.request(`users/${userData.username}`, { ...userData }, "PATCH")
        return res
    }

    /* Save user */
    static async saveUser(username) {
        let res = await this.request(`users/save/${username}`, {}, 'POST')
        return res
    }

    /* Unsave user */
    static async unsaveUser(username) {
        let res = await this.request(`users/unsave/${username}`, {}, 'DELETE')
        return res
    }

    /* get all saved users */
    static async getSavedUsers() {
        let res = await this.request(`users/saved-users`)
        return res
    }


}

export default UserApi