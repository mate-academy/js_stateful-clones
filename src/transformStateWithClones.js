'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transfomedClones = [];
  const clone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    transfomedClones.push(Object.assign({}, clone));
  }

  return transfomedClones;
}

module.exports = transformStateWithClones;
