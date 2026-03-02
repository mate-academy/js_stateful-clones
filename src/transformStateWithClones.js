'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const PROP_NAME_DELETE = 'removeProperties';
  const PROP_NAME_ADD = 'addProperties';
  const PROP_NAME_CLEAR = 'clear';
  const statesHistory = [];

  const currentState = Object.assign({}, state);

  actions.forEach((v) => {
    const { type, extraData, keysToRemove } = v;

    switch (type) {
      case PROP_NAME_CLEAR:
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
      case PROP_NAME_ADD:
        const keysOfState = Object.keys(extraData);

        for (const key of keysOfState) {
          currentState[key] = extraData[key];
        }
        break;
      case PROP_NAME_DELETE:
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        return [];
    }
    statesHistory.push(Object.assign({}, currentState));
  });

  return statesHistory;
}

module.exports = transformStateWithClones;
