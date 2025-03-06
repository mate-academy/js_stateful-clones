'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  actions.forEach((action) => {
    if (action.type === 'addPropertiess') {
      Object.assign(state, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        delete state[key];
      });
    } else if (action.type === 'clear') {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    }
  });
}

module.exports = transformStateWithClones;
