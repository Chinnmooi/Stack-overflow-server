import axios from "axios";


export const getMessage = async (req, res) => {console.log(req.body)
    const instance = axios.create({
        baseURL: 'https://api.openai.com/v1/chat/completions',
        headers: {
          'Authorization' : 'Bearer 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',//'Bearer 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',
          'Content-Type' : 'application/json',
        },
      });
      
      
      let resp = "error";
      console.log("executed")
    await instance({
      method: 'POST',
      data: {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": req.body.msg}],
        "temperature": 0.7
      },
    }).then(response => {
      console.log(response.data);
      console.log("Executed");
      resp = response['data']['choices'][0]['message']['content'];
      //console.log(op);
    //  res.status(200).json({response})
      
    }).catch(error => {
      console.log("Error");
      // res.status(401).json({error})
    });
    res.status(200).json({resp})
}