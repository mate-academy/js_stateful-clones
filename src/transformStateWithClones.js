'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObj = {};
  const result = [];

  Object.assign(newObj, state);

  for (let i = 0; i < actions.length; i++) {
    const type = actions[i].type;

    if (type === 'addProperties') {
      const extraData = actions[i].extraData;

      for (const key in extraData) {
        newObj[key] = extraData[key];
      }
      result.push(Object.assign({}, newObj));
    } else if (type === 'removeProperties') {
      const remove = actions[i].keysToRemove;

      for (const key in remove) {
        delete newObj[remove[key]];
      }
      result.push(Object.assign({}, newObj));
    } else if (type === 'clear') {
      Object.keys(newObj).forEach((key) => delete newObj[key]);
      result.push(Object.assign({}, newObj));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
