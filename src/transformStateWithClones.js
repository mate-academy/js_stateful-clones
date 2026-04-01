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

    switch (action.type) {
      case 'addProperties':
        next = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        next = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete next[key];
        }
        break;

      case 'clear':
        next = {};
        break;

      default:
        next = { ...stateCopy };
    }
    history.push(next);
    stateCopy = next;
  }

  return history;
}
module.exports = transformStateWithClones;
