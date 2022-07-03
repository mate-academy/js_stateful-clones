'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versState = [];
  const copyState = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'clear':
        for (const prop of Object.getOwnPropertyNames(copyState)) {
          delete copyState[prop];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;
    }
    versState.push({ ...copyState });
  });

  return versState;
}

module.exports = transformStateWithClones;
