# jest coverage experiment with TypeScript

```
➜  jest-coverage-tsx git:(master) ✗ yarn coverage

yarn run v1.22.10
$ CI=true react-scripts test --coverage
PASS src/App.test.tsx (5.218 s)
  ✓ renders learn react link (258 ms)

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   13.33 |        0 |   28.57 |   13.33 |                   
 src                        |   15.38 |        0 |      40 |   15.38 |                   
  App.tsx                   |     100 |      100 |     100 |     100 |                   
  Logo.tsx                  |     100 |      100 |     100 |     100 |                   
  UnusedComponent.tsx       |       0 |      100 |       0 |       0 | 2                 
  index.tsx                 |       0 |      100 |     100 |       0 | 7-17              
  reportWebVitals.ts        |       0 |        0 |       0 |       0 | 3-10              
 src/subfolder              |       0 |      100 |       0 |       0 |                   
  UnusedComponent2.tsx      |       0 |      100 |       0 |       0 | 2                 
 src/subfolder/subsubfolder |       0 |      100 |       0 |       0 |                   
  UnusedComponent3.tsx      |       0 |      100 |       0 |       0 | 2                 
----------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        12.824 s
Ran all test suites.
✨  Done in 17.56s.
```
