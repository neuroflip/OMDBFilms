import React, { type PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { RootState } from '../src/store/store'
import type { AppStore } from '../src/store/store'

import userReducer from '../src/features/users/store/slice/userSlice'
import filmReducer from '../src/features/filmDetail/store/slice/filmSlice'
import filmsReducer from '../src/features/search/store/slice/filmsSlice'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore
}

function setupStore() {
    return configureStore({
    reducer: {
        user: userReducer,
        films: filmsReducer,
        film: filmReducer
    }})
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    store = setupStore(),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}