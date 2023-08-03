'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArr = [];
  const createNewObj = (obj) => {
    const newObj = resultArr.length === 0
      ? Object.assign({ ...state })
      : Object.assign({ ...resultArr[resultArr.length - 1] });

    return newObj;
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        resultArr.push(Object.assign(createNewObj(state), action.extraData));
        break;
      }

      case 'removeProperties': {
        resultArr.push(createNewObj(state));

        for (const keyToRemove of action.keysToRemove) {
          delete resultArr[resultArr.length - 1][keyToRemove];
        }

        break;
      }

      case 'clear': {
        resultArr.push({});
        break;
      }

      default:
        throw new Error('Something went wrong');
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
