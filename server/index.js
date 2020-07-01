const express = require("express")
const axios = require("axios")
const app = express()

// 启动服务器 node index.js

// 请求地址： http://localhost:3000/search
app.get("/search", function (req, res) {
  res.json({
    code: 10000, // 成功
    data: [
      // 响应具体数据
      { name: "vue", url: "https://github.com/vuejs/vue" },
      { name: "vue-resource", url: "https://github.com/pagekit/vue-resource" },
    ],
  })
})

/*
  请求地址： http://localhost:3000/search/users?q=aa

  后台路由
    key： /search/users
    value： function () {}
*/
app.get("/search/users", function (req, res) {
  const {q} = req.query
  axios({
    url: 'https://api.github.com/search/users',
    params: {q}
  }).then(response => {
    res.json(response.data)
  })
})

app.listen(3000, "localhost", (err) => {
  if (!err) console.log("服务器启动成功了，请访问 http://localhost:3000")
  else console.log(err);
})
