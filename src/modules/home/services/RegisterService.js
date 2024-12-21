
const BASE_URL = 'http://localhost:50000/register/student'

export default class RegisterService {  

  static async postRegister({ payload }) {

    const requestHeaders = {
      'Content-Type' : 'application/json'    
    }

    console.log(payload)

    try{
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(payload)
      })

      if(!response.ok) {
        throw new Error('Error al registrar')
      }

      const data = await response.json()

      console.log(data)

      return response
    }catch(error) {
      console.log(error)
      throw new Error('Error al registrar')
    }

  }
}