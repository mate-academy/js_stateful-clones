'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const ACTION_ADD_PROPERTIES = 'addProperties';
const ACTION_REMOVE_PROPERTIES = 'removeProperties';
const ACTION_CLEAR = 'clear';

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const actionsOnState = [];

  for (const action of actions) {
    switch (action.type) {
      case ACTION_ADD_PROPERTIES:
        Object.assign(stateCopy, action.extraData);
        break;

      case ACTION_REMOVE_PROPERTIES:
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;
      case ACTION_CLEAR:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('unsupported value');
    }

    actionsOnState.push({ ...stateCopy });
  }

  return actionsOnState;
}

module.exports = transformStateWithClones;
