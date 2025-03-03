'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let copyState = { ...state };

  for (const obj of actions) {
    let newState = { ...copyState };

    switch (obj.type) {
      case 'addProperties':
        for (const key in obj.extraData) {
          newState[key] = obj.extraData[key];
        }
        break;

      case 'removeProperties':
        for (let i = 0; i < obj.keysToRemove.length; i++) {
          const key = obj.keysToRemove[i];
          if (newState[key] !== undefined) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error('Unknown action type: ' + obj.type);
    }

    copyState = newState;
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
