import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signUp = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName });

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName,
    childrenIds: [],
    createdAt: serverTimestamp(),
  });

  return user;
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const invitePartner = async (email: string, childId: string) => {
  // TODO: Implement partner invitation
  // This would typically send an email invite or create a pending invitation document
  console.log(`Inviting partner ${email} for child ${childId}`);
};
