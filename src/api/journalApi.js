import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demo-69917-default-rtdb.europe-west1.firebasedatabase.app'
    

})

export default journalApi

// https://api.cloudinary.com/v1_1/dqrdwglbm/image/upload