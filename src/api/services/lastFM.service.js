var LastfmAPI = require('lastfmapi');
var api_key = '034f5f35cd2966737626588df7d6cf2b'
var lfm = new LastfmAPI({
    'api_key': api_key,
    'secret': 'b97fab5e109145a48bbd6566346feaf7'
});

exports.getArtist = function(request, response) {
    var param = {
        'artist': request.params.artist,
        'api_key': api_key,
    }
    lfm.artist.search(param, function(err, res) {
        if(err) {
            console.log(err);
            return null;
        }
        var data = res.artistmatches.artist;
        console.log(data);
        var results = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].mbid.length <= 0) continue;
            if(data[i].name.includes('feat.') || data[i].name.includes('Feat.') || data[i].name.includes('&')) continue;
            result = {
                'name': data[i].name,
                'mbid': data[i].mbid,
                'img': data[i].image[3]['#text']
            }
            console.log(data[i].image);
            results.push(result);
        }
        response.send(results);
    });
}

exports.getSongs = function(request, response) {
    var param = {
        'track': request.params.song,
        'api_key': api_key,
        'limit': 100,
    }
    lfm.track.search(param, function(err, res) {
        if(err) {
            console.log(err);
            return null;
        }
        var data = res.trackmatches.track;
        var results = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].mbid.length <= 0) continue;
            // if(!data[i].name.includes(param['track'])) continue;
            result = {
                'name': data[i].name,
                'mbid': data[i].mbid,
                'artist': data[i].artist,
                'img': data[i].image[1]['#text']
            }
            results.push(result);
        }
        response.send(results);
    });
}

exports.getTop50 = function(request, response) {
    var param = {
        'country': request.params.country,
        'api-key': api_key,
    }
    var results = [];
    lfm.geo.getTopTracks(param, function(err, res) {
        if(err) {
            console.log(err);
            return null;
        }
        var data = res.track;
        for(var i = 0; i < data.length; i++) {
            result = {
                'name': data[i].name,
                'listeners': data[i].listeners,
                'artist': data[i].artist["name"],
                'img': data[i].image[3]["#text"]
            }
            results.push(result);
        }
        // callback(results);
        response.send(results);
    });
}

exports.getInfo = function(request, response) {
  lfm.artist.getInfo({mbid: request.params.mbid, api_key: api_key}, function(err, res){
    if (err) {
      console.log(err);
      return null;
    } else {
      return res;
    }
  });
}
