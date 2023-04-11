'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statefulClones = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(el => {
          delete stateClone[el];
        });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        };
        break;

      default:
        throw new Error('Unknown sctions type.');
    };

    statefulClones.push({ ...stateClone });
  };

  return statefulClones;
}

module.exports = transformStateWithClones;
