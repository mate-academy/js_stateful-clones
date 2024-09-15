'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_COPY = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(STATE_COPY, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete STATE_COPY[key];
        }
        break;
      case 'clear':
        for (const key in STATE_COPY) {
          delete STATE_COPY[key];
        }
        break;
    }

    result.push({
      ...STATE_COPY,
    });
  }

  return result;
}

module.exports = transformStateWithClones;
