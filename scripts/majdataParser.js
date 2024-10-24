const fs = require('fs');

function parseChart(callback) {
    fs.readFile('./../content/kamui.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return callback(err); // Pass the error to the callback
        }

        const chart = {};

        const noNewlineData = data.replace(/[\r\n]+/g, '');
        const titleMatch = noNewlineData.match(/&title=([^&]*)/);
        const artistMatch = noNewlineData.match(/&artist=([^&]*)/);
        const lv5Match = noNewlineData.match(/&lv_5=([^&]*)/);
        const inote5Match = noNewlineData.match(/&inote_5=([^&]*)/);

        if (titleMatch) chart.title = titleMatch[1];
        if (artistMatch) chart.artist = artistMatch[1];
        if (lv5Match) chart.lv_5 = lv5Match[1];
        if (inote5Match) chart.chart = inote5Match[1];

        callback(null, chart); // Pass the chart to the callback
    });
}

// Export the function
module.exports = {
    parseChart
};
