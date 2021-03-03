# jest coverage experiment with JavaScript

```
➜  jest-coverage-jsx git:(master) ✗ yarn coverage
yarn run v1.22.10
$ CI=true react-scripts test --coverage
PASS src/App.test.js (9.624 s)
  ✓ renders learn react link (137 ms)

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   18.75 |        0 |    37.5 |   18.75 |                   
 src                        |   15.38 |        0 |      40 |   15.38 |                   
  App.js                    |     100 |      100 |     100 |     100 |                   
  Logo.js                   |     100 |      100 |     100 |     100 |                   
  UnusedComponent.js        |       0 |      100 |       0 |       0 | 2                 
  index.js                  |       0 |      100 |     100 |       0 | 7-17              
  reportWebVitals.js        |       0 |        0 |       0 |       0 | 1-8               
 src/subfolder              |       0 |      100 |       0 |       0 |                   
  UnusedComponent2.js       |       0 |      100 |       0 |       0 | 2                 
 src/subfolder/subsubfolder |      50 |      100 |      50 |      50 |                   
  AnotherComponent.js       |     100 |      100 |     100 |     100 |                   
  UnusedComponent3.js       |       0 |      100 |       0 |       0 | 2                 
----------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        14.505 s
Ran all test suites.
✨  Done in 17.75s.
```