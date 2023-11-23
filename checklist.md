1. [CODE STYLE] - don't mutate object or arrays - it will cause unexpected results later on. You should make copy using `Object.assign` or `spread` operator
2. [CODE STYLE]: Use switch statement if you have limited amount of conditions.
3. [CODE STYLE]: switch/case should always have default case for error handling.
4. [DONT REPEAT YOURSELF] - If you perform same action in all `switch` cases - do it just once afterwards.

5. [NAMING] - use proper names for object copy 


BAD EXAMPLE:
```
const copy = { ...state }

```

GOOD EXAMPLE: 
```
const stateCopy = { ...state }
```
