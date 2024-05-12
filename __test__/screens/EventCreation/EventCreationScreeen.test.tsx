import React from "react"
import { fireEvent, render } from "@testing-library/react-native"
import EventCreationScreen from "../../../screens/EventCreation/EventCreationScreen"
import { Firestore } from "firebase/firestore"

const mockGoBack = jest.fn()
const mockNavigate = jest.fn()

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore)),
}))

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
  }
})

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)
// Component import

describe("EventCreationScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<EventCreationScreen />)
    expect(getByText("Validate")).toBeTruthy()
    expect(getByText("Add a description")).toBeTruthy()
    expect(getByText("Choose up to three tags")).toBeTruthy()
    expect(getByPlaceholderText("Turing Avenue 69")).toBeTruthy()
  })

  it("shows date input fiel when creating event", () => {
    { // restricting scope to avoid naming conflicts
      const { queryByText } = render(
        <EventCreationScreen isAnnouncement={true} />
      )
        expect(queryByText("DD.MM.YYYY")).toBeNull()
    }

    const { queryByText } = render(
      <EventCreationScreen isAnnouncement={false} />
    )
      expect(queryByText("DD.MM.YYYY")).toBeTruthy()
  })

  it('should handle "Add a description" button press', () => {
    const { getByText } = render(<EventCreationScreen />)
    const descriptionButton = getByText("Add a description")
    fireEvent.press(descriptionButton)
    // You can expand this to check if a specific function is called or a modal/dialog opens
  })

  it('should handle "Validate" button press', () => {
    const { getByText } = render(<EventCreationScreen />)
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
    // You can expand this to check if a specific function is called or if navigation occurs
  })
})
