const { sequelize } = require('./util/database')
const { app } = require('./app')

const PORT = process.env.PORT || '4000';

sequelize
    .authenticate()
    .then(() => console.log('Database Postgress authenticate'))
    .catch(error => console.log(error))

sequelize
    .sync()
    .then(() => console.log("Database syncronized"))
    .catch(error => console.log(error))


app.set("port", PORT)

app.listen(PORT, () => {
    console.log(`Express app running: ${PORT}`);
});

//app.listen(4000, () =>{
//    console.log('app running')
//})