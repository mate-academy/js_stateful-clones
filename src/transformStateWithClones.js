'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
/* eslint-disable */

function transformStateWithClones(state, actions) {
  const TYPEPROPERTY = 'addProperties';
  const TYPEREMOVE = 'removeProperties';
  const TYPECLEAR = 'clear';
  const ARRAYRESULT = [];
  const STATECOPY = Object.assign({}, state);

  for (const action of actions) {
    let { type, keysToRemove, extraData} = action;

    switch (type) {
      case TYPEPROPERTY:
        Object.assign(STATECOPY, extraData);

        break;

      case TYPEREMOVE:
        for (const prop of keysToRemove) {
          delete STATECOPY[prop];
        }
        break;

      case TYPECLEAR:
        for (const key in STATECOPY) {
          delete STATECOPY[key];
        }
        break;

      default:
        throw new Error('Wrong input');
    }

    ARRAYRESULT.push({ ...STATECOPY });
  }

  return ARRAYRESULT;
}

module.exports = transformStateWithClones;
