import PebblesApi from "./base"

class AuthApi extends PebblesApi {

    /* Register new user */
    static async register(username, password, email, lang) {
        console.log(username, password, email, lang)
        let res = await this.request(`auth/register`, { username, password, email, lang }, "POST")

        this.token = res
        return res
    }

    /* Login user*/
    static async login(username, password) {
        let res = await this.request(`auth/login`, { username, password }, "POST")
        this.token = res.token

        return res
    }

    /*check if username or email is in db, if so, send email */
    static async changePassword(username, lang) {
        let res = await this.request(`auth/change-password`, { username, lang }, "POST")
        this.token = res

        return res
    }

    /* set new password*/
    static async setPassword(password, lang, token) {
        let res = await this.request(`auth/set-password`, { password, lang, token }, "POST")
        this.token = res

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