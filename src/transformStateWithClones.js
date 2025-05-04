'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let history = [];

  for (const action of actions) {
    const prevState = history.length === 0 ? state : history.at(-1);
    let newState = { ...prevState };

    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        newState[key] = value;
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    if (action.type === 'clear') {
      newState = {};
    }

    history.push(newState);
  }

  return history;
}

module.exports = transformStateWithClones;
