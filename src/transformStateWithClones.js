'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let previousState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const property in actions[i].extraData) {
          previousState[property] = actions[i].extraData[property];
        }
        break;

      case 'removeProperties':
        for (const property of actions[i].keysToRemove) {
          delete previousState[property];
        }
        break;

      case 'clear':
        previousState = {};
        break;
    }

    states.push({ ...previousState });
  }

  return states;
}

module.exports = transformStateWithClones;
