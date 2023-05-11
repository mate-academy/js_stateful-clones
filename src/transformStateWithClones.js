'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let lastObj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let obj = {};

    if (action.type === 'addProperties') {
      obj = { ...lastObj };

      for (const [key, value] of Object.entries(action.extraData)) {
        obj[key] = value;
      }
    }

    if (action.type === 'removeProperties') {
      obj = { ...lastObj };

      action.keysToRemove.forEach(key => {
        delete obj[key];
      });
    }

    res.push(obj);
    lastObj = obj;
  }

  return res;
}

module.exports = transformStateWithClones;
