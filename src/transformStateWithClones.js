'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfActions = [state];

  for (const key of actions) {
    const lastOfArray = arrayOfActions[arrayOfActions.length - 1];
    const removeProperties = { ...lastOfArray };

    if (key.type === 'clear') {
      arrayOfActions.push({});
    }

    if (key.type === 'removeProperties') {
      for (const n of key.keysToRemove) {
        delete removeProperties[n];
      }
      arrayOfActions.push(removeProperties);
    }

    if (key.type === 'addProperties') {
      arrayOfActions.push(
        Object.assign({}, lastOfArray, key.extraData)
      );
    }
  }
  arrayOfActions.shift();

  return arrayOfActions;
}
module.exports = transformStateWithClones;
