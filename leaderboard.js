var gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ]
}


var teams = [];

var makeTeams = function(arr) {
  var nameArray = [];
  for (var i = 0; i < arr.length; i++) {
    var game = arr[i];
    nameArray.push(game.home_team);
    nameArray.push(game.away_team);
  }

  for (var x = 0; x < nameArray.length; x++) {
    for (var z = nameArray.length; z > x; z--) {
      if (nameArray[x] == nameArray[z]) {
        nameArray.splice(z, 1);
      }
    }
  }
  return nameArray;
}


var team = function(n,r,w,l) {
  this.name = n;
  this.rank = r;
  this.wins = w;
  this.losses = l;
}


var createTeam = function() {
    var array = makeTeams(gameInfo());
    for (var x = 0; x < array.length; x++){
      teams.push(new team(array[x],0,0,0));
    }
};

var findTeamByName = function(teamArray, teamName) {
  for (var i = 0; i < teamArray.length; i++) {
    var teamObject = teamArray[i];
    if (teamObject.name === teamName) {
      return teamObject;
    }
  }
  return false;
}

var addsPoints = function(games) {
  createTeam()

  for (var i = 0; i < games.length; i++) {
    var homeTeamName = games[i].home_team;
    var awayTeamName = games[i].away_team;
    var homeTeamScore = games[i].home_score;
    var awayTeamScore = games[i].away_score;
    var home = findTeamByName(teams, homeTeamName);
    var away = findTeamByName(teams, awayTeamName);

    if (homeTeamScore > awayTeamScore) {
      home.wins ++;
      away.losses ++;
    } else {
      home.losses ++;
      away.wins ++
    }
  }
  return teams;
}

var ranksTeams = function() {
  teams.sort(function(a, b) {
      return parseFloat(a.wins) - parseFloat(b.wins);
  });
  var numm = 1
  for (var i = teams.length; i > 0; i--) {
    teams[i-1].rank = numm;
    numm ++
  }
  rankOrder();
}

var rankOrder = function() {
  teams.sort(function(a, b) {
      return parseFloat(a.rank) - parseFloat(b.rank);
  });
  console.log(teams);
  return teams;
}


addsPoints(gameInfo());
ranksTeams();
