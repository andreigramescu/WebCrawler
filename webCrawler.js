const request = require('request');
const cheerio = require('cheerio');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const MAX_DEPTH = 100;

readline.question(`Please enter a start URL: `, (input) => {
  depthCrawl(input, 0, []);
})

function depthCrawl(currURL, currdepth, depthLogs) {
  console.log(currURL);
  request(currURL, (err, res, body) => {
    $ = cheerio.load(body);
    links = $('a');
    $(links).each((i, link) => {
      next = $(link).attr('href');
      if(next && next.startsWith('https:') && !elem(next, depthLogs) && currdepth <= MAX_DEPTH) {
          depthLogs.push(next);
          depthCrawl(next, currdepth + 1, depthLogs);
      }
    });
  });
}

function elem(x, arr) {
    for(let i = 0; i < arr.length; i++) {
      if(x == arr[i]) {
        return true;
      }
    }
    return false;
}

/*Alseo tried a crawling algorithm
derived from the breadth-first search algorithm
but does not work

const request = require('request');
const cheerio = require('cheerio');

const MAX_CRAWL_DEPTH = 100;

let linkQueue = [];
let currentUrl;
let crawlLog = [];

let inputUrl = 'https://news.ycombinator.com';

linkQueue.push(inputUrl);
while(linkQueue.length != 0 && crawlLog.length <= MAX_CRAWL_DEPTH) {
  currentUrl = linkQueue[0];
  linkQueue.shift();

  request(currentUrl, (err, res, body) => {
    $ = cheerio.load(body);
    links = $('a');
    $(links).each(function(i, link){
      if($(link).attr('href').startsWith('https:'))
        linkQueue.push($(link).attr('href'));
    });
  });

  crawlLog.push(currentUrl);
}

console.log(crawlLog);
*/
