'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const clone = { ...state };

  for (const object of actions) {
    if (object.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }

      history.push({});
    }

    if (object.type === 'addProperties') {
      const { extraData } = object;

      Object.assign(clone, extraData);

      history.push({ ...clone });
    }

    if (object.type === 'removeProperties') {
      const { keysToRemove } = object;

      for (const key of keysToRemove) {
        delete clone[key];
      }

      history.push({ ...clone });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
