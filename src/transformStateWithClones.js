'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let stateClone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        stateClone = {
          ...stateClone,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete stateClone[keyToRemove];
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error(`Unknow action type ${action.type}`);
    }

    states.push({ ...stateClone });
  }

  return states;
}

module.exports = transformStateWithClones;
