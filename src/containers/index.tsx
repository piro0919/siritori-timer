import React, { FC } from "react";
import Pages from "./pages";
import { Switch, Route } from "react-router-dom";
import Expert from "./pages/expert";
import Party from "./pages/party";
import Game from "./pages/game";

const Containers: FC = () => (
  <Switch>
    <Route exact={true} path="/">
      <Pages />
    </Route>
    <Route exact={true} path="/expert">
      <Expert />
    </Route>
    <Route exact={true} path="/game">
      <Game />
    </Route>
    <Route exact={true} path="/party">
      <Party />
    </Route>
  </Switch>
);

export default Containers;
