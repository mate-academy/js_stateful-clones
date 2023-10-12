'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateClones = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties') :
        Object.assign(stateClone, action.extraData);

        break;

      case ('removeProperties') :
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }

        break;

      case ('clear') :
        stateClone = {};

        break;

      default :
        throw new Error('Wrong action specified');
    }

    stateClones.push({ ...stateClone });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
