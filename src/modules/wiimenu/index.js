const Discord = require("discord.js")
const wiimenu =  (message) => {

const { registerFont, createCanvas, loadImage } = require('canvas');
    registerFont('./assets/FOT-RodinBokutohPro-DB.otf', { family: 'RodinBokutohPro' });
    const width = 1920;
    const height = 1080;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.font = '75px "FOT-RodinBokutoh Pro DB"';

    //vars for time/date
    ctx.textAlign = "center";
    var dateObj = new Date();
    var weekday = dateObj.toLocaleString("default", { weekday: "short" });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const time = Date().slice(16,21);
    today = dd + '/' +  mm;
    loadImage('./assets/wiimenu.png').then((image) => {
        ctx.drawImage(image, 0, 0);
        const buffer = canvas.toBuffer("image/png");
        ctx.fillStyle = "#828282";
        ctx.fillText(weekday + " " + today, 980, 990);
        ctx.fillStyle = "#9b9b9b";
        ctx.fillText(time, 980, 860);
    
        return message.channel.send(new Discord.MessageAttachment(canvas.toBuffer("image/png")));
    });
};

module.exports = wiimenu;