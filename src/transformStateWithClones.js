/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let current = { ...state };

  for (const action of actions) {
    let newCurrent = { ...current };

    switch (action.type) {
      case 'addProperties':
        newCurrent = { ...current, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newCurrent[key];
        }
        break;
      case 'clear':
        newCurrent = {};
        break;
    }

    history.push(newCurrent);
    current = newCurrent;
  }

  return history;
}
module.exports = transformStateWithClones;
