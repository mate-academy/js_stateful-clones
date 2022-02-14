'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsData = [];
  const transformedState = { ...state };

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(transformedState, action['extraData']);
        break;

      case 'removeProperties':
        for (const item of action['keysToRemove']) {
          delete transformedState[item];
        }
        break;

      case 'clear':
        for (const key in transformedState) {
          delete transformedState[key];
        }
        break;
    }
    actionsData.push({ ...transformedState });
  }

  return actionsData;
}

module.exports = transformStateWithClones;
