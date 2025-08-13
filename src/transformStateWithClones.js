'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let currentState = structuredClone(state);

  for (let i = 0; i < actions.length; i++) {
    const stateClone = structuredClone(currentState);

    switch (actions[i].type) {
      case 'addProperties':
        const propertiesToAdd = actions[i].extraData;

        Object.assign(stateClone, { ...propertiesToAdd });
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }
    stateClones.push(stateClone);
    currentState = stateClone;
  }

  return stateClones;
}
module.exports = transformStateWithClones;
