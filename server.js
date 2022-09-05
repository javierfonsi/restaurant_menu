const { sequelize } = require('./util/database')
const { app } = require('./app')

//const PORT = process.env.PORT || 4000;

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

sequelize
    .authenticate()
    .then(() => console.log('Database Postgress authenticate'))
    .catch(error => console.log(error))

sequelize
    .sync()
    .then(() => console.log("Database syncronized"))
    .catch(error => console.log(error))

app.listen(port, () => {
    console.log(`Express app running: ${port}`);
});

//app.listen(4000, () =>{
//    console.log('app running')
//})