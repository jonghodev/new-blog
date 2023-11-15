var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk('content/blog', (_, results) => { 
  for (const result of results.filter((result => path.extname(result) === '.md'))) {
    fs.readFile(result, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var txt = data.replace(/date: (.*)/g, 'date: $1\nupdate: $1');
      txt = txt.replace(/draft: (.*)/g, 'description:');
      txt = txt.replace(/category: (.*)/g, 'tags:\n - $1');
    
      fs.writeFile(result, txt, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    }); 
  } 
})