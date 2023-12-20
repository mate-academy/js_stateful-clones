'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = {};
  const CLEAR = 'clear';
  const ADDPROPERTIES = 'addProperties';
  const REMOVEPROPERTIES = 'removeProperties';

  Object.assign(newState, state);

  const arrStateClone = [];

  for (const action of actions) {
    switch (action.type) {
      case CLEAR:
        Object.keys(newState).forEach(key => {
          delete newState[key];
        });

        break;

      case ADDPROPERTIES:
        Object.assign(newState, action.extraData);

        break;

      case REMOVEPROPERTIES:
        const keyToRemove = action.keysToRemove;

        for (const key of keyToRemove) {
          delete newState[key];
        }

        break;
    }

    arrStateClone.push({ ...newState });
  }

  return arrStateClone;
}

module.exports = transformStateWithClones;
