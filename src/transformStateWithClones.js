'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
      result.push(Object.assign({}, clone));
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(property => {
        delete clone[property];
      });
      result.push(Object.assign({}, clone));
    }

    if (action.type === 'clear') {
      Object.keys(clone).forEach(key => {
        delete clone[key];
      });
      result.push(Object.assign({}, clone));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
