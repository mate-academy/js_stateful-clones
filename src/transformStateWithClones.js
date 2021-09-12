'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let object = state;

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const copy = Object.assign({}, object, action.extraData);

      array.push(copy);
      object = copy;
    }

    if (action.type === 'clear') {
      array.push({});
      object = {};
    }

    if (action.type === 'removeProperties') {
      const remove = Object.assign({}, object);

      for (const key of action.keysToRemove) {
        delete remove[key];
      }
      array.push(remove);
      object = remove;
    }
  }

  return array;
}

module.exports = transformStateWithClones;
