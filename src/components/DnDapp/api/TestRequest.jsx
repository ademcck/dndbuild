import axios from 'axios'

const testApiRequest = async ({
                                url: url,
                                headers: headers,
                                body: body,
                                method: method
                            }) => {


    const baseUrl = url.includes('http') ? url : "https://" + url
    try{

        const response = 
            method === 'DELETE' ? await axios.delete(baseUrl, {headers:{...headers}}) :
                method === 'POST' ? await axios.post(baseUrl, body, {headers:{...headers}}) :
                    method === 'PUT' ? await axios.put(baseUrl, body, {headers:{...headers}}) :
                        await axios.get(baseUrl, {headers:{...headers}})
        return response
    }
    catch(err){
        console.log(err)
    }


}

export default testApiRequest;