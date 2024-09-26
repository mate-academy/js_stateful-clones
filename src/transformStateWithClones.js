'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const arrayState = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        const { extraData } = action;

        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        keysToRemove.forEach(key => delete copyState[key]);
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        };
        break;

      default:
        break;
    }
    arrayState.push(Object.assign({}, copyState));
  };

  return arrayState;
}

module.exports = transformStateWithClones;
