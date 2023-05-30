import PebblesApi from "./base"

class AuthApi extends PebblesApi {

    /* Register new user */
    static async register(userData) {
        const { username, password, email } = userData
        let res = await this.request(`auth/register`, { username, password, email }, "POST")
        this.token = res.token
        return res.token
    }

    /* Login user*/
    static async login(userData) {
        const { username, password } = userData
        let res = await this.request(`auth/token`, { username, password }, "POST")
        this.token = res.token
        return res.token
    }

    /* Get logged in user data*/
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

export default AuthApi