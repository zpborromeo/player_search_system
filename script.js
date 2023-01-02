//Load JSON file contents

import json from './players/players.json' assert { type: 'json' };

//Primary Team Colors for Player Cards - pulled from https://teamcolorcodes.com/mlb-color-codes/
//For some of the primary and secondary colors, the colors were adjusted to team alternates to make text and player cards more readable
const primary_colors = {
    ARI: '#A71930',
    ATL: '#13274F',
    BAL: '#DF4601',
    BOS: '#BD3039',
    CHI: '#0E3386',
    CWS: '#27251F',
    CIN: '#C6011F',
    CLE: '#00385D',
    COL: '#333366',
    DET: '#0C2340',
    HOU: '#002D62',
    KC: '#004687',
    LAA: '#BA0021',
    LA: '#005A9C',
    MIA: '#00A3E0',
    MIL: '#12284B',
    MIN: '#002B5C',
    NY: '#002D72',
    NYY: '#0C2340',
    OAK: '#003831',
    PHI: '#E81828',
    PIT: '#27251F',
    SD: '#2F241D',
    SF: '#FD5A1E',
    SEA: '#005C5C',
    STL: '#C41E3A',
    TB: '#092C5C',
    TEX: '#003278',
    TOR: '#134A8E',
    WSH: '#AB0003',
};

//Secondary Team Colors for Player Cards - pulled from https://teamcolorcodes.com/mlb-color-codes/
const secondary_colors = {
    ARI: '#E3D4AD',
    ATL: '#CE1141',
    BAL: '#000000',
    BOS: '#0C2340',
    CHI: '#CC3433',
    CWS: '#C4CED4',
    CIN: '#000000',
    CLE: '#E50022',
    COL: '#C4CED4',
    DET: '#FA4616',
    HOU: '#EB6E1F',
    KC: '#BD9B60',
    LAA: '#003263',
    LA: '#EF3E42',
    MIA: '#000000',
    MIL: '#FFC52F',
    MIN: '#D31145',
    NY: '#FF5910',
    NYY: '#C4CED3',
    OAK: '#EFB21E',
    PHI: '#002D72',
    PIT: '#FDB827',
    SD: '#FFC425',
    SF: '#27251F',
    SEA: '#C4CED4',
    STL: '#0C2340',
    TB: '#8FBCE6',
    TEX: '#C0111F',
    TOR: '#E8291C',
    WSH: '#14225A',
};

//Defining the two containers on the page to be filled with player cards
const player_container = document.getElementById('player-container');
const player_stats_container = document.getElementById('player-stats-container');
const player_reports_container = document.getElementById('player-reports-container');
//Length of JSON will be used later in multiple loops - good to have a const val 
const players_count = json.length;

//Display all cards on Load

//fetchplayers displays all player cards on load of the page. 
//Calls getplayer for each item in the json file
const fetchplayers = async () => {
    for (let i = 0; i < players_count; i++) {
        await getplayer(i);
    }
}

//getplayer grabs a player based on their passed in ID number to then call createplayercard
//Receives ID from fetchplayers
const getplayer = async id => {
    const player = json[id];
    createplayerCard(player);
}

//Creating the Player Cards functionality
//Receives player from getplayer, which has access to all elements in the JSON file based on ID
const createplayerCard = (player) => {
    //Beginning of the creation of an individual player card
    const playerEl = document.createElement('div');
    playerEl.classList.add('player');
    
    //Defining the constants to use in card creation - all of these come from the JSON file for each player
    const use_name = player["use_name"];
    const last_name = player["last_name"];
    const image = player["image"];
    const position = player["position"];
    const height_feet = player["height_feet"];
    const height_inches = player["height_inches"];
    const weight = player["weight"];
    const throws = player["throws"];
    const bats = player["bats"];
    const organization = player["organization"];
    const club = player["club"];
    const level = player["level"];

    //Since both the primary and secondary colors lists have ids that line up with a player's organization,
    //we can use the org name to set primary and secondary colors
    const primary_color = primary_colors[organization]
    const secondary_color = secondary_colors[organization]

    playerEl.style.backgroundColor = primary_color;
    playerEl.style.color = secondary_color;

    //Building the constants to use in the player card
    const full_name = use_name + " " + last_name;
    const pos = "Position: " + position;

    //Here, since some players have "null" listed for their heights (inches), we need to handle this using an If-Else
    let ht_wt = "";
    if (height_inches === null){
        ht_wt = "HT/WT: " + height_feet + "'0\"/" + weight + "lbs";
    }else{
        ht_wt = "HT/WT: " + height_feet + "'" + height_inches + '"/' + weight + "lbs";
    }
    
    const throws_bats = "THR/BAT: " + throws + "/" + bats;
    const org_lvl = "ORG/LVL: " + organization + "/" + level;
    const clb = "Club: " + club;
    

    //Building the InnerHTML to add text and the player image to the card
    const playerInnerHTML = `
        <div class="img-container">
        <img align="middle" src=${image} alt="${full_name}" style="max-width:100px; max-height:200px;">
        </div>
        <div class="info">
        <h3 style="font-size: 14px;">${full_name}</h3>
        <h3 style="font-size: 12px;">${pos}</h3>
        <h3 style="font-size: 12px;">${ht_wt}</h3>
        <h3 style="font-size: 12px;">${org_lvl}</h3>
        <h3 style="font-size: 12px;">${clb}</h3>
        </div>
    `;

    //Adding the InnterHTML to the player's existing HTML, then appending the playerEl to the container
    playerEl.innerHTML = playerInnerHTML;

    player_container.appendChild(playerEl);
}

//End of Loading all Cards

//fetchplayers_stats displays all player cards on load of the page - works exactly the same as fetchplayers
//Calls getplayer_stats for each item in the json file
//This isn't used in the JS file since it mirrors the initial fetchplayers function
//It is more of a placeholder function in case I wish to use it later (or for testing purposes)
const fetchplayers_stats = async () => {
    for (let i = 0; i < players_count; i++) {
        await getplayer_stats(i);
    }
}

//getplayer grabs a player based on their passed in ID number to then call createplayerCard_stats
//Receives ID from fetchplayers_stats - works the same as getplayer
const getplayer_stats = async id => {
    const player = json[id];
    createplayerCard_stats(player);
}

//Creating Player Cards with Statistics Functionality
//Receives player from getplayer_stats, which has access to all elements in the JSON file based on ID
//Works the same as createplayercard but with additional statistics on the player
//This only gets called when we are doing our detailed searches in the web application
const createplayerCard_stats = (player) => {
    //Beginning of the creation of an individual player card
    const playerEl = document.createElement('div');
    playerEl.classList.add('player');

    //Defining the constants to use in card creation - all of these come from the JSON file for each player
    const use_name = player["use_name"];
    const last_name = player["last_name"];
    const image = player["image"];
    const position = player["position"];
    const height_feet = player["height_feet"];
    const height_inches = player["height_inches"];
    const weight = player["weight"];
    const throws = player["throws"];
    const bats = player["bats"];
    const organization = player["organization"];
    const club = player["club"];
    const level = player["level"];
    const hitting_stats = player["hitting_stats"];          //MDA - Multi-Dimensional Array - I needed to remember these stats were multiple layers deep
    const pitching_stats = player["pitching_stats"];        //MDA
    const upcoming = player["upcoming"];                    //MDA


    //Building the constants to use in the player card
    const full_name = use_name + " " + last_name;
    const pos = "Position: " + position;

    //Here, since some players have "null" listed for their heights (inches), we need to handle this using an If-Else
    let ht_wt = "";
    if (height_inches === null){
        ht_wt = "HT/WT: " + height_feet + "'0\"/" + weight + "lbs";
    }else{
        ht_wt = "HT/WT: " + height_feet + "'" + height_inches + '"/' + weight + "lbs";
    }

    const throws_bats = "THR/BAT: " + throws + "/" + bats;
    const org_lvl = "ORG/LVL: " + organization + "/" + level;
    const clb = "Club: " + club;

    //Since both the primary and secondary colors lists have ids that line up with a player's organization,
    //we can use the org name to set primary and secondary colors
    const primary_color = primary_colors[organization]
    const secondary_color = secondary_colors[organization]

    playerEl.style.backgroundColor = primary_color;
    playerEl.style.color = secondary_color;
    
    //Beginning of Statistics Tables
    //So, in order to build the pitching and hitting stats tables, I needed several arrays
    //The first two var arrays (hitting_array and pitching_array) are the headers for the tables. 
    //The second two arrays (hitting_array_names and pitching_array_names) are arrays with the JSON IDs/Keys for each stat array 
    //(since these are MDAs, I needed a way to easily access them without hardcoding values)

    var hitting_array = ["Year", "Org", "Team" , "Level" , "PA" , "AB" , "H" , "R" , "2B" , "3B" , "HR" , "RBI" , "SH" , "SF" , "HBP" , "K" , "BB" , "IBB" , "SB" , "CS" , "AVG" , "SLG" , "OPS" , "ISO" , "KRate", "BB Rate"];
    var pitching_array = ["Year", "Org", "Team", "Level", "G", "GS", "W", "L", "S", "IP", "H", "R", "ER", "BB", "IBB", "K", "HBP", "WP", "ERA", "KRate", "BBRate"];

    var hitting_array_names = ["year", "org", "team", "level", "plate_appearances", "at_bats", "hits", "runs", "doubles", "triples", "home_runs", "rbi", "sacrifice_hits", 
            "sacrifice_flies", "hit_by_pitch", "strikeouts", "bases_on_balls", "intentional_bases_on_balls", "stolen_bases", "caught_stealing", "avg", "slugging", "ops", 
            "iso", "k_rate", "bb_rate"];
        
    var pitching_array_names = ["year", "org", "team", "level", "games", "games_started", "wins", "losses", "saves", "innings_pitched", "hits", "runs", "earned_runs", "bases_on_balls", 
            "intentional_bases_on_balls", "strikeouts", "hit_by_pitch", "wild_pitches", "era", "k_rate", "bb_rate"];
    

    //Here, we are building the hitting table under the assumption that the length of the hitting_stats array is greater than 0.
    //If the length is greater than 0, I know the player has hitting statistics I can access, so I build a table off of this
    if (hitting_stats.length > 0){
        var hitting_table = "<table><tr>"

        //This for loop is adding the headers to the table
        for (let i = 0; i < hitting_array.length; i++){
            var cell = hitting_array[i];
            hitting_table += "<td>" + cell + "</td>";
        }

        //This nested for loop is adding the values from the JSON to the table, creating individual cells for each stat.
        for (let i = 0; i < hitting_stats.length; i++){
            hitting_table += "<tr>";
            for (let j = 0; j < hitting_array_names.length; j++){
                //Here, when there are stats that are multiple decimals long (greater than 3), we shorten them to make them more readable in a table
                if (j > 20){
                    var cell = hitting_stats[i][hitting_array_names[j]].toFixed(3);
                    hitting_table += "<td>" + cell + "</td>";
                }else{
                    var cell = hitting_stats[i][hitting_array_names[j]];
                    hitting_table += "<td>" + cell + "</td>";
                }
            }
            hitting_table += "</tr>";
        }

        hitting_table += "</table>";
    }

    //Here, we are building the pitching table under the assumption that the length of the pitching_stats array is greater than 0.
    //If the length is greater than 0, I know the player has pitching statistics I can access, so I build a table off of this
    if (pitching_stats.length > 0){
        var pitching_table = "<table><tr>"

        //This for loop is adding the headers to the table
        for (let i = 0; i < pitching_array.length; i++){
            var cell = pitching_array[i];
            pitching_table += '<td style:"padding:10px">' + cell + "</td>";
        }

        //This nested for loop is adding the values from the JSON to the table, creating individual cells for each stat.
        for (let i = 0; i < pitching_stats.length; i++){
            pitching_table += "<tr>";
            for (let j = 0; j < pitching_array_names.length; j++){
                //Here, when there are stats that are multiple decimals long (greater than 3), we shorten them to make them more readable in a table
                if (j > 18){
                    var cell = pitching_stats[i][pitching_array_names[j]].toFixed(3);
                    pitching_table += '<td style:"padding:10px">' + cell + "</td>";
                }else{
                    var cell = pitching_stats[i][pitching_array_names[j]];
                    pitching_table += '<td style:"padding:10px">' + cell + "</td>";
                }           
            }
            pitching_table += "</tr>";
        }
        pitching_table += "</table>";       
    }
    //Ending of Statistics Tables
    
    //Beginning of Upcoming Games Tables
    //This process works almost the same as the tables for pitching and hitting stats, just with games. 

    //These arrays are for the IDs for the JSON file (upcoming_games_names) and the headers for the table (upcoming_games)
    var upcoming_games_names = ["date", "home", "away", "time", "venue"];
    var upcoming_games = ["Date", "Home Team", "Away Team", "Start Time", "Ballpark"];

    //For Loop to add headers to the table
    var upcoming_games_table = "<table><tr>"
    for (let i = 0; i < upcoming_games_names.length; i++){
        var cell = upcoming_games[i];
        upcoming_games_table += "<td>" + cell + "</td>";
    }

    //For Loop to add the games to the table
    for (let i = 0; i < upcoming.length; i++){
        upcoming_games_table += "<tr>";
        for (let j = 0; j < upcoming_games_names.length; j++){
            var cell = upcoming[i][upcoming_games_names[j]];
            upcoming_games_table += "<td>" + cell + "</td>";
        }
    }

    const hitting_table_header = "Hitting Statistics"
    const pitching_table_header = "Pitching Statistics"
    //Ending of Upcoming Games Tables

    //Because of Shohei Ohtani, I needed a way to display both tables on a player card. These two Ifs resolve the problem.
    //If either of the arrays for hitting or pitching stats are empty, we replace the table with a string stating no data is available.
    if (hitting_stats.length <= 0){
        hitting_table = "No Hitting Data Available";
    }
    if (pitching_stats.length <= 0){
        pitching_table = "No Pitching Data Available"
    }

    //Building the InnerHTML to add text and the player image to the card
    const playerstatsInnerHTML = `
        <div class="player-img-card-container">
            <div style="display:inline-block; vertical-align: middle;" class="img-container">
                <img align="middle" src=${image} alt="${full_name}" style="max-width:100px; max-height:200px; ">
            </div>
            <h3 style="font-size: 16px;">${full_name}</h3>
            <h3 style="font-size: 12px;">${pos}</h3>
            <h3 style="font-size: 12px;">${ht_wt}</h3>
            <h3 style="font-size: 12px;">${throws_bats}</h3>
            <h3 style="font-size: 12px;">${org_lvl}</h3>
            <h3 style="font-size: 12px;">${clb}</h3>
        </div>
            <div style="display:inline-block;" class="statistics">
                <h3 style="font-size: 16px">${hitting_table_header}</h3>
                <h4>${hitting_table}</h4>
                <h3 style="font-size: 16px">${pitching_table_header}</h3>
                <h4>${pitching_table}</h4>
                <h3 style="font-size: 16px">Upcoming Games</h3>
                <h4>${upcoming_games_table}</h4>
            </div>
    `;

    //Adding the InnterHTML to the player's existing HTML, then appending the playerEl to the container
    playerEl.innerHTML = playerstatsInnerHTML;

    player_stats_container.appendChild(playerEl);
}

//End of Player Card Stats

//fetchplayers_reports displays all player cards on load of the page - works exactly the same as fetchplayers
//Calls getplayer_reports for each item in the json file
//This isn't used in the JS file since it mirrors the initial fetchplayers function
//It is more of a placeholder function in case I wish to use it later (or for testing purposes)
const fetchplayers_reports = async () => {
    for (let i = 0; i < players_count; i++) {
        await getplayer_reports(i);
    }
}

//getplayer grabs a player based on their passed in ID number to then call createplayerCard_reports
//Receives ID from fetchplayers_reports - works the same as getplayer
const getplayer_reports = async id => {
    const player = json[id];
    createplayerCard_reports(player);
}

//Creating Player Cards with Statistics Functionality
//Receives player from getplayer_reports, which has access to all elements in the JSON file based on ID
//Works the same as createplayercard but with additional statistics on the player
//This only gets called when we are doing our detailed searches in the web application
const createplayerCard_reports = (player) => {
    //Beginning of the creation of an individual player card
    const playerEl = document.createElement('div');
    playerEl.classList.add('player');

    //Defining the constants to use in card creation - all of these come from the JSON file for each player
    const use_name = player["use_name"];
    const last_name = player["last_name"];
    const image = player["image"];
    const position = player["position"];
    const height_feet = player["height_feet"];
    const height_inches = player["height_inches"];
    const weight = player["weight"];
    const throws = player["throws"];
    const bats = player["bats"];
    const organization = player["organization"];
    const club = player["club"];
    const level = player["level"];
    const reports = player["reports"];          //MDA - Multi-Dimensional Array - I needed to remember these stats were multiple layers deep


    //Building the constants to use in the player card
    const full_name = use_name + " " + last_name;
    const pos = "Position: " + position;

    //Here, since some players have "null" listed for their heights (inches), we need to handle this using an If-Else
    let ht_wt = "";
    if (height_inches === null){
        ht_wt = "HT/WT: " + height_feet + "'0\"/" + weight + "lbs";
    }else{
        ht_wt = "HT/WT: " + height_feet + "'" + height_inches + '"/' + weight + "lbs";
    }

    const throws_bats = "THR/BAT: " + throws + "/" + bats;
    const org_lvl = "ORG/LVL: " + organization + "/" + level;
    const clb = "Club: " + club;

    //Since both the primary and secondary colors lists have ids that line up with a player's organization,
    //we can use the org name to set primary and secondary colors
    const primary_color = primary_colors[organization]
    const secondary_color = secondary_colors[organization]

    playerEl.style.backgroundColor = primary_color;
    playerEl.style.color = secondary_color;
    

    //Defining all our Table Headers and array variable names
    var reports_names = ["scout", "summary", "tools", "date"];

    var pitching_reports_names = ["fastball_present", "fastball_future", "curveball_present", "curveball_future", "slider_present", 
    "slider_future", "changeup_present", "changeup_future", "command_present", "command_future"];

    var hitting_reports_names = ["hitting_present", "hitting_future", "power_present", "power_future", "speed_present", 
    "speed_future", "arm_present", "arm_future", "fielding_present", "fielding_future"];
    
    var pitching_reports_headers = ["Date", "Cur. FB", "Fut. FB", "Cur. CB", "Fut. CB", "Cur. SLD", 
    "Fut. SLD", "Cur. CHG", "Fut. CHG", "Cur. CMD", "Fut. CMD"];

    var hitting_reports_headers = ["Date", "Cur. HIT", "Fut. HIT", "Cur. PWR", "Fut. PWR", "Cur. SPD", 
    "Fut. SPD", "Cur. ARM", "Fut. ARM", "Cur. FLD", "Fut. FLD"];

    //We need to know when we have a pitcher or hitter for the table since everyone only has one set of skills reports
    var stat_table = "<table><tr>";
    var report_table = "";
    var hitter_bool = false;
    var pitcher_bool = false;

    //In order to figure out if we have a pitcher or hitter, we have a simple if-else statement here
    if ((position === "RHS") || (position === "LHS") || (position === "RHR") || (position === "LHR")){
        pitcher_bool = true;
    }else{
        hitter_bool = true;
    }

    //If-else to add headers to the stats table
    if(pitcher_bool){
        for (let k = 0; k < pitching_reports_headers.length; k++){
            var cell = pitching_reports_headers[k];
            stat_table += "<td>" + cell + "</td>";
        }
    }
    if(hitter_bool){
        for (let k = 0; k < hitting_reports_headers.length; k++){
            var cell = hitting_reports_headers[k];
            stat_table += "<td>" + cell + "</td>";
        }
    }

    //building of our tables
    for (let i = 0; i < reports.length; i++){
        for (let j = 0; j < reports_names.length; j++){
            var array_val = reports[i][reports_names[j]]
            if (j == 0){
                report_table += "Scout Name: " + array_val + "\n\n";
            }else if (j == 1){
                report_table += "Summary: \n" + array_val.replace(/.{125}/g, '$&\n') + "\n\n";
            }else if (j == 2){
                //We need to add the date to each row so we know when the stats were gathered/what report they were listed in
                stat_table += "<tr>"; 
                var cell_date = reports[i]["date"];
                stat_table += "<td>" + cell_date + "</td>"
                if(pitcher_bool){
                    for (let m = 0; m < pitching_reports_names.length; m++){
                        var cell = reports[i][reports_names[j]][pitching_reports_names[m]];
                        stat_table += "<td>" + cell + "</td>";
                    }
                }                             
                if(hitter_bool){
                    for (let m = 0; m < hitting_reports_names.length; m++){
                        var cell = reports[i][reports_names[j]][hitting_reports_names[m]];
                        stat_table += "<td>" + cell + "</td>";
                    }
                }
            }else if (j == 3){
                report_table += "Date Report Written: " + array_val + "\n\n";
            }
        }
    }
    stat_table += "</table>"


    //Building the InnerHTML to add text and the player image to the card
    const playerstatsInnerHTML = `
        <div class="player-img-card-container">
            <div style="display:inline-block; vertical-align: middle;" class="img-container">
                <img align="middle" src=${image} alt="${full_name}" style="max-width:100px; max-height:200px; ">
            </div>
            <h3 style="font-size: 18px;">${full_name}</h3>
            <h3 style="font-size: 14px;">${pos}</h3>
            <h3 style="font-size: 14px;">${ht_wt}</h3>
            <h3 style="font-size: 14px;">${throws_bats}</h3>
            <h3 style="font-size: 14px;">${org_lvl}</h3>
            <h3 style="font-size: 14px;">${clb}</h3>
        </div>
            <pre style="display:inline-block;" class="reports">
                <h3 style="font-size: 20px; text-align: center;">Scouted Statistics</h3>
                <h4 style="font-size: 16px; text-align: center;">${stat_table}</h4>
                <h3 style="font-size: 20px; text-align: center;">Scouting Reports</h3>
                <h4 style="font-size: 14px">${report_table}</h4>
            </pre>
    `;

    //Adding the InnterHTML to the player's existing HTML, then appending the playerEl to the container
    playerEl.innerHTML = playerstatsInnerHTML;

    player_stats_container.appendChild(playerEl);
}

//End of Player Card Stats


//On Application Load, show all the players
fetchplayers();

//For testing purposes (checking the display of cards in the app)
// fetchplayers_stats();
// fetchplayers_reports();

//Begin of Searching
//I built in multiple searching algorithms to provide some different options for a user
//Those three options are name based search, team/position based search, and a limited statistic based search

//Beginning of Searching by Name
//Defining of Constants/Variables
const search_btn = document.getElementById('submit');
let search_input = "";

//Adding Event Listener to our search button
search_btn.addEventListener('click', () => {
    //We clear the containers with all the players initially here with these two loops

    while(player_container.lastElementChild){
        player_container.removeChild(player_container.lastElementChild)
    }

    while(player_stats_container.lastElementChild){
        player_stats_container.removeChild(player_stats_container.lastElementChild)
    }

    //Getting the user's search input from the search bar
    search_input = document.getElementById('input').value;
    search_input = search_input.toLowerCase();

    if (search_input === ""){
        fetchplayers();
    }

    //For Loop to search for players who's names are exact matches in some capacity
    //That capacity is either: First Name, Last Name, Use Name, Full Formal Name, and Full Preferred Name
    for (let i = 0; i < players_count; i++){

        let formal_name = json[i]["first_name"] + " " + json[i]["last_name"].toLowerCase();
        let pref_name = json[i]["use_name"] + " " + json[i]["last_name"].toLowerCase();

        if (json[i]["first_name"].toLowerCase() === search_input){
            getplayer_stats(i);
        }else if (json[i]["use_name"].toLowerCase() === search_input){
            getplayer_stats(i);
        }else if (json[i]["last_name"].toLowerCase() === search_input){
            getplayer_stats(i);
        }else if (formal_name === search_input){
            getplayer_stats(i);
        }else if (pref_name === search_input){
            getplayer_stats(i);
        }
    }
});

const search_reports_btn = document.getElementById("submit_reports");
search_reports_btn.addEventListener('click', () => {
    //We clear the containers with all the players initially here with these two loops

    while(player_container.lastElementChild){
        player_container.removeChild(player_container.lastElementChild)
    }

    while(player_stats_container.lastElementChild){
        player_stats_container.removeChild(player_stats_container.lastElementChild)
    }

    //Getting the user's search input from the search bar
    search_input = document.getElementById('input').value;
    search_input = search_input.toLowerCase();

    if (search_input === ""){
        fetchplayers();
    }

    //For Loop to search for players who's names are exact matches in some capacity
    //That capacity is either: First Name, Last Name, Use Name, Full Formal Name, and Full Preferred Name
    for (let i = 0; i < players_count; i++){

        let formal_name = json[i]["first_name"] + " " + json[i]["last_name"].toLowerCase();
        let pref_name = json[i]["use_name"] + " " + json[i]["last_name"].toLowerCase();

        if (json[i]["first_name"].toLowerCase() === search_input){
            getplayer_reports(i);
        }else if (json[i]["use_name"].toLowerCase() === search_input){
            getplayer_reports(i);
        }else if (json[i]["last_name"].toLowerCase() === search_input){
            getplayer_reports(i);
        }else if (formal_name === search_input){
            getplayer_reports(i);
        }else if (pref_name === search_input){
            getplayer_reports(i);
        }
    }
});

//End of Searching


//Reset Search Function
//Function to reset our search and reload all the player cards onto the page
const reset_btn = document.getElementById('reset');
const search_bar = document.getElementById('input');
reset_btn.addEventListener('click', () => {
    //We clear the containers with all the players initially here with these two loops
    while(player_container.lastElementChild){
        player_container.removeChild(player_container.lastElementChild)
    }
    while(player_stats_container.lastElementChild){
        player_stats_container.removeChild(player_stats_container.lastElementChild)
    }
    search_bar.value = ""
    fetchplayers();
});
//End Reset Search


//Filtering of Players by Team and/or position
//Here we are filtering by either team, position, or both
//Defining of constants/variables
const tf_dd = document.getElementById("team-filter");
const pf_dd = document.getElementById("position-filter");
const filter_btn = document.getElementById("filter");
let team_input = "";
let pos_input = "";

//Adding the Event Listener to our Filter Button
filter_btn.addEventListener('click', () => {
    //We clear the containers with all the players initially here with these two loops
    while(player_container.lastElementChild){
        player_container.removeChild(player_container.lastElementChild)
    }
    while(player_stats_container.lastElementChild){
        player_stats_container.removeChild(player_stats_container.lastElementChild)
    }

    team_input = tf_dd.value;
    pos_input = pf_dd.value;
    
    //If both inputs are empty, we simply add every player back to the page
    if ((team_input === "EMPTY") && (pos_input === "EMPTY")){
        while(player_container.lastElementChild){
            player_container.removeChild(player_container.lastElementChild)
        }
        fetchplayers();
    }

    //If the inputs aren't empty (for either one of them), we enter a for loop to search for players that meet the criteria

    if ((team_input != "EMPTY") || (pos_input != "EMPTY")){
        for (let i = 0; i < players_count; i++){
            if ((team_input !== "EMPTY") && (pos_input !== "EMPTY")){
                if ((team_input === json[i]["organization"]) && (pos_input === json[i]["position"])){
                    getplayer_stats(i);
                }
            }else if (team_input !== "EMPTY"){
                if (team_input === json[i]["organization"]){
                    getplayer_stats(i);
                }
            }else if (pos_input !== "EMPTY"){
                if (pos_input === json[i]["position"]){
                    getplayer_stats(i);
                }
            }
        }
    }
});

const filter_reports_btn = document.getElementById("filter_reports");
filter_reports_btn.addEventListener('click', () => {
    //We clear the containers with all the players initially here with these two loops
    while(player_container.lastElementChild){
        player_container.removeChild(player_container.lastElementChild)
    }
    while(player_stats_container.lastElementChild){
        player_stats_container.removeChild(player_stats_container.lastElementChild)
    }

    team_input = tf_dd.value;
    pos_input = pf_dd.value;
    
    //If both inputs are empty, we simply add every player back to the page
    if ((team_input === "EMPTY") && (pos_input === "EMPTY")){
        while(player_container.lastElementChild){
            player_container.removeChild(player_container.lastElementChild)
        }
        fetchplayers();
    }

    //If the inputs aren't empty (for either one of them), we enter a for loop to search for players that meet the criteria

    if ((team_input != "EMPTY") || (pos_input != "EMPTY")){
        for (let i = 0; i < players_count; i++){
            if ((team_input !== "EMPTY") && (pos_input !== "EMPTY")){
                if ((team_input === json[i]["organization"]) && (pos_input === json[i]["position"])){
                    getplayer_reports(i);
                }
            }else if (team_input !== "EMPTY"){
                if (team_input === json[i]["organization"]){
                    getplayer_reports(i);
                }
            }else if (pos_input !== "EMPTY"){
                if (pos_input === json[i]["position"]){
                    getplayer_reports(i);
                }
            }
        }
    }
});

//End of Filtering by Team/Position


//The last set of filtering based on statistics is a bit complex.
//First, we need our radio buttons to determine if we want statistics that are greater than/equal to a value or less than/equal to a value
const radioButtonGT1 = document.getElementById("stat_one_GTET");
const radioButtonGT2 = document.getElementById("stat_two_GTET");
const radioButtonGT3 = document.getElementById("stat_three_GTET");
const radioButtonLT1 = document.getElementById("stat_one_LTET");
const radioButtonLT2 = document.getElementById("stat_two_LTET");
const radioButtonLT3 = document.getElementById("stat_three_LTET");

//Now, we need to make sure both buttons for one statistic can't be checked at the same time
//This functionality flips all the buttons off if their matching pair is checked on
radioButtonGT1.addEventListener("click", ()=>{
    radioButtonLT1.checked = false;
});
radioButtonGT2.addEventListener("click", ()=>{
    radioButtonLT2.checked = false;
})
radioButtonGT3.addEventListener("click", ()=>{
    radioButtonLT3.checked = false;
})
radioButtonLT1.addEventListener("click", ()=>{
    radioButtonGT1.checked = false;
})
radioButtonLT2.addEventListener("click", ()=>{
    radioButtonGT2.checked = false;
})
radioButtonLT3.addEventListener("click", ()=>{
    radioButtonGT3.checked = false;
})

//Now we need our constants from the page that are the drop downs and value bars
const filter_stats_btn = document.getElementById("stats_filter");
const position_search = document.getElementById("hp_filter");
const stat_one_selected = document.getElementById("stat_filter_one");
const stat_two_selected = document.getElementById("stat_filter_two");
const stat_three_selected = document.getElementById("stat_filter_three");
const stat_one_val = document.getElementById("stat_one_val");
const stat_two_val = document.getElementById("stat_two_val");
const stat_three_val = document.getElementById("stat_three_val");

//We also need a large number of variables to catch every potential combination of radio buttons being flipped on
let position_input = "";
let stat_one_id = "";
let stat_two_id = "";
let stat_three_id = "";
let stat_one_num = 0;
let stat_two_num = 0;
let stat_three_num = 0;
let stat_one_greater = false;
let stat_one_lesser = false;
let stat_two_greater = false;
let stat_two_lesser = false;
let stat_three_greater = false;
let stat_three_lesser = false;
let occurance = false;

//Adding Event Listener to our button
filter_stats_btn.addEventListener("click", ()=>{
    //We clear the containers with all the players initially here with these two loops
    while(player_container.lastElementChild){
        player_container.removeChild(player_container.lastElementChild)
    }
    while(player_stats_container.lastElementChild){
        player_stats_container.removeChild(player_stats_container.lastElementChild)
    }

    //assigning all the variables values
    position_input = position_search.value;
    stat_one_id = stat_one_selected.value;
    stat_two_id = stat_two_selected.value;
    stat_three_id = stat_three_selected.value;

    //since our search bars pull in text, we want to parse the strings into numbers to do comparisons
    stat_one_num = parseFloat(stat_one_val.value);
    stat_two_num = parseFloat(stat_two_val.value);
    stat_three_num = parseFloat(stat_three_val.value);

    stat_one_greater = radioButtonGT1.checked;
    stat_one_lesser = radioButtonLT1.checked;
    stat_two_greater = radioButtonGT2.checked;
    stat_two_lesser = radioButtonLT2.checked;
    stat_three_greater = radioButtonGT3.checked;
    stat_three_lesser = radioButtonLT3.checked;

    //For the following If statements with nested For Loops, the Too Long, Didn't Read (TLDR) explanation is the following:
    //We only enter a for loop if all conditions in the If statement are met
    //We are looking for a single occurance of a combination of statistics within a player's stat line
    //For example, if I am looking for a hitter who had an average above or equal to 0.250, a slugging above or equal to 0.400, and an OPS of above or greater than 1.000,
    //I am looking for only one single instance of this throughout their stats.
    //This is because there are instances where players are brought up/sent down from/to Minor League teams and could have awkward stats for a full year.
    //We also know that Triple-A players could be very good with the aforementioned statline in the majors, so it is fair to look for just a single occurance of this event

    //If none of the stats radio buttons are checked, just filter based on either hitters or pitchers
    if (!(stat_one_greater) && !(stat_one_lesser) && !(stat_two_greater) && !(stat_two_lesser) && !(stat_three_greater) && !(stat_three_lesser)){
        for (let i = 0; i < players_count; i++){
            if (json[i][position_input].length > 0){
                getplayer_stats(i);
            }
        }
    }

    //If only the first statistic is selected, we only want players filters based on that one stat. Everything else is disregarded
    if ((stat_one_id != "EMPTY") && (stat_two_id === "EMPTY") && (stat_three_id === "EMPTY")){
        for (let i = 0; i < players_count; i++){
            if (json[i][position_input].length > 0){
                for (let j = 0; j < json[i][position_input].length; j++){
                    if (stat_one_greater){
                        if (json[i][position_input][j][stat_one_id] >= stat_one_num){
                            occurance = true;
                        }
                    }else if (stat_one_lesser){
                        if (json[i][position_input][j][stat_one_id] <= stat_one_num){
                            occurance = true;
                        }
                    }
                }       

                if (occurance){
                    getplayer_stats(i);
                }
                occurance = false;
            }
        }
    }

    //If only the second statistic is selected, we only want players filters based on that one stat. Everything else is disregarded
    if ((stat_two_id != "EMPTY") && (stat_one_id === "EMPTY") && (stat_three_id === "EMPTY")){
        for (let i = 0; i < players_count; i++){    
            if (json[i][position_input].length > 0){
                for (let j = 0; j < json[i][position_input].length; j++){
                    if (stat_two_greater){
                        if (json[i][position_input][j][stat_two_id] >= stat_two_num){
                            occurance = true;
                        }
                    }else if (stat_two_lesser){
                        if (json[i][position_input][j][stat_two_id] <= stat_two_num){
                            occurance = true;
                        }
                    }
                }       

                if (occurance){
                    getplayer_stats(i);
                }
                occurance = false;
            }
        }
    }

    //If only the third statistic is selected, we only want players filters based on that one stat. Everything else is disregarded
    if ((stat_three_id != "EMPTY") && (stat_two_id === "EMPTY") && (stat_one_id === "EMPTY")){
        for (let i = 0; i < players_count; i++){
            if (json[i][position_input].length > 0){
                for (let j = 0; j < json[i][position_input].length; j++){
                    if (stat_three_greater){
                        if (json[i][position_input][j][stat_three_id] >= stat_three_num){
                            occurance = true;
                        }
                    }else if (stat_three_lesser){
                        if (json[i][position_input][j][stat_three_id] <= stat_three_num){
                            occurance = true;
                        }
                    }
                }       

                if (occurance){
                    getplayer_stats(i);
                }
                occurance = false;
            }
        }
    }

    //If only two stats are selected, we filter based on those two stats
    if ((stat_one_id != "EMPTY") && (stat_two_id != "EMPTY") && (stat_three_id === "EMPTY")){
        for (let i = 0; i < players_count; i++){
            if (json[i][position_input].length > 0){
                for (let j = 0; j < json[i][position_input].length; j++){
                    if (stat_one_greater){
                        if (stat_two_greater){
                            if ((json[i][position_input][j][stat_one_id] >= stat_one_num) && (json[i][position_input][j][stat_two_id] >= stat_two_num)){
                                occurance = true;
                            }
                        }else if (stat_two_lesser){
                            if ((json[i][position_input][j][stat_one_id] >= stat_one_num) && (json[i][position_input][j][stat_two_id] <= stat_two_num)){
                                occurance = true;
                            }
                        }
                    }else if (stat_one_lesser){
                        if (stat_two_greater){
                            if ((json[i][position_input][j][stat_one_id] <= stat_one_num) && (json[i][position_input][j][stat_two_id] >= stat_two_num)){
                                occurance = true;
                            }
                        }else if (stat_two_lesser){
                            if ((json[i][position_input][j][stat_one_id] <= stat_one_num) && (json[i][position_input][j][stat_two_id] <= stat_two_num)){
                                occurance = true;
                            }
                        }
                    }
                }       

                if (occurance){
                    getplayer_stats(i);
                }
                occurance = false;
            }
        }
    }

    //If only two stats are selected, we filter based on those two stats
    if ((stat_one_id != "EMPTY") && (stat_three_id != "EMPTY") && (stat_two_id=== "EMPTY")){
        for (let i = 0; i < players_count; i++){
            if (json[i][position_input].length > 0){
                for (let j = 0; j < json[i][position_input].length; j++){
                    if (stat_one_greater){
                        if (stat_three_greater){
                            if ((json[i][position_input][j][stat_one_id] >= stat_one_num) && (json[i][position_input][j][stat_three_id] >= stat_three_num)){
                                occurance = true;
                            }
                        }else if (stat_three_lesser){
                            if ((json[i][position_input][j][stat_one_id] >= stat_one_num) && (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                occurance = true;
                            }
                        }
                    }else if (stat_one_lesser){
                        if (stat_three_greater){
                            if ((json[i][position_input][j][stat_one_id] <= stat_one_num) && (json[i][position_input][j][stat_three_id] >= stat_three_num)){
                                occurance = true;
                            }
                        }else if (stat_three_lesser){
                            if ((json[i][position_input][j][stat_one_id] <= stat_one_num) && (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                occurance = true;
                            }
                        }
                    }
                }       

                if (occurance){
                    getplayer_stats(i);
                }
                occurance = false;
            }
        }
    }

    //If only two stats are selected, we filter based on those two stats
    if ((stat_two_id != "EMPTY") && (stat_three_id != "EMPTY") && (stat_one_id=== "EMPTY")){
        for (let i = 0; i < players_count; i++){
            if (json[i][position_input].length > 0){
                for (let j = 0; j < json[i][position_input].length; j++){
                    if (stat_two_greater){
                        if (stat_three_greater){
                            if ((json[i][position_input][j][stat_two_id] >= stat_one_num) && (json[i][position_input][j][stat_three_id] >= stat_three_num)){
                                occurance = true;
                            }
                        }else if (stat_three_lesser){
                            if ((json[i][position_input][j][stat_two_id] >= stat_one_num) && (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                occurance = true;
                            }
                        }
                    }else if (stat_two_lesser){
                        if (stat_three_greater){
                            if ((json[i][position_input][j][stat_two_id] <= stat_one_num) && (json[i][position_input][j][stat_three_id] >= stat_three_num)){
                                occurance = true;
                            }
                        }else if (stat_three_lesser){
                            if ((json[i][position_input][j][stat_two_id] <= stat_one_num) && (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                occurance = true;
                            }
                        }
                    }
                }       

                if (occurance){
                    getplayer_stats(i);
                }
                occurance = false;
            }
        }
    }

    //Only if all three are checked do we do a full search on all of them
    if((stat_one_id != "EMPTY") && (stat_two_id != "EMPTY") && (stat_three_id != "EMPTY")){
        for (let i = 0; i < players_count; i++){
            if (json[i][position_input].length > 0){
                for (let j = 0; j < json[i][position_input].length; j++){
                    if (stat_one_greater){
                        if (stat_two_greater){
                            if (stat_three_greater){
                                if ((json[i][position_input][j][stat_one_id] >= stat_one_num) && 
                                (json[i][position_input][j][stat_two_id] >= stat_two_num) && 
                                (json[i][position_input][j][stat_three_id] >= stat_three_num)){
                                    occurance = true;
                                }
                            }else if (stat_three_lesser){
                                if ((json[i][position_input][j][stat_one_id] >= stat_one_num) && 
                                (json[i][position_input][j][stat_two_id] >= stat_two_num) && 
                                (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                    occurance = true;
                                }
                            }
                        }else if (stat_two_lesser){
                            if (stat_three_greater){
                                if ((json[i][position_input][j][stat_one_id] >= stat_one_num) && 
                                (json[i][position_input][j][stat_two_id] <= stat_two_num) && 
                                (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                    occurance = true;
                                }
                            }else if (stat_three_lesser){
                                if ((json[i][position_input][j][stat_one_id] >= stat_one_num) && 
                                (json[i][position_input][j][stat_two_id] <= stat_two_num) && 
                                (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                    occurance = true;
                                }
                            }
                        }
                    }else if (stat_one_lesser){
                        if (stat_two_greater){
                            if (stat_three_greater){
                                if ((json[i][position_input][j][stat_one_id] <= stat_one_num) && 
                                (json[i][position_input][j][stat_two_id] >= stat_two_num) && 
                                (json[i][position_input][j][stat_three_id] >= stat_three_num)){
                                    occurance = true;
                                }
                            }else if (stat_three_lesser){
                                if ((json[i][position_input][j][stat_one_id] <= stat_one_num) && 
                                (json[i][position_input][j][stat_two_id] >= stat_two_num) && 
                                (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                    occurance = true;
                                }
                            }
                        }else if (stat_two_lesser){
                            if (stat_three_greater){
                                if ((json[i][position_input][j][stat_one_id] <= stat_one_num) && 
                                (json[i][position_input][j][stat_two_id] <= stat_two_num) && 
                                (json[i][position_input][j][stat_three_id] >= stat_three_num)){
                                    occurance = true;
                                }
                            }else if (stat_three_lesser){
                                if ((json[i][position_input][j][stat_one_id] <= stat_one_num) && 
                                (json[i][position_input][j][stat_two_id] <= stat_two_num) && 
                                (json[i][position_input][j][stat_three_id] <= stat_three_num)){
                                    occurance = true;
                                }
                            }
                        }
                    }
                }
            }

        if (occurance){
            getplayer_stats(i);
        }
        occurance = false;
    }}
});


//Adding a clear filter button for the statistics filter
const clear_filters_btn = document.getElementById('clear_filter');
clear_filters_btn.addEventListener('click', () => {
     //We clear the containers with all the players initially here with these two loops
    while(player_container.lastElementChild){
        player_container.removeChild(player_container.lastElementChild)
    }
    while(player_stats_container.lastElementChild){
        player_stats_container.removeChild(player_stats_container.lastElementChild)
    }
    fetchplayers();
    
    //We want to reset all the values in the search/uncheck all the radio buttons
    radioButtonGT1.checked = false;
    radioButtonGT2.checked = false;
    radioButtonGT3.checked = false;
    radioButtonLT1.checked = false;
    radioButtonLT2.checked = false;
    radioButtonLT3.checked = false;
    stat_one_val.value = "";
    stat_two_val.value = "";
    stat_three_val.value = "";
    position_search.value = "EMPTY"
    stat_one_selected.value = "EMPTY"
    stat_two_selected.value = "EMPTY"
    stat_three_selected.value = "EMPTY"
});

//Adding a clear filter button for the team/position filter
const clear_team_filter_btn = document.getElementById("clear_team_filter");
clear_team_filter_btn.addEventListener('click', () => {
    //We clear the containers with all the players initially here with these two loops
   while(player_container.lastElementChild){
       player_container.removeChild(player_container.lastElementChild)
   }
   while(player_stats_container.lastElementChild){
       player_stats_container.removeChild(player_stats_container.lastElementChild)
   }
   fetchplayers();
   tf_dd.value = "EMPTY";
   pf_dd.value = "EMPTY";
});

