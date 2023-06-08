import PebblesApi from "./base"

class AuthApi extends PebblesApi {

    /* Register new user */
    static async register(username, password, email) {
        let res = await this.request(`auth/register`, { username, password, email }, "POST")
        console.log('res from api', res)
        this.token = res
        return res
    }

    /* Login user*/
    static async login(username, password) {
        let res = await this.request(`auth/login`, { username, password }, "POST")
        this.token = res.token

        console.log('token got back', res)
        return res
    }

    /*check if username or email is in db, if so, send email */
    static async changePassword(username, lang) {
        let res = await this.request(`auth/password`, { username, lang }, "POST")
        this.token = res
        console.log('password token got back', res)
        return res
    }

    /* set new password*/
    static async setPassword(username, password) {
        let res = await this.request(`auth/set-password`, { username, password }, "POST")
        this.token = res
        console.log('token got back', res)
        return res
    }

    /* Get logged in user data*/
    static async getUserInfo(username) {

        let res = await this.request(`users/${username}`)
        return res.user
    }

    /* Update user info */
    // static async updateUserInfo(userData) {
    //     const { username, firstName, lastName, email } = userData
    //     let res = await this.request(`users/${username}`, { firstName, lastName, email }, "PATCH")
    //     return res
    // }

    // /* Apply for job */
    // static async apply(username, jobid) {
    //     let res = await this.request(`users/${username}/jobs/${jobid}`, {}, "POST")
    //     return res
    // }

}

export default AuthApi