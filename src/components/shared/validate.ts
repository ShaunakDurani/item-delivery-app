const checkValidData = (
  Email: string,
  Password: string,
  FullName?: string // now optional
): string | null => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);

  const isPasswordValid =
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      Password
    );

  // Only validate name if it's passed (during sign-up)
  if (FullName !== undefined) {
    const isFullNameValid = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(FullName);
    if (!isFullNameValid) return "Name is not valid";
  }

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};

export default checkValidData;
