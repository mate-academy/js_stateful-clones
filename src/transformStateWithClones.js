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
    const stateClone = statesHistory.length
      ? { ...statesHistory[statesHistory.length - 1] }
      : { ...state };

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach(key => delete stateClone[key]);
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    };

    statesHistory.push(stateClone);
  });

  return statesHistory;
}

module.exports = transformStateWithClones;
