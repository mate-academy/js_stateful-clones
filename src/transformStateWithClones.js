'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newObj = { ...state };

  for (const action of actions) {
    const obj = action;
    const { type } = obj;

    switch (type) {
      case 'addProperties':
        Object.assign(newObj, obj.extraData);
        result.push(Object.assign({}, newObj));
        break;

      case 'removeProperties':
        const itemsRemove = obj.keysToRemove;

        for (const keyToRemove of itemsRemove) {
          if (newObj[keyToRemove]) {
            delete newObj[keyToRemove];
          }
        }

        result.push(Object.assign({}, newObj));
        break;

      case 'clear':
        newObj = {};
        result.push({});
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
