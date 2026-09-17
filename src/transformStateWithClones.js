'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resultTable = [];

  for (const x of actions) {
    let newState = {};

    switch (x.type) {
      case 'addProperties':
        if (x.extraData !== null) {
          for (const i in x.extraData) {
            stateCopy[i] = x.extraData[i];
          }
        }
        newState = { ...stateCopy };
        break;
      case 'removeProperties':
        for (const i of x.keysToRemove) {
          delete stateCopy[i];
        }
        newState = { ...stateCopy };
        break;
      case 'clear':
        for (const element in stateCopy) {
          delete stateCopy[element];
        }
        newState = {};
        break;
      default:
        return 'Problem accured';
    }

    resultTable.push(newState);
  }

  return resultTable;
}

module.exports = transformStateWithClones;
