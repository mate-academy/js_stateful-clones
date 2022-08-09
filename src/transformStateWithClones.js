'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let lastState = state;
  const history = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        const stateAdd = Object.assign({}, lastState, extraData);

        lastState = stateAdd;

        history.push(stateAdd);
        break;

      case 'removeProperties':
        const newStateRemove = { ...lastState };

        for (const key of keysToRemove) {
          delete newStateRemove[key];
        };
        lastState = newStateRemove;
        history.push(newStateRemove);
        break;

      case 'clear':
        lastState = {};
        history.push(lastState);
        break;

      default:
        throw new Error(`Uknown action type: ${action.type}`);
    }
  }

  return history;
}

module.exports = transformStateWithClones;
