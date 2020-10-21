import React, { useEffect } from 'react';

import { observable, action } from 'mobx';
import { Observer, observer } from 'mobx-react-lite';

interface Person {
  name: string;
}

const p1 = observable<Person>({ name: 'John' });
const p2 = observable<Person>({ name: 'John' });

const changeName = action((p: Person, name: string) => p.name = name);

const P1 = observer(function P1({ person }: { person: Person }) {
  console.log('P1 render');
  return <h1>{person.name}</h1>
})

const P2 = ({ person }: { person: Person }) => (
  <Observer>
    {
      () => {
        console.log('P2 render');
        return <h1>{person.name}</h1>;
      }
    }
  </Observer>
);

export default function App() {
  console.log('App render');
  useEffect(() => {
    setTimeout(() => changeName(p1, 'Jane'), 1000);
    setTimeout(() => changeName(p2, 'Jane'), 2000);
  }, []);

  return (
    <div>
      <P1 person={p1} />
      <P2 person={p2} />
    </div>
  );
}
