'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultedArray = [];

  for (const action of actions) {
    const type = action.type;
    const lastChangedObject = resultedArray.at(-1) || state;
    const resultObject = Object.assign(resultObject, lastChangedObject);

    switch (type) {
      case 'addProperties': {
        Object.assign(resultObject, action.extraData);
        break;
      }

      case 'removeProperties': {
        removeProperties(action, resultObject);
        break;
      }
      case 'clear':
        resultObject = {};
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    resultedArray.push(resultObject);
  }

  return resultedArray;
}

module.exports = transformStateWithClones;

function removeProperties(action, resultObject) {
  action.keysToRemove.forEach((key) => {
    delete resultObject[key];
  });
}
