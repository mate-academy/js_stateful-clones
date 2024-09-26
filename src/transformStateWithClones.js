'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = Object.assign({}, state);
  const history = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;

      case 'addProperties':
        Object.assign(copy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copy[key];
        }
        break;

      default:
        throw new Error(`Unknown action type ${type}`);
    }

    history.push({ ...copy });
  }

  return history;
}

module.exports = transformStateWithClones;
