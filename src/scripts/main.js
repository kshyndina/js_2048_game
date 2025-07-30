'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

let tryLog = [0, 0, 0, 0];
const startButton = document.querySelector('.start');
const started = new Promise((resolve, reject) => {
  startButton.addEventListener('click', () => game.start(resolve), {
    once: true,
  });
});

started.then(() => {
  startButton.addEventListener('click', () => game.restart());
  document.querySelector('.message-start').classList.add('hidden');
});

started.then(() => {
  document.documentElement.addEventListener('keydown', (eve) => {
    switch (eve.key) {
      case 'ArrowLeft': {
        const oldState = [...game.state]
          .reduce((p, c) => [...p, ...c], [])
          .toString();

        game.moveLeft();

        const newState = [...game.state]
          .reduce((p, c) => [...p, ...c], [])
          .toString();

        if (newState !== oldState) {
          game.newCell();
          tryLog = [0, 0, 0, 0];
        } else {
          tryLog[0] = 1;
        }

        break;
      }

      case 'ArrowRight': {
        const oldState = [...game.state]
          .reduce((p, c) => [...p, ...c], [])
          .toString();

        game.moveRight();

        const newState = [...game.state]
          .reduce((p, c) => [...p, ...c], [])
          .toString();

        if (newState !== oldState) {
          game.newCell();
          tryLog = [0, 0, 0, 0];
        } else {
          tryLog[1] = 1;
        }

        break;
      }

      case 'ArrowUp': {
        const oldState = [...game.state]
          .reduce((p, c) => [...p, ...c], [])
          .toString();

        game.moveUp();

        const newState = [...game.state]
          .reduce((p, c) => [...p, ...c], [])
          .toString();

        if (newState !== oldState) {
          game.newCell();
          tryLog = [0, 0, 0, 0];
        } else {
          tryLog[2] = 1;
        }

        break;
      }

      case 'ArrowDown': {
        const oldState = [...game.state]
          .reduce((p, c) => [...p, ...c], [])
          .toString();

        game.moveDown();

        const newState = [...game.state]
          .reduce((p, c) => [...p, ...c], [])
          .toString();

        if (newState !== oldState) {
          game.newCell();
          tryLog = [0, 0, 0, 0];
        } else {
          tryLog[3] = 1;
        }

        break;
      }
    }
    game.getScore();

    if (game.state.some((a) => a.some((b) => b === 2048))) {
      document.querySelector('.message-win').classList.remove('hidden');
    }

    if (tryLog.every((a) => a === 1)) {
      document.querySelector('.message-lose').classList.remove('hidden');
    }
  });
});
