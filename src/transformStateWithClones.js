'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateClones = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateClone.hasOwnProperty(key)) {
            delete stateClone[key];
          }
        }
        break;

      case 'clear':
        for (const key of Object.keys(stateClone)) {
          if (stateClone.hasOwnProperty(key)) {
            delete stateClone[key];
          }
        }
        break;

      default:
        return new Error('Oops, something went wrong!');
    }

    stateClones.push({ ...stateClone });
  });

  return stateClones;
}

module.exports = transformStateWithClones;
