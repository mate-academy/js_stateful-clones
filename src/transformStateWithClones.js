'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        for (const value in object.extraData) {
          Object.assign(stateCopy, { [value]: object.extraData[value] });
        }
        break;
      case 'removeProperties':
        for (const value of object.keysToRemove) {
          delete stateCopy[value];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`Unknown action type: ${object.type}`);
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
