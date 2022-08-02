'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];

  actions.forEach(({ type, extraData, keysToRemove }) => {
    const clone = statesHistory.length
      ? { ...statesHistory[statesHistory.length - 1] }
      : { ...state };

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach(key => delete clone[key]);
        break;
      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    };

    statesHistory.push(clone);
  });

  return statesHistory;
}

module.exports = transformStateWithClones;
