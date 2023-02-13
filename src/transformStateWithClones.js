'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [state];

  for (const action of actions) {
    const objectCopy = {};
    const currentObject = resultArr[resultArr.length - 1];

    for (const stateItem in currentObject) {
      objectCopy[stateItem] = currentObject[stateItem];
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(objectCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete objectCopy[keyToRemove];
        }
        break;

      case 'clear':
        for (const objectCopyKey in objectCopy) {
          delete objectCopy[objectCopyKey];
        }
        break;

      default:
        break;
    }

    resultArr.push(objectCopy);
  }

  return resultArr.slice(1, resultArr.length);
}

module.exports = transformStateWithClones;
