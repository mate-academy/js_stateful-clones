'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = Object.assign({}, state);
  const arrState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        for (const keys in cloneState) {
          delete cloneState[keys];
        }
        break;
    }

    arrState.push({ ...cloneState });
  }

  return arrState;
}

module.exports = transformStateWithClones;
