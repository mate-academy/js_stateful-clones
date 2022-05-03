'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const objectBox = {};

  Object.assign(objectBox, state);

  for (let i = 0; i < actions.length; i++) {


    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(objectBox, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          if (!objectBox[key]) {
            continue;
          }

          delete objectBox[key];
        }
        break;

      case 'clear':
        for (const key in objectBox) {
          delete objectBox[key];
        }
        break;

      default:
        break;
    }

    resultArray.push({ ...objectBox });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
