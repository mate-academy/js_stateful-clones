'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const transformaitinState = [];

  for (const action of actions) {
    cloneState = { ...cloneState };
    transformaitinState.push(cloneState);

    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          if (cloneState.hasOwnProperty(key)) {
            delete cloneState[key];
          }
        }
    }
  }

  return transformaitinState;
}

module.exports = transformStateWithClones;
