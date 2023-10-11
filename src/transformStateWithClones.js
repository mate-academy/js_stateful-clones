'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const stateCopy = { ...state };

  for (const step of actions) {
    switch (step.type) {
      case 'addProperties':
        Object.assign(stateCopy, step.extraData);
        resultArray.push({ ...stateCopy });
        break;
      case 'removeProperties':
        for (const key of step.keysToRemove) {
          delete stateCopy[key];
        }
        resultArray.push({ ...stateCopy });
        break;

      case 'clear':
        for (const stateKey in stateCopy) {
          delete stateCopy[stateKey];
        }
        resultArray.push({ ...stateCopy });
        break;

      default:
        return 'Error';
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
