import { useState, useRef } from "react";
import checkValidData from "../components/shared/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../components/shared/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BG_IMAGE, PROFILE_PIC } from "../components/shared/constants";
import type { FormEvent } from "react";
import { Header } from "../components/shared";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  const Email = useRef<HTMLInputElement>(null);
  const Password = useRef<HTMLInputElement>(null);
  const FullName = useRef<HTMLInputElement>(null);

  const handleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleClick = () => {
    const emailVal = Email.current?.value || "";
    const passVal = Password.current?.value || "";
    const nameVal = FullName.current?.value || "";

    const message = checkValidData(emailVal, passVal, nameVal);
    setErrMessage(message);
    if (message) return;

    if (!isSignedIn) {
      // Sign-up
      createUserWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: nameVal,
            photoURL: PROFILE_PIC,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser!;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          setErrMessage(`${error.code} - ${error.message}`);
        });
    } else {
      // Sign-in
      signInWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Signed in:", user);
        })
        .catch((error) => {
          setErrMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="h-screen object-cover" src={BG_IMAGE} alt="bg" />
      </div>

      <form
        onSubmit={(e: FormEvent) => e.preventDefault()}
        className="absolute bg-black w-2/6 my-36 mx-auto right-0 left-0 p-12 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="text-3xl font-bold py-2 m-2">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignedIn && (
          <input
            ref={FullName}
            type="text"
            placeholder="Full Name"
            className="p-4 m-2 w-full rounded-lg bg-gray-600 bg-opacity-10 border border-white"
          />
        )}

        <input
          ref={Email}
          type="text"
          placeholder="Email or mobile number"
          className="p-4 m-2 w-full rounded-lg bg-gray-600 bg-opacity-10 border border-white"
        />

        <input
          ref={Password}
          type="password"
          placeholder="Password"
          className="p-4 m-2 w-full rounded-lg bg-gray-600 bg-opacity-10 border border-white"
        />

        <p className="text-red-500 py-2 font-bold">{errMessage}</p>

        <button
          className="bg-red-600 p-2 m-2 w-full rounded-lg font-bold"
          onClick={handleClick}
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="p-2 m-2 cursor-pointer" onClick={handleSignIn}>
          {isSignedIn
            ? "New to Netflix? Sign up now."
            : "Already Registered? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
