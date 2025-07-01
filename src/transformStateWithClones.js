'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const snapshots = [];

  actions.forEach(({ type, extraData, keysToRemove }) => {
    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      case 'clear':
        currentState = {};
        break;
    }

    snapshots.push({ ...currentState });
  });

  return snapshots;
}

module.exports = transformStateWithClones;
