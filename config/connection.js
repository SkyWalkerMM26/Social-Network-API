const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/studentsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = connection;