var fs = require('fs');
var uniqid = require('uniqid');
var dl_path = './deeplinks/';

var exports = module.exports = {}

exports.generate = async function(user_data) {

    var dl_file_name = uniqid() + ".html";

    console.log('server= ' + user_data)
    fs.createReadStream('./deeplinks/template/template.html');
    fs.copyFile('./deeplinks/template/template.html', dl_path + dl_file_name, (err) => {
        if (err) throw err;
        console.log('template was copied to ' + dl_file_name);
    });

    var data = "<script>" +
        " document.addEventListener('DOMContentLoaded', mobile_checker());" +
        " function mobile_checker() {" +
        " if (navigator.userAgent.match(/Android/i)) {" +
        " document.location.replace('intent://www.instagram.com/" + user_data + "/#Intent;package=com.instagram.android;scheme=https;end')" +
        " } else if (navigator.userAgent.match(/iPhone/i)) {" +
        " document.location.replace('instagram://user?username=" + user_data + "')" +
        " } else if (navigator.userAgent.match(/Mac OS/i)) {" +
        " document.location.replace('https://www.instagram.com/" + user_data + "/')" +
        " }" +
        " document.removeEventListener('DOMContentLoaded', mobile_checker())" +
        " }" +
        " </script>" +
        " </html>"

    fs.appendFile(dl_path + dl_file_name, data, function(err) {
        if (err) throw err;
        console.log('Saved!');
    });

    exports.clear_name = dl_path + dl_file_name
}