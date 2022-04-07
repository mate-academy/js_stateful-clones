'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let objectBox = {};
  let objectBox2 = {};

  for (const key in state) {
    objectBox2[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    objectBox = {};

    for (const key in objectBox2) {
      objectBox[key] = objectBox2[key];
    }

    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          objectBox[key] = actions[i].extraData[key];
        }
        resultArray.push(objectBox);
        objectBox2 = objectBox;
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          if (!objectBox[key]) {
            continue;
          }

          delete objectBox[key];
        }
        resultArray.push(objectBox);
        objectBox2 = objectBox;
        break;

      case 'clear':
        for (const key in objectBox) {
          delete objectBox[key];
        }
        resultArray.push(objectBox);
        objectBox2 = objectBox;
        break;

      default:
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
