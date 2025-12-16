'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        delete copy[property];
      }
    }

    if (action.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }

    const change = { ...copy };

    history.push(change);
  }

  return history;
}

module.exports = transformStateWithClones;
