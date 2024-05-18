import React from "react"
import { render } from "@testing-library/react-native"
import HomeTabNavigator from "../../../navigation/Home/HomeTabNavigator"
import { NavigationContainer } from "@react-navigation/native"
import { Firestore } from "firebase/firestore"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("../../../firebase/User", () => ({
  getUserData: jest.fn(() => ({
    firstName: "John",
    lastName: "Doe",
    location: "London",
  })),
}))

jest.mock("firebase/auth", () => ({
  getReactNativePersistence: jest.fn(() => ({})),
  initializeAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => ({ uid: "123" })),
  getAuth: jest.fn(() => ({ currentUser: { uid: "123" } })),
}))

jest.mock("../../../firebase/firebaseConfig", () => ({
  db: jest.fn(() => ({} as Firestore)),
}))

describe("HomeTabNavigator", () => {
  it("renders the bottom tab navigator with expected initial route", () => {
    const component = render(
      <NavigationContainer>
        <HomeTabNavigator />
      </NavigationContainer>
    )
    expect(component).toBeTruthy()
  })
})
