'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let copyState = { ...state };

  const resultAct = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        copyState = {};
        // for (const key of Object.keys(copyState)) {
        //   delete copyState[key];
        // }
        // console.log('clear');
        break;
    }

    resultAct.push({ ...copyState });
  }

  return resultAct;
}

module.exports = transformStateWithClones;
