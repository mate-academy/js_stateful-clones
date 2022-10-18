'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];

  res.push(Object.assign({}, state));

  for (let i = 0; i < Object.values(actions).length; i++) {
    if (i > 0) {
      res.push(Object.assign({}, res[i - 1]));
    }

    if (actions[i].type === 'clear') {
      Object.keys(res[i]).forEach(key => {
        delete res[i][key];
      });
    }

    if (actions[i].type === 'removeProperties') {
      actions[i].keysToRemove.forEach(key => {
        delete res[i][key];
      });
    }

    if (actions[i].type === 'addProperties') {
      for (const [key, value] of Object.entries(actions[i].extraData)) {
        res[i][key] = value;
      }
    }
  }

  return res;
}

module.exports = transformStateWithClones;
