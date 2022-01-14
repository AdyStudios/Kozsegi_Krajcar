var fs = require('fs');
var usersVerRaw = fs.readFileSync('./userversion.json');
var usersVer = JSON.parse(usersVerRaw);
const fileName = './userversion.json.json';
//push the users.json file changes to the github repository
function pushChanges() {
    usersVerRaw = fs.readFileSync('./userversion.json');
    usersVer = JSON.parse(usersVerRaw);
    var exec = require('child_process').exec;
    exec('git add . && git status && git commit -m "users save update v' + usersVer.version + '" && git push -u origin main', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        if(error === null) {
            fs.writeFile(fileName, JSON.stringify(usersVer, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
            });
        }
    });
}
pushChanges();