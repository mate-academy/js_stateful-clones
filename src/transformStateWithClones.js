'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let currentState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    let stateCopy = structuredClone(currentState);

    switch (actions[i].type) {
      case 'addProperties':
        const propertiesToAdd = actions[i].extraData;

        Object.assign(stateCopy, { ...propertiesToAdd });
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        stateCopy = currentState;
    }
    stateClones.push(stateCopy);
    currentState = stateCopy;
  }

  return stateClones;
}
module.exports = transformStateWithClones;
