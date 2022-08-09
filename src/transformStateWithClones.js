'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let lastState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const extraData = action.extraData;
        const newState = Object.assign({}, lastState, extraData);

        lastState = newState;
        history.push(newState);

        break;
      }

      case 'removeProperties': {
        const stateRemove = { ...lastState };
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          delete stateRemove[key];
        }
        lastState = stateRemove;
        history.push(stateRemove);

        break;
      }

      case 'clear': {
        lastState = {};
        history.push(lastState);
        break;
      }

      default:
        throw new Error(`Uknown action type: ${action.type}`);
    }
  }

  return history;
}

module.exports = transformStateWithClones;
