'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);

        break;
      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          if (newObj[prop]) {
            delete newObj[prop];
          }
        }

        break;
      case 'clear':
        newObj = {};

        break;
    }

    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;
