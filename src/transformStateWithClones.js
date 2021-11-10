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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        transormItem = ({
          ...transormItem, ...action.extraData,
        });
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete transormItem[key];
        }
        break;

      case 'clear' :
        transormItem = {};
        break;
    }

    result.push({ ...transormItem });
  }

  return result;
}

module.exports = transformStateWithClones;
