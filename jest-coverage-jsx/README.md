# Getting Started with Create React App

```
➜  jest-coverage-jsx git:(master) ✗ yarn coverage

yarn run v1.22.10
$ CI=true react-scripts test --coverage
PASS src/App.test.js
  ✓ renders learn react link (110 ms)

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   13.33 |        0 |   28.57 |   13.33 |                   
 src                        |   15.38 |        0 |      40 |   15.38 |                   
  App.js                    |     100 |      100 |     100 |     100 |                   
  Logo.js                   |     100 |      100 |     100 |     100 |                   
  UnusedComponent.js        |       0 |      100 |       0 |       0 | 2                 
  index.js                  |       0 |      100 |     100 |       0 | 7-17              
  reportWebVitals.js        |       0 |        0 |       0 |       0 | 1-8               
 src/subfolder              |       0 |      100 |       0 |       0 |                   
  UnusedComponent2.js       |       0 |      100 |       0 |       0 | 2                 
 src/subfolder/subsubfolder |       0 |      100 |       0 |       0 |                   
  UnusedComponent3.js       |       0 |      100 |       0 |       0 | 2                 
----------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        10.613 s
Ran all test suites.
✨  Done in 13.44s.
```