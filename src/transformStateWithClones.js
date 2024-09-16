'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const history = [];
  let newState = { ...state };

  actions.forEach((item) => {
    switch (item.type) {
      case 'addProperties':
        Object.assign(newState, item.extraData);
        break;

      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }

    return history.push(Object.assign({}, newState));
  });

  return history;
}

module.exports = transformStateWithClones;
