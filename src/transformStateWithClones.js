'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = []; // array which will be returned

  /* a clone of obj state, thus the original(state) obj won`t be modified
  */
  const copyOfState = Object.assign({}, state);

  for (const action of actions) { // extract obj from the array
    switch (action.type) { // iterrating over obj key(type)
      case 'addProperties': {
        Object.assign(copyOfState, action.extraData); // add

        break;
      }

      case 'removeProperties': {
        for (const del of action.keysToRemove) {
          delete copyOfState[del]; // delete
        }

        break;
      }

      case 'clear': {
        for (const clr in copyOfState) {
          delete copyOfState[clr]; // clear the whole clone
        }

        break;
      }
    }
    /* transform obj into array and push objects to the array
    */
    result.push({ ...copyOfState });
  }

  return result;
}

module.exports = transformStateWithClones;
