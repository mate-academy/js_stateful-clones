'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const oneTypeObject = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':

        for (const data in action.extraData) {
          oneTypeObject[data] = action.extraData[data];
        }
        break;

      case 'removeProperties':

        for (const key of action.keysToRemove) {
          delete oneTypeObject[key];
        }
        break;

      case 'clear':

        for (const stateKey in oneTypeObject) {
          delete oneTypeObject[stateKey];
        }
        break;
      default:
        throw new Error('Wrong type');
    }
    stateCopy = oneTypeObject;
    resultArray.push(oneTypeObject);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
