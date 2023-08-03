'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const results = [];

  const createNewObj = (obj, arr) => {
    const newObj = arr.length === 0
      ? Object.assign({ ...obj })
      : Object.assign({ ...arr[arr.length - 1] });

    return newObj;
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        results.push(Object.assign(createNewObj(state,
          results), action.extraData));
        break;
      }

      case 'removeProperties': {
        results.push(createNewObj(state, results));

        action.keysToRemove.forEach(keyToRemove => {
          delete results[results.length - 1][keyToRemove];
        });

        break;
      }

      case 'clear': {
        results.push({});
        break;
      }

      default:
        throw new Error('Something went wrong');
    }
  }

  return results;
}

module.exports = transformStateWithClones;
