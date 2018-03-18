import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

import registerServiceWorker from "./registerServiceWorker";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, Store, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import reducer from "./reducers";

const store: Store<any> = createStore(reducer, {}, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
