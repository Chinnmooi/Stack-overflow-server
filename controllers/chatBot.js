import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  headers: {
    'Authorization' : process.env.CHAT_GPT_KEY,//'Bearer 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',
    'Content-Type' : 'application/json',
  },
});
export async function getMessage(req,res) {
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
      const op = response['data']['choices'][0]['message']['content'];
      console.log(op);
      res.status(200).json({op})
    }).catch(error => {
      console.log("Error");
      res.status(200).json({error})
    });
}