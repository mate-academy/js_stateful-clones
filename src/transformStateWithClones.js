'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let objectBox2 = {};

  Object.assign(objectBox2, state);

  for (let i = 0; i < actions.length; i++) {
    const objectBox = {};

    Object.assign(objectBox, objectBox2);

    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(objectBox, actions[i].extraData);
        objectBox2 = objectBox;
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          if (!objectBox[key]) {
            continue;
          }

          delete objectBox[key];
        }
        objectBox2 = objectBox;
        break;

      case 'clear':
        for (const key in objectBox) {
          delete objectBox[key];
        }
        objectBox2 = objectBox;
        break;

      default:
        break;
    }

    resultArray.push(objectBox);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
