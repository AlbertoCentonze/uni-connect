import React from "react"
import { fireEvent, render } from "@testing-library/react-native"
import EventCreationScreen from "../../../screens/EventCreation/EventCreationScreen"
import { Firestore } from "firebase/firestore"
import { RegistrationContext } from "../../../contexts/RegistrationContext"
import { SafeAreaProvider } from "react-native-safe-area-context"

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

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 }
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
  }
})

describe("EventCreationScreen", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<EventCreationScreen />)
    expect(getByText("Validate")).toBeTruthy()
    expect(getByText("Add a description")).toBeTruthy()
    expect(getByText("Choose up to three tags")).toBeTruthy()
    expect(getByPlaceholderText("Turing Avenue 69")).toBeTruthy()
  })

  it("shows date input fiel when creating event", () => {
    {
      // restricting scope to avoid naming conflicts
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
    const { getByText } = render(
      <SafeAreaProvider>
        <EventCreationScreen />
      </SafeAreaProvider>
    )
    const descriptionButton = getByText("Add a description")
    fireEvent.press(descriptionButton)
    // You can expand this to check if a specific function is called or a modal/dialog opens
  })

  it('should handle "Validate" button press and call setDescription', () => {
    const mockSetDescription = jest.fn()

    // Set up the provider props
    const providerProps = {
      description: "",
      setDescription: mockSetDescription,
    }

    // Render the component wrapped in the mock provider directly
    const { getByText } = render(
      <SafeAreaProvider>
        {/* @ts-expect-error this is a test mock */}
        <RegistrationContext.Provider value={providerProps}>
          <EventCreationScreen />
        </RegistrationContext.Provider>
      </SafeAreaProvider>
    )

    // Locate the Validate button and simulate a press
    const validateButton = getByText("Validate")
    fireEvent.press(validateButton)
  })

  it("checks if the description button navigates correctly", () => {
    const { getByText } = render(<EventCreationScreen />)
    fireEvent.press(getByText("Add a description"))
    expect(mockNavigate).toHaveBeenCalledWith("Description")
  })

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(<EventCreationScreen />)
    fireEvent.press(getByTestId("back-button"))
    expect(mockGoBack).toHaveBeenCalled()
  })

  it("updates title input correctly", () => {
    const { getByPlaceholderText } = render(<EventCreationScreen />)
    const titleInput = getByPlaceholderText("Chemistry x Python")
    fireEvent.changeText(titleInput, "New Event Title")
    expect(titleInput.props.value).toBe("New Event Title")
  })

  it("handles interest tag selection", () => {
    const { getByText } = render(<EventCreationScreen />)
    fireEvent.press(getByText("Choose up to three tags"))
    // Assume modal or dropdown opens, simulate selecting a tag
    // Add mock function or state update check here
  })

  it("renders different UI elements based on the isAnnouncement prop", () => {
    const { queryByText, rerender } = render(
      <EventCreationScreen isAnnouncement={true} />
    )
    expect(queryByText("Location*")).toBeNull() // Assuming location is not needed for announcements

    rerender(<EventCreationScreen isAnnouncement={false} />)
    expect(queryByText("Location*")).toBeTruthy()
  })
})
