'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];

  const currObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          currObj[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const el of action.keysToRemove) {
          if (currObj[el]) {
            delete currObj[el];
          }
        }
        break;

      case 'clear':
        for (const key in currObj) {
          delete currObj[key];
        }
    }

    arr.push({ ...currObj });
  }

  return arr;
}

module.exports = transformStateWithClones;
