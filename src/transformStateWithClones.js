'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let clone = Object.assign({}, state);

  for (const item of actions) {
    if (item.type === 'addProperties') {
      Object.assign(clone, item.extraData);

      const newData = Object.assign({}, clone);

      history.push(newData);
    }

    if (item.type === 'removeProperties') {
      const newData = Object.assign({}, clone);

      for (const key in item.keysToRemove) {
        const keyToRemove = item.keysToRemove[key];

        delete newData[keyToRemove];
      }
      history.push(newData);
      clone = Object.assign({}, newData);
    }

    if (item.type === 'clear') {
      const newData = Object.assign({}, clone);

      for (const key in clone) {
        delete newData[key];
      }
      history.push(newData);
      clone = Object.assign({}, newData);
    }
  }

  return history;
}

module.exports = transformStateWithClones;
