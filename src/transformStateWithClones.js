'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const command of actions) {
    switch (command.type) {
      case 'addProperties':
        Object.assign(newState, command.extraData);
        break;

      case 'removeProperties':
        for (const names of command.keysToRemove) {
          delete newState[names];
        }
        break;

      case 'clear':
        for (const allPropretys in newState) {
          delete newState[allPropretys];
        }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
