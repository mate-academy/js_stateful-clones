'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const history = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        clone = { ...clone, ...extraData };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        clone = {};
        break;
    }
    history.push({ ...clone });
  }

  return history;
}

module.exports = transformStateWithClones;
