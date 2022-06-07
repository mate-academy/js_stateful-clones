'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const myActions = [];
  let cloneState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const item of keysToRemove) {
          delete cloneState[item];
        }
        break;

      case 'clear':
        cloneState = {};
        break;
    }

    myActions.push({ ...cloneState });
  }

  return myActions;
}

module.exports = transformStateWithClones;
