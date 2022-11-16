const config = require('../settings/config.json');
const express = require('express');
const app = express();
const port = 3000 || 8080;

app.all('/', (req, res) => 
  res.send(`<!DOCTYPE html>
<html>
<head> 
<link href="https://fonts.goocom/css?family=Roboto Condensed" rel="stylesheet"> 
<style>
body{
font-family: "Courier New"; 
font-size: 18px; 
background-image: url("https://cdn.discordapp.com/attachments/890504435829178378/957860861425356800/images_3.jpeg");
height: 100%;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
color: #5F9EA0; 
margin-left: 8%; 
margin-top: 5%;
}
a
{
color: #5F9EA0;
}
a:hover{
animation: color_h1 10s infinite;
}
h1
{
font-family: "Garamond";
font-size: 38px;
color: #ff3333;
animation: color_h1 10s infinite;
}
@keyframes color_h1 {
  0%   {color: red;}
  25%  {color: yellow;}
  50%  {color: blue;}
  80% {color: green;}
  100% {color: red;}
}

</style>
</head>
<title>Stack Developers</title>
<link rel="icon" type="image/jpg" href="https://cdn.discordapp.com/attachments/890504435829178378/957867768135430154/icon.jpg"/>
<body> 
<h1>STACK OFFICIAL</h1> 
<p>This bot is a multi purpose bot with moderation, ticket, meme, etc<br/> Invite the bot from <a href="${config.invite}"> Here </a> <br/><br/> This bot is officially developed by <b>BO$$ and RJRYT<br/> check BO$$\'s <a href="https://cruzgaming.ml/"> Website </a><br/> <br/> check RJRYT\'s <a href="https://rjryt.tk/"> Website </a><br/>This bot is powered by STACK DEVELOPMENT<br/><br/> 
<a href="${config.support}"> <img src="https://media.discordapp.net/attachments/890504435829178378/948924128608534548/qI77XcTkhWByGSJx.gif"> </a><br/><br/><i><a href="${config.vote}">vote me</a> Join bot\'s support server from  <a href="${config.support}">Here</a></i></p>
</body>
</html>`));

function k() {
  app.listen(port, () => {
    console.log(`\nΞΞΞΞΞΞΞΞΞΞΞΞ READY TO WAKEUP ΞΞΞΞΞΞΞΞΞΞΞΞ\n`)
  });
}
module.exports = k;

/*
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║                   STACK DEVELOPMENT OFFICIAL SCRIPT                   ║
║                                                                       ║
║                       MANAGED BY RJRYT AND BO$$                       ║
║                                                                       ║
║                 BOTS WITH THIS SCRIPT: ZUA AND WOEBOT                 ║
║                                                                       ║
║                              DEVELOPERS                               ║
║                     1. RJRYT - https://rjryt.tech                     ║
║                     2. BO$$ - https://cruzgaming.ml                   ║
║                                                                       ║
║  Support Server: Stacks Development - https://discord.gg/NzQMqkEjVk   ║
╚═══════════════════════════════════════════════════════════════════════╝
*/