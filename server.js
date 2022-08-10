const { sequelize } = require('./util/database')
const { app } = require('./app')

sequelize
    .authenticate()
    .then(() => console.log('Database Postgress authenticate'))
    .catch(error => console.log(error))

sequelize
    .sync()
    .then(() => console.log("Database syncronized"))
    .catch(error => console.log(error))

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Express app running: ${PORT}`);
});

//app.listen(4000, () =>{
//    console.log('app running')
//})