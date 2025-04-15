'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const modifiedState = { ...state };

  const arrOfObjects = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          modifiedState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in modifiedState) {
            delete modifiedState[key];
          }
        }
        break;
      case 'clear':
        for (const key in modifiedState) {
          delete modifiedState[key];
        }
        break;

      default:
        break;
    }

    const changingProperties = Object.assign({}, modifiedState);

    arrOfObjects.push(changingProperties);
  }

  return arrOfObjects;
}

module.exports = transformStateWithClones;
