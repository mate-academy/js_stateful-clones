'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentStateClone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let nextState = { ...currentStateClone };

    switch (type) {
      case 'addProperties':
        nextState = {
          ...currentStateClone,
          ...extraData,
        };
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => delete nextState[key]);
        break;
      case 'clear':
        nextState = {};
        break;
      default:
        break;
    }

    currentStateClone = nextState;
    result.push({ ...nextState });
  }

  return result;
}

module.exports = transformStateWithClones;
