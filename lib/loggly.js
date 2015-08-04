var loggly = require('loggly');

 var client = loggly.createClient({
    token: "0148ba7e-69ce-4cfa-822a-de88fdfd6d2c",
    subdomain: "mattfili",
    tags: ["NodeJS"],
    json:true
});

module.exports = client;