'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const newState = {};

  for (const key in state) {
    newState[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    const currentAction = actions[i];

    switch (currentAction.type) {
      case 'addProperties':
        for (const givenProperty in currentAction.extraData) {
          newState[givenProperty] = currentAction.extraData[givenProperty];
        }

        break;

      case 'removeProperties':
        for (const removingProp in currentAction.keysToRemove) {
          delete newState[currentAction.keysToRemove[removingProp]];
        }

        break;

      case 'clear':
        for (const item in newState) {
          delete newState[item];
        }
    }

    clones.push({ ...newState });
  }

  return clones;
}

module.exports = transformStateWithClones;
