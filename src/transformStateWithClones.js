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

    if (tempAction['type'] === 'addProperties') {
      const dataToAdd = tempAction['extraData'];

      for (const key in dataToAdd) {
        modifiedState[key] = dataToAdd[key];
      }

      result.push(Object.assign({}, modifiedState));
    }

    if (tempAction['type'] === 'removeProperties') {
      const dataToRemove = tempAction['keysToRemove'];

      for (const title in dataToRemove) {
        delete modifiedState[dataToRemove[title]];
      }

      result.push(Object.assign({}, modifiedState));
    }

    if (tempAction['type'] === 'clear') {
      const properties = Object.getOwnPropertyNames(modifiedState);

      properties.forEach(prop => {
        delete modifiedState[prop];
      });

      result.push(Object.assign({}, modifiedState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
