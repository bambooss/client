import axios from 'axios'

// TODO:change any to return function Promise
export async function getGitHubUser(params: string): Promise<any> {
    try {
        const response = await axios.get(
            `http://localhost:8080/github/callback?code=${params}`
        )
        const {user: gitHubUser} = response.data
        return gitHubUser
    } catch (error) {
        console.log(error.message)
    }
}
