const express = require("express")

const port = 3000

const app = express()

app.get("/", (req, res, next) => {

})


app.listen(port, () => {
    console.log(`server runing on ${port}`)
})