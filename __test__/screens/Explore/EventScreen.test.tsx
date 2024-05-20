
import { render } from '@testing-library/react-native'
import EventScreen from '../../../screens/Explore/EventScreen/EventScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { Firestore } from 'firebase/firestore'
import { NavigationProp, ParamListBase } from '@react-navigation/native'


jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore))
}))

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
} as unknown as NavigationProp<ParamListBase>


jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'), // keep all the original implementations
    useNavigation: () => mockNavigation,
  }
})

jest.mock('../../../firebase/ManageEvents', () => ({
  getAllFutureEvents: jest.fn(() => Promise.resolve([
    { id: '1', title: 'Future Event 1', date: '2024-01-01' },
    { id: '2', title: 'Future Event 2', date: '2024-01-02' },
    { id: '3', title: 'Future Event 3', date: '2024-01-03' }
  ])),
  getAllPastEvents: jest.fn(() => Promise.resolve([
    { id: '3', title: 'Past Event 1', date: '2022-01-01' },
    { id: '4', title: 'Past Event 2', date: '2022-01-02' }
  ]))
}))

describe('EventScreen', () => {

  it('refresh', async () => {

    const { debug } = render(
      <SafeAreaProvider>
        <EventScreen onEventPress={() => { }} userID='123' />
      </SafeAreaProvider>
    )
    debug()

    // await waitFor(() => {
    // const refreshControl = getByTestId('refresh-control');
    // fireEvent(refreshControl, 'onRefresh');
    // })

    // await waitFor(() => {
    //   expect(getAllFutureEvents).toHaveBeenCalled()
    //   expect(getAllPastEvents).toHaveBeenCalled()
    // })
  })

})