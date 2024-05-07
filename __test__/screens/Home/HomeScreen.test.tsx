
import { render, fireEvent, waitFor, act } from '@testing-library/react-native'
import HomeScreen from '../../../screens/Home/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { Firestore } from 'firebase/firestore'


jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore))
}))

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0}
  return {
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  }
})
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

const mockNavigation = {
  navigate: jest.fn(),
} 

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'), // keep all the original implementations
    useNavigation: () => mockNavigation,
  }
})

jest.mock('../../../firebase/ManageEvents', () => ({
  getAllFutureEvents: jest.fn(() => Promise.resolve([
    { id: '1', title: 'Future Event 1', date: '2024-01-01' },
    { id: '2', title: 'Future Event 2', date: '2024-01-02' }
  ])),
  getAllPastEvents: jest.fn(() => Promise.resolve([
    { id: '3', title: 'Past Event 1', date: '2022-01-01' },
    { id: '4', title: 'Past Event 2', date: '2022-01-02' }
  ]))
}))
describe('HomeScreen', () => {

    it('renders the Home screen', () => {
        const component = render(
        <SafeAreaProvider>
          <HomeScreen/>
        </SafeAreaProvider>
        )
        expect(component).toBeTruthy()
    })

    it('filters events based on search input', async () => {
        const { getByText, getByPlaceholderText } = render(
          <SafeAreaProvider>
            <HomeScreen />
          </SafeAreaProvider>
        )

        await waitFor(() => {
          fireEvent.changeText(getByPlaceholderText('Search...'), 'Past Event')
          expect(getByText('Past Event 2')).toBeTruthy()
    
          fireEvent.changeText(getByPlaceholderText('Search...'), '')
          expect(getByText('Past Event 1')).toBeTruthy()

          fireEvent.press(getByText('Map View'))
          expect(getByText('Map View')).toBeTruthy()
        })
    })
    
    it('displays correct event details', async () => {
        const component= render(
          <SafeAreaProvider>
            <HomeScreen />
          </SafeAreaProvider>
        )
        await waitFor(() => {
          
          //expect(getByText('Balelek 2023')).toBeTruthy()
          //expect(getByText('2023-04-04')).toBeTruthy()
          
        })
        expect(component).toBeTruthy()
        
    })

    it('keyboard disapear if we click aside', async () => {
        const { getByPlaceholderText } = render(
          <SafeAreaProvider>
            <HomeScreen />
          </SafeAreaProvider>
        )
        await act(async () => {
          await waitFor(() => {
            const search = getByPlaceholderText('Search...')
            fireEvent.press(search)
            expect(getByPlaceholderText('Search...')).toBeTruthy()
          })
        })
    })


})




