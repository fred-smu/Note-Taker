const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express()

//const port = 3000
 port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/notes', function (req, res) {
  res.sendFile(__dirname + '/public/notes.html')
})

app.get('/api/notes', function (req, res) {
  res.sendFile(__dirname + '/db/db.json')
})

app.post('/api/notes', function (req, res) {
  console.log(req.body);
  fs.readFile(__dirname + '/db/db.json', function (err, data) {
    let newData = JSON.parse(data)
    newData.push({ id: req.body.id, title: req.body.title, text: req.body.text })
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(newData), function (err) {
      if (err) throw err;
      res.send(JSON.stringify(newData))
    })
  })
})

app.listen(port, () => {
  console.log('its going');
})

app.delete('/api/notes/:id', function (req, res) {
  const noteID = req.params.id;
  fs.readFile(__dirname + '/db/db.json', function (err, data) {
    let newData = JSON.parse(data)
    const result = newData.filter(note => note.id !== noteID)
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(result), function (err) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    })

  });

});