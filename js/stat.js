'use strict';

// var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - BAR_GAP * 2;
var playerNameY = CLOUD_HEIGHT - CLOUD_Y + GAP;

var playerTime = 0;
var playerX = 0;
var playerTimeY = 0;
var playerBarY = 0;
var playerBarHeight = 0;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  // ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT); // too boring :)

  ctx.beginPath();
  ctx.moveTo(x, y);

  // Cloud top
  ctx.bezierCurveTo(x, y, x + 30, y - getRandomInt(10, 20), x + 75, y);
  ctx.bezierCurveTo(x + 75, y, x + 120, y - getRandomInt(10, 20), x + 150, y);
  ctx.bezierCurveTo(x + 150, y, x + 185, y - getRandomInt(10, 20), x + 225, y);
  ctx.bezierCurveTo(x + 225, y, x + 270, y - getRandomInt(10, 20), x + 300, y);
  ctx.bezierCurveTo(x + 300, y, x + 325, y - getRandomInt(10, 20), x + 360, y);
  ctx.bezierCurveTo(x + 360, y, x + 410, y - getRandomInt(10, 20), x + 420, y);

  // Cloud right
  ctx.bezierCurveTo(x + 420, y, x + 420 + getRandomInt(30, 70), y + 10, x + 450, y + 50);
  ctx.bezierCurveTo(x + 450, y + 50, x + 450 + getRandomInt(30, 70), y + 75, x + 480, y + 100);
  ctx.bezierCurveTo(x + 480, y + 100, x + 480 + getRandomInt(30, 70), y + 120, x + 510, y + 150);
  ctx.bezierCurveTo(x + 510, y + 150, x + 510 + getRandomInt(30, 70), y + 190, x + 470, y + 230);
  ctx.bezierCurveTo(x + 470, y + 230, x + 470 + getRandomInt(30, 50), y + 250, x + 420, y + 270);

  // Cloud bottom
  ctx.bezierCurveTo(x + 420, y + 270, x + 410, y + 270 + getRandomInt(10, 30), x + 360, y + 270);
  ctx.bezierCurveTo(x + 360, y + 270, x + 330, y + 270 + getRandomInt(10, 30), x + 300, y + 270);
  ctx.bezierCurveTo(x + 300, y + 270, x + 265, y + 270 + getRandomInt(10, 30), x + 225, y + 270);
  ctx.bezierCurveTo(x + 225, y + 270, x + 190, y + 270 + getRandomInt(10, 30), x + 150, y + 270);
  ctx.bezierCurveTo(x + 150, y + 270, x + 120, y + 270 + getRandomInt(10, 30), x + 75, y + 270);
  ctx.bezierCurveTo(x + 75, y + 270, x + 20, y + 270 + getRandomInt(10, 30), x, y + 270);

  // Cloud left
  ctx.bezierCurveTo(x, y + 270, x - getRandomInt(10, 70), y + 250, x - 30, y + 230);
  ctx.bezierCurveTo(x - 30, y + 230, x - 30 - getRandomInt(30, 70), y + 190, x - 60, y + 170);
  ctx.bezierCurveTo(x - 60, y + 170, x - 60 - getRandomInt(30, 70), y + 120, x - 50, y + 100);
  ctx.bezierCurveTo(x - 50, y + 100, x - 50 - getRandomInt(30, 70), y + 75, x - 30, y + 50);
  ctx.bezierCurveTo(x - 30, y + 50, x - 30 - getRandomInt(30, 70), y + 10, x, y);

  ctx.closePath();
  ctx.fill();
};

// find max
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// generate random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// main renderer
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP + FONT_GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + FONT_GAP, CLOUD_Y + BAR_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    playerTime = parseInt(times[i], 10);
    playerX = CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i;
    playerTimeY = CLOUD_Y + BAR_GAP + GAP * 2 + (barHeight - (barHeight * times[i]) / maxTime);
    playerBarY = CLOUD_Y + BAR_GAP + FONT_GAP + GAP + (barHeight - (barHeight * times[i]) / maxTime);
    playerBarHeight = (barHeight * times[i]) / maxTime - GAP;

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], playerX, playerNameY);
    ctx.fillText(playerTime, playerX, playerTimeY);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var opacity = getRandomInt(1, 10) / 10;
      var saturation = getRandomInt(0, 255);
      ctx.fillStyle = 'rgba(0, 0, ' + saturation + ', ' + opacity + ')';
    }

    ctx.fillRect(playerX, playerBarY, BAR_WIDTH, playerBarHeight);
  }
};
