'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsQuantity = actions.length;
  const states = [];
  let latestState = { ...state };

  for (let i = 0; i < actionsQuantity; i++) {
    const currentAction = actions[i];

    switch (currentAction.type) {
      case 'clear':
        removeKeys(latestState, Object.keys(latestState));
        break;

      case 'addProperties':
        Object.assign(latestState, currentAction.extraData);
        break;

      case 'removeProperties':
        removeKeys(latestState, currentAction.keysToRemove);
        break;

      default:
        throw new Error(`Action ${currentAction.type} not recognized.`);
    }

    states.push(latestState);
    latestState = { ...latestState }; /* it's most convenient to look at this as
      "breaking the reference chain", not "creating a new object".
    */
  }

  return states;
}

function removeKeys(objectReference, keysToRemove) {
  for (const key of keysToRemove) {
    delete objectReference[key];
  }
}

module.exports = transformStateWithClones;
