import React from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export default function About() {
  return (
    <>
      <h1>Recoil Example - About</h1>
    </>
  );
}
