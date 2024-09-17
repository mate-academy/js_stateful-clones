'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [Object.assign({}, state)];

  for (const action of actions) {
    let stateCopy = Object.assign({}, stateClones[stateClones.length - 1]);

    switch (action.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy, ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error('Invalid action type');
    }

    stateClones.push(stateCopy);
  }

  return stateClones.slice(1);
}

module.exports = transformStateWithClones;
