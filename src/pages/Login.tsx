import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import Header1 from "../components/shared/Header1";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              navigate("/"); // 👈 redirect to home
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
          // Optionally update Redux if needed
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid, email, displayName, photoURL }));

          navigate("/"); // 👈 redirect to home
        })
        .catch((error) => {
          setErrMessage(`${error.code} - ${error.message}`);
        });
    }
  };

  return (
    <div>
      <Header1 />
      <div className="absolute">
        <img className="h-screen object-cover" src={BG_IMAGE} alt="bg" />
      </div>

      <form
        onSubmit={(e: FormEvent) => e.preventDefault()}
        className="absolute bg-black bg-opacity-80 text-white p-6 sm:p-10 md:p-12 rounded-lg w-11/12 sm:w-4/6 md:w-3/6 lg:w-2/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold py-2 m-2 text-center">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignedIn && (
          <input
            ref={FullName}
            type="text"
            placeholder="Full Name"
            className="p-4 m-2 w-full rounded-lg bg-gray-700 bg-opacity-20 border border-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        )}

        <input
          ref={Email}
          type="email"
          placeholder="Email or mobile number"
          className="p-4 m-2 w-full rounded-lg bg-gray-700 bg-opacity-20 border border-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          ref={Password}
          type="password"
          placeholder="Password"
          className="p-4 m-2 w-full rounded-lg bg-gray-700 bg-opacity-20 border border-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <p className="text-red-500 py-2 font-bold text-center">{errMessage}</p>

        <button
          className="bg-red-600 hover:bg-red-700 transition-all duration-300 p-3 m-2 w-full rounded-lg font-bold"
          onClick={handleClick}
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="p-2 m-2 text-center cursor-pointer hover:underline"
          onClick={handleSignIn}
        >
          {isSignedIn
            ? "New to Bringit? Sign up now."
            : "Already Registered? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
