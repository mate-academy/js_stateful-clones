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

  for (const singleAction of actions) {
    switch (singleAction.type) {
      case 'addProperties':
        Object.assign(stateClone, singleAction.extraData);
        break;

      case 'removeProperties':
        singleAction.keysToRemove.forEach(el => {
          delete stateClone[el];
        });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
    };

    statefulClones.push({ ...stateClone });
  };

  return statefulClones;
}

module.exports = transformStateWithClones;
