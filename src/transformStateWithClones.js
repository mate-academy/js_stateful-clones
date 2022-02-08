'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const ADD_PROPERTIES = 'addProperties';
const REMOVE_PROPERTIES = 'removeProperties';
const CLEAR = 'clear';

function transformStateWithClones(state, actions) {
  const clone = Object.assign({}, state);
  const result = [];

  actions.forEach((action) => {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(clone, action.extraData);
        break;

      case REMOVE_PROPERTIES:
        action.keysToRemove.forEach((key) => {
          delete clone[key];
        });
        break;

      case CLEAR:
        for (const key in clone) {
          delete clone[key];
        }
    }

    result.push({ ...clone });
  });

  return result;
}

module.exports = transformStateWithClones;
