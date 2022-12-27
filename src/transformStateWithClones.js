'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObject, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          if (newObject[prop]) {
            delete newObject[prop];
          }
        }
        break;

      case 'clear':
        newObject = {};
        break;
    }

    result.push({ ...newObject });
  }

  return result;
}

module.exports = transformStateWithClones;
