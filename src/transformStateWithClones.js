'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];

  // stateArray.push({ ...state });

  // console.log(newState, actions);
  let last = { ...state };

  for (const el of actions) {
    switch (el.type) {
      case 'clear':
        stateArray.push({});
        break;

      case 'removeProperties':
        const stateRemov = { ...last };

        for (const delKey of el.keysToRemove) {
          if (stateRemov[delKey]) {
            delete stateRemov[delKey];
          }
        }

        stateArray.push({ ...stateRemov });
        break;

      case 'addProperties':
        const stateAdd = { ...last };

        for (const key in el.extraData) {
          stateAdd[key] = el.extraData[key];
        }

        stateArray.push({ ...stateAdd });

        break;
    }

    if (stateArray.length) {
      last = { ...stateArray[stateArray.length - 1] };
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
