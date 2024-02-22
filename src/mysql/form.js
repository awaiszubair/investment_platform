import axios from "axios";

export default class FormService {
    async fetchForm(email) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/api/form/user/${email}`, { headers: { 'x-auth-token': token } })
            if (response) {
                return JSON.parse(response.data)
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

export const formService = new FormService();