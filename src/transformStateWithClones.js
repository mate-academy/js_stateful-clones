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
    let resultObject = {};

    switch (type) {
      case 'addProperties': {
        Object.assign(resultObject, lastChangedObject, action.extraData);
        break;
      }

      case 'removeProperties': {
        removeProperties(action, lastChangedObject, resultObject);
        break;
      }
      case 'clear':
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    resultedArray.push(resultObject);
  }

  return resultedArray;
}

module.exports = transformStateWithClones;

function removeProperties(action, previousState, resultObject) {
  Object.assign(resultObject, previousState);

  action.keysToRemove.forEach((key) => {
    delete resultObject[key];
  });
}
