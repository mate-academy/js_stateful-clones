'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let lastState = state;

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties' : {
        const extraData = action.extraData;

        newState = Object.assign({}, lastState, extraData);
        break;
      }

      case 'removeProperties' : {
        const keysToRemove = action.keysToRemove;

        newState = Object.assign({}, lastState);

        for (const i of keysToRemove) {
          delete newState[i];
        }
        break;
      }

      case 'clear' : {
        newState = {};
      }
    }
    clones.push(newState);
    lastState = newState;
  }

  return clones;
}

module.exports = transformStateWithClones;
