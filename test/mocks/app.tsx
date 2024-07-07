import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";

type TestApplicationProps = {
  path?: string;
  store?: any;
}

export const TestApplication: React.FC<TestApplicationProps> = ({ path, store }) => {
  const defaultStore = () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    return initStore(api, cart);
  }

  return (
    <MemoryRouter initialEntries={[path ?? '/']} initialIndex={0}>
      <Provider store={store ?? defaultStore()}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
};