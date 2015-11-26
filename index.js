var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var busboy = require('connect-busboy')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/index.htm', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.htm')
})

app.use(busboy())
app.post('/fileupload', function (req, res) {
  var fstream
  req.pipe(req.busboy)
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log('Uploading: ' + filename)
    fstream = fs.createWriteStream(__dirname + '/files/' + filename)
    file.pipe(fstream)
    fstream.on('close', function () {
      res.redirect('back')
    })
  })
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
