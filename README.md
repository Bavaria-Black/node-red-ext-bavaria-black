# Library with convinience funtion for Node-RED

## Validators

### Range validator

``` js
var bavaria = require('node-red-ext-bavaria-black');
var validateRange = bavaria.validators.range(0,10);

if (validateRange(5))
{
    console.log("in range");
}
```

## UI