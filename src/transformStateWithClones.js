'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const list = [];
  let listItem = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        listItem = { ...listItem, ...action.extraData };
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete listItem[item];
        }
        break;

      case 'clear':
        listItem = {};
        break;
    }

    list.push({ ...listItem });
  }

  return list;
}

module.exports = transformStateWithClones;
