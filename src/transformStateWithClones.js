'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersion = [];
  let copyState = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        copyState = {
          ...copyState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(remove => {
          if (copyState.hasOwnProperty(remove)) {
            delete copyState[remove];
          }
        });
        break;

      case 'clear':
        copyState = {};
        break;
    }

    stateVersion.push({ ...copyState });
  });

  return stateVersion;
}

module.exports = transformStateWithClones;
