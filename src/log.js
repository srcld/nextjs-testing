const log = function (msg = '') {
    const logText = new Date().toISOString() + ' - ' + msg;
    console.log(logText);
}

const table = function (data = []) {
    console.table(data);
}

module.exports = {log, table};