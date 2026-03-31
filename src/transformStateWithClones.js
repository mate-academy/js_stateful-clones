'use strict';

// const { act } = require("react");

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let stateCopy = state;

  for (const action of actions) {
    let next;

    if (action.type === 'addProperties') {
      next = { ...stateCopy, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      next = { ...stateCopy };

      for (const key of action.keysToRemove) {
        delete next[key];
      }
    }

    if (action.type === 'clear') {
      next = {};
    }
    history.push(next);
    stateCopy = next;
  }

  return history;
}
module.exports = transformStateWithClones;
