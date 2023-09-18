'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const stateCloneForms = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(element => delete stateClone[element], {});
        break;

      case 'clear':
        Object.keys(stateClone).forEach(key => delete stateClone[key], {});
        break;

      default:
        throw new Error('Not a valid property!');
    }

    stateCloneForms.push({ ...stateClone });
  }

  return stateCloneForms;
}

module.exports = transformStateWithClones;
