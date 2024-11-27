'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultWithClone = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateClone[key]);
        break;

      case 'clear':
        Object.keys(stateClone).forEach(key => delete stateClone[key]);
        break;

      default:
        window.alert('type error');
    }

    resultWithClone.push(Object.assign({}, stateClone));
  }

  return resultWithClone;
}

module.exports = transformStateWithClones;
