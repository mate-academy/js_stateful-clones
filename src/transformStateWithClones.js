'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const part of actions) {
    const actionValues = Object.values(part);
    const actionKeys = Object.keys(part);

    for (let n = 0; n < actionKeys.length; n++) {
      switch (actionKeys[n]) {
        case 'type':
          switch (actionValues[n]) {
            case 'addProperties':
              if (result.length === 0) {
                result.push(Object.assign({}, state, actionValues[n + 1]));
              } else {
                result.push(Object.assign(
                  {},
                  result[result.length - 1],
                  actionValues[n + 1]));
              }
              break;

            case 'removeProperties':
              let copy = {};

              if (result.length === 0) {
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
                    ...result[result.length - 1],
                  };
                }

                for (const key in result[result.length - 1]) {
                  for (const item of actionValues[n + 1]) {
                    if (item !== key) {
                      copy[key] = result[result.length - 1][key];
                    }

                    if (item === key) {
                      delete copy[key];
                      break;
                    }
                  }
                }
              }
              result.push(copy);
              break;

            case 'clear':
              result.push({});
              break;
          }
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
