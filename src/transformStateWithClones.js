'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATECOPY = {};

  Object.assign(STATECOPY, state);

  const modificationsHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(STATECOPY, action.extraData);

      const STATESARRAY = { ...STATECOPY };

      modificationsHistory.push(STATESARRAY);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete STATECOPY[key];
      }

      const STATESARRAY = { ...STATECOPY };

      modificationsHistory.push(STATESARRAY);
    }

    if (action.type === 'clear') {
      for (const key in STATECOPY) {
        delete STATECOPY[key];
      }

      const STATESARRAY = { ...STATECOPY };

      modificationsHistory.push(STATESARRAY);
    }
  }

  return modificationsHistory;
}

module.exports = transformStateWithClones;
