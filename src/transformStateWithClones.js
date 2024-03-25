'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCondition = [];
  let currentState = { ...state };

  for (const currentAction of actions) {
    const { type, extraData, keysToRemove } = currentAction;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Wrong typфe of action!');
    }
    stateCondition.push({ ...currentState });
  }

  return stateCondition;
}
module.exports = transformStateWithClones;
