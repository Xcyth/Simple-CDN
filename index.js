const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const chalk = require('chalk');
const app = express();

const dir = path.join(__dirname, "/files");
let dirContents = fs.readdirSync(dir);
const htmlFile = fs.readFileSync(path.join(__dirname, "/index.html"), "utf8");
const port = 3000;
const password = "password";

app.use(async (req, res, next) => {
    const date = new Date();
    console.log((date.getHours() + ":" + date.getMinutes()), chalk.green(req.method), chalk.blue(req.url), chalk.yellow((req.ip).split(":")[3]));
    next();
});

app.get('/', (req, res) => {
    dirContents = fs.readdirSync(dir);
    res.send(htmlFile.replace("{files}", dirContents.map(file => `<li><a href="${file}">${file}</a></li>`).join("")));
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, "/upload.html"));
});

app.get('/rename', (req, res) => {
    res.sendFile(path.join(__dirname, "/rename.html"));
})

app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).send("Error uploading file");
        }
        const newpath = dir + '/' + files.filetoupload.name;
        fs.writeFileSync(newpath, fs.readFileSync(files.filetoupload.path));
        res.send("<p>File Uploaded Successfully!</br><a href=\"/\">Go Back</a></p>");
    });
});

app.get('/:file', (req, res) => {
    const reqFile = req.params.file;

    if (dirContents.includes(reqFile)) {
        res.sendFile(path.join(dir, reqFile));
    } else {
        res.status(404).send("File not found");
    }
});

app.get('/:file/delete', (req, res) => {
    const pass = req.query.pass;
    const reqFile = req.params.file;

    if (pass !== password) {
        return res.status(403).send("Wrong password");
    }

    if (dirContents.includes(reqFile)) {
        fs.unlinkSync(path.join(dir, reqFile));
        res.send("<p>File Deleted Successfully!</br><a href=\"/\">Go Back</a></p>");
    } else {
        res.status(404).send("File not found");
    }
});

app.post('/rename', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).send("Error renaming file");
        }
        const oldpath = dir + '/' + fields.oldname;
        const newpath = dir + '/' + fields.newname;
        if (!dirContents.includes(fields.oldname)) {
            return res.status(404).send("File not found");
        }
        fs.renameSync(oldpath, newpath);
        res.send("<p>File Renamed Successfully!</br><a href=\"/\">Go Back</a></p>");
    });
});

app.listen(port, () => {
    console.log(chalk.bgGreen(`[CDN] Running on port ${port}`));
});