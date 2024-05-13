import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { showErrorToast } from "../components/ToastMessage/toast"
import { User } from "../types/User"

export const getUserData = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid)
    const user = await getDoc(docRef)
    return user.data() as User
  } catch (error) {
    showErrorToast(
      "Error fetching user data. Please check your connection and try again."
    )
    return null
  }
}

export const updateUserEvents = async (uid: string, eventId: string) : Promise<boolean> => {
  try {
    //read events array and add new event
    const docRef = doc(db, "users", uid)
    const user = await getDoc(docRef)
    const user2 = user.data() as User
    const userEvents = user2.events
    userEvents.forEach((event) => {
      if (event === eventId) {
        throw new Error("You are already registered to this event.")
      }
    })
    userEvents.push(eventId)
    await updateDoc(docRef,{
      events: userEvents,
    })
    return true
  } catch (error) {
    return false
  }
}