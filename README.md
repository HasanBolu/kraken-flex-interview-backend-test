## The Task

Task is to write a small program that fulfills following steps using the mock api(https://api.krakenflex.systems/interview-tests-mock-api/v1/).

1. Retrieves all outages from the `GET /outages` endpoint
2. Retrieves information from the `GET /site-info/{siteId}` endpoint for the site with the ID `norwich-pear-tree`
3. Filters out any outages that began before `2022-01-01T00:00:00.000Z` or don't have an ID that is in the list of
   devices in the site information
4. For the remaining outages, it should attach the display name of the device in the site information to each appropriate outage
5. Sends this list of outages to `POST /site-outages/{siteId}` for the site with the ID `norwich-pear-tree`

## Installation

run `npm install` in order to install following dependencies as specified in package.json.

```
{
    "@types/jest": "^28.1.6",
    "@types/node": "^18.0.6",
    "jest": "^28.1.3",
    "nodemon": "^2.0.19",
    "ts-jest": "^28.0.7",
    "ts-node": "^10.9.1",
    "typescript": "^4.7.4"
  }
```

## Available Scripts

* run `npm run serve` in order to execute the program which is available in `app.ts`

* run `npm test` in order to execute test scripts

