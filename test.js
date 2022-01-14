//push the users.json file changes to the github repository
function pushChanges() {
    var exec = require('child_process').exec;
    exec('git add . && git status && git commit -m "users save update" && git push -u origin master', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}
pushChanges();