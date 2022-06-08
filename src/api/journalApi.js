import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demo-69917-default-rtdb.europe-west1.firebasedatabase.app'
    

})


// console.log( process.env.NODE_ENV) // devuelve test para pruebas y development para desarrollo
//Esta variable sirve para un if para poner 1 bbdd (url) de test y otra desarrollo

export default journalApi

// https://api.cloudinary.com/v1_1/dqrdwglbm/image/upload

