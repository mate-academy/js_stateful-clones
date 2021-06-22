'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = {
    ...state,
  };

  const transformedStateWithClones = [];

  for (const force of actions) {
    switch (force.type) {
      case 'addProperties':
        Object.assign(cloneState, force.extraData);
        break;

      case 'removeProperties':
        for (const key of force.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
    }

    transformedStateWithClones.push({
      ...cloneState,
    });
  }

  return transformedStateWithClones;
}

module.exports = transformStateWithClones;
