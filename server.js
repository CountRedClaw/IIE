const express = require('express');
const json2xml = require('json2xml');
var path = require('path');
var format = require('xml-formatter');
// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Start Server
app.listen(8000, () => {
    console.log('Server started!');
});

app.route('/schedule.xml').get((req, res) => {
    let myJSON;
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const Http = new XMLHttpRequest();

    const url =
        'http://box1.binarus.ru/TimeTableBD/api/GroupInst.json?token=411aa49701106596019d170af88b6df5';
    Http.open('GET', url);
    Http.send();
    Http.onreadystatechange = e => {
        if (Http.readyState == 4) {
            let myJson = Http.responseText;
            let xml = format(json2xml(JSON.parse(Http.responseText)));

            res.setHeader("Content-Type", 'text/xml');
            res.send(format(xml));
        }
    };
});

app.route('/').get((req, res) => {
    let myJSON;
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const Http = new XMLHttpRequest();

    const url =
        'http://box1.binarus.ru/TimeTableBD/api/TTGroup.json?token=411aa49701106596019d170af88b6df5&groupId=470&from=2017-12-04&to=2017-12-14';
    Http.open('GET', url);
    Http.send();
    Http.onreadystatechange = e => {
        if (Http.readyState == 4) {
            let myJson = Http.responseText;
            let lessons = JSON.parse(myJson).tts;

            res.render('lessons', {
                title: 'Lessons',
                lessons: lessons
            });
        }
    };
});
