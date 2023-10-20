'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformState = [state];

  for (const action of actions) {
    let stateCopy = { ...transformState[transformState.length - 1] };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;
    }

    transformState.push(stateCopy);
  }

  return transformState.slice(1);
}

module.exports = transformStateWithClones;
