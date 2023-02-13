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
    const values = Object.values(action);
    const objectCopy = {};
    const currentObject = resultArr[resultArr.length - 1];

    for (const stateItem in currentObject) {
      objectCopy[stateItem] = currentObject[stateItem];
    }

    switch (true) {
      case values[0] === 'addProperties':
        Object.assign(objectCopy, action.extraData);
        break;

      case values[0] === 'removeProperties':
        for (const el of values[1]) {
          delete objectCopy[el];
        }
        break;

      default:
        for (const el in objectCopy) {
          delete objectCopy[el];
        }
    }

    resultArr.push(objectCopy);
  }

  return resultArr.slice(1, resultArr.length);
}

module.exports = transformStateWithClones;
