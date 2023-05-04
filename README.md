# q-throttle
A utility for throttling Q promises created using map()


```javascript
import Q from 'q';
import { map } from 'q-throttle';

Q.map = map

const myArray = [1,2,3,4,5,6,7,8]

// Limits promise concurrency to 3
Q.map(myArray, function(element) {
    return promiseFactory(element)
}, 3)
    .then(function(resolvedArray) {
        doSomething()
    })
```
