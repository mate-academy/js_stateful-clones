'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedState = Object.assign({}, state);
  const result = [];

  for (const action in actions) {
    const tempAction = Object.assign({}, actions[action]);

    switch (tempAction['type']) {
      case 'addProperties':
        const dataToAdd = tempAction.extraData;

        for (const key in dataToAdd) {
          modifiedState[key] = dataToAdd[key];
        }

        result.push(Object.assign({}, modifiedState));
        break;

      case 'removeProperties':
        const dataToRemove = tempAction.keysToRemove;

        for (const title in dataToRemove) {
          delete modifiedState[dataToRemove[title]];
        }

        result.push(Object.assign({}, modifiedState));
        break;

      case 'clear':
        for (const key in modifiedState) {
          delete modifiedState[key];
        }

        result.push(Object.assign({}, modifiedState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
