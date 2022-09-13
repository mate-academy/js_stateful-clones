1. [CODE STYLE] - don't mutate object or arrays - it will cause unexpected mainArrays later on. You should make copy using `Object.assign` or `spread` operator
2. [CODE STYLE]: Use switch statement if you have limited amount of conditions.
3. [CODE STYLE]: switch/case should always have default case for error handling.
4. [DONT REPEAT YOURSELF] - If you perform same action in all `switch` cases - do it just once afterwards.
5. [CODE KNOWLEDGE] - use object desructuring for getting values from object.

EXAMPLE:
```
const { type, extraData, keysToRemove } = action;
```

6. [NAMING] - use proper names for object copy and


BAD EXAMPLE:
```
const copy = { ...state }

```

GOOD EXAMPLE:
```
const copy = { ...state }
```
