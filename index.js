const express = require('express');
const app = express()
const port = 4000

const expressHbs = require("express-handlebars")
app.use(express.static(__dirname + "/html"))

app.engine(
    "hbs",
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        defaultLayout: "layout",
        extname: "hbs",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true
        },
        helpers: {
            showDate: (date) => {
                return date?.toLocaleDateString('en-US',{
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })
            },
            lengthPage: (blogLength) => Math.ceil(blogLength / 2),
            slice: (context, start, end) => {
                if (!context || !Array.isArray(context)) {
                  return [];
                }
                return context.slice(start, end);
            },
            inc: (value) => parseInt(value) + 1
        }
    })
)

app.set("view engine", "hbs")

app.get("/createTable", (req, res) =>{
    let models = require('./models')
    models.sequelize.sync().then(() => {
        res.send("ok")
    })
})

app.get("/", (req, res) => res.redirect("/blogs"))
app.use("/blogs", require("./routes/blogRouter"))
app.use("/blogs/category", require("./routes/blogRouter"))
app.use("/blogs/tag", require("./routes/blogRouter"))
app.use("/blogs/search", require("./routes/blogRouter"))
app.use("/blogs/detail", require("./routes/blogRouter"))

app.listen(port,() => console.log(`Express listening on port ${port}`))