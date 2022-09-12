'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const res = [];

  for (let i = 0; i < actions.length; i++) {
    const link = actions[i];

    if (link.type === 'addProperties') {
      Object.assign(obj, link.extraData);

      const copy = { ...obj };

      res.push(copy);
    } else if (link.type === 'removeProperties') {
      for (const key of link.keysToRemove) {
        delete obj[key];
      }

      const copy = { ...obj };

      res.push(copy);
    } else if (link.type === 'clear') {
      Object.keys(obj).forEach(key => (delete obj[key]));

      const copy = { ...obj };

      res.push(copy);
    }
  }

  return res;
}

module.exports = transformStateWithClones;
