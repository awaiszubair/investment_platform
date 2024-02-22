import axios from 'axios'

export class AuthService {
    // user account registration
    account = "";
    async createAccount(data) {
        // 
        try {
            const response = await axios.post('http://localhost:3000/api/submit', data);
            if (response) {
                localStorage.setItem('token', response.data.token);
                console.log(response.data); // Handle successful response
                return response.data
            }
        } catch (error) {
            console.error("Error from the server", error); // Handle error
            return error;
        }
    }

    // user account login
    async login(data) {
        try {
            const loginUser = await axios.post("http://localhost:3000/api/auth", data)
            if (loginUser) {
                localStorage.setItem('token', loginUser.data.token)
                console.log(loginUser.data)
                return loginUser.data
            }
        } catch (error) {
            throw error
        }
    }

    // get currentUser
    async currentUser({ email }) {
        try {
            const user = fetch('user-detail-api-endpoint');
            return user;
        } catch (error) {
            throw error
        }
    }

    async logout() {
        // logging out the current User
    }
}

export const authService = new AuthService();