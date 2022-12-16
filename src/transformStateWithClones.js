'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const actionValues = Object.values(actions[i]);
    const actionKeys = Object.keys(actions[i]);

    for (let n = 0; n < actionKeys.length; n++) {
      if (actionKeys[n] === 'type') {
        if (actionValues[n] === 'addProperties') {
          if (i === 0) {
            result.push(Object.assign({}, state, actionValues[n + 1]));
          } else {
            result.push(Object.assign({}, result[i - 1], actionValues[n + 1]));
          }
        }

        if (actionValues[n] === 'removeProperties') {
          let copy = {};

          if (i === 0) {
            if (actionValues[n + 1].length === 0) {
              copy = {
                ...state,
              };
            }

            for (const key in state) {
              for (const item of actionValues[n + 1]) {
                if (item !== key) {
                  copy[key] = state[key];
                }

                if (item === key) {
                  delete copy[key];
                  break;
                }
              }
            }
          } else {
            if (actionValues[n + 1].length === 0) {
              copy = {
                ...result[i - 1],
              };
            }

            for (const key in result[i - 1]) {
              for (const item of actionValues[n + 1]) {
                if (item !== key) {
                  copy[key] = result[i - 1][key];
                }

                if (item === key) {
                  delete copy[key];
                  break;
                }
              }
            }
          }
          result.push(copy);
        }

        if (actionValues[n] === 'clear') {
          result.push({});
        }
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
