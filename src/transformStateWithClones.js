'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const del of action.keysToRemove) {
          delete clone[del];
        }
        break;

      case 'clear':
        Object.keys(clone).forEach(key => delete clone[key]);
    }

    const cloneObject = Object.assign({}, clone);

    result.push(cloneObject);
  }

  return result;
}

module.exports = transformStateWithClones;
