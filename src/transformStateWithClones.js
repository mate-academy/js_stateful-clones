'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let transormItem = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      transormItem = ({
        ...transormItem, ...i.extraData,
      });
    } else if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete transormItem[key];
      }
    } else if (i.type === 'clear') {
      transormItem = {};
    }

    result.push({ ...transormItem });
  }

  return result;
}

module.exports = transformStateWithClones;
