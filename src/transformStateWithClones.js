'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const resultTransform = [];

  for (const ob in actions) {
    const action = actions[ob];

    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }

        break;
      default:
        return {};
    }
    resultTransform.push({ ...copyState });
  }

  return resultTransform;
}
module.exports = transformStateWithClones;
