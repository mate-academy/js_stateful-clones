'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
 function transformStateWithClones(state, actions) {
  const copy = Object.assign({}, state);
  const result = [];
  let list = Object.assign({}, copy);

  for (let j = 0; j < actions.length; j++) {
    if (actions[j].type === 'addProperties') {
      const adder = actions[j].extraData;

      result[j] = Object.assign({}, list, adder);
      list = Object.assign(list, result[j]);
    } else if (actions[j].type === 'removeProperties') {
      if ((Object.values(actions[j].keysToRemove)).length > 0) {
        for (const i of Object.values(actions[j].keysToRemove)) {
          delete list[i];
        }
        result[j] = Object.assign({}, list);
      } else {
        return [list];
      }
    } else if (actions[j].type === 'clear') {
      for (const i of Object.keys(state)) {
        list = Object.assign({});
        result[j] = {};
      }
    }
  }

  return result;
}


module.exports = transformStateWithClones;
