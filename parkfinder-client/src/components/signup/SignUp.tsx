import { useState, ChangeEvent, FormEvent } from "react";
import * as Components from "./SignUp.styles";
import { registerUser, userSignIn } from "../../services/signin";
import { useNavigate } from "react-router-dom";
import { showToastError, showToastSuccess } from "../toast/toast";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

interface SignUpErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

interface SignInErrors {
  email?: string;
  password?: string;
}

function SignUp() {
  const [isSignInActive, setIsSignInActive] = useState(true);
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signInFormData, setSignInFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [signUpErrors, setSignUpErrors] = useState<SignUpErrors>({});
  const [signInErrors, setSignInErrors] = useState<SignInErrors>({});
  const navigate = useNavigate();

  const handleToggle = (shouldSignIn: boolean) => {
    setIsSignInActive(shouldSignIn);
    setSignUpFormData({ firstName: "", lastName: "", email: "", password: "" });
    setSignInFormData({ email: "", password: "" });
    setSignUpErrors({});
    setSignInErrors({});
  };

  const handleSignUpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value });
  };

  const validateSignUp = (): SignUpErrors => {
    const validationErrors: SignUpErrors = {};

    if (!signUpFormData.firstName) {
      validationErrors.firstName = "First Name is required";
    }

    if (!signUpFormData.lastName) {
      validationErrors.lastName = "Last Name is required";
    }

    if (!signUpFormData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpFormData.email)) {
      validationErrors.email = "Email address is invalid";
    }

    if (!signUpFormData.password) {
      validationErrors.password = "Password is required";
    } else if (signUpFormData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    return validationErrors;
  };

  const validateSignIn = (): SignInErrors => {
    const validationErrors: SignInErrors = {};

    if (!signInFormData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signInFormData.email)) {
      validationErrors.email = "Email address is invalid";
    }

    if (!signInFormData.password) {
      validationErrors.password = "Password is required";
    }

    return validationErrors;
  };

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateSignUp();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await registerUser({
          userFirstName: signUpFormData.firstName,
          userLastName: signUpFormData.lastName,
          userEmail: signUpFormData.email,
          userPassword: signUpFormData.password,
        });
        console.log("Sign Up Form submitted:", response);
        showToastSuccess("Activation email sent. Please check your inbox.");
        navigate("/");
      } catch (error) {
        console.error("Sign Up Error:", error);
        showToastError("Sign Up failed. Please try again.");
        setSignUpErrors({ email: "Sign Up failed. Please try again." });
      }
    } else {
      setSignUpErrors(validationErrors);
    }
  };

  const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateSignIn();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await userSignIn({
          userEmail: signInFormData.email,
          userPassword: signInFormData.password,
        });
        console.log("Sign In Form submitted:", response);

        // Store the token and user info in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("userEmail", response.userEmail);
        localStorage.setItem("userFirstName", response.userFirstName);

        showToastSuccess("Sign In successful.");
        navigate("/");
      } catch (error) {
        console.error("Sign In Error:", error);
        showToastError("Sign In failed. Please try again.");
        setSignInErrors({ email: "Sign In failed. Please try again." });
      }
    } else {
      setSignInErrors(validationErrors);
    }
  };

  return (
    <Components.PageContainer>
      <Components.Container>
        <Components.SignUpContainer signinIn={!isSignInActive}>
          <Components.Form
            onSubmit={handleSignUpSubmit}
            signinIn={!isSignInActive}
          >
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={signUpFormData.firstName}
              onChange={handleSignUpChange}
            />
            {signUpErrors.firstName && <span>{signUpErrors.firstName}</span>}
            <Components.Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={signUpFormData.lastName}
              onChange={handleSignUpChange}
            />
            {signUpErrors.lastName && <span>{signUpErrors.lastName}</span>}
            <Components.Input
              type="email"
              placeholder="Email"
              name="email"
              value={signUpFormData.email}
              onChange={handleSignUpChange}
            />
            {signUpErrors.email && <span>{signUpErrors.email}</span>}
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
              value={signUpFormData.password}
              onChange={handleSignUpChange}
            />
            {signUpErrors.password && <span>{signUpErrors.password}</span>}
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={isSignInActive}>
          <Components.Form
            onSubmit={handleSignInSubmit}
            signinIn={isSignInActive}
          >
            <Components.Title>Sign In</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              name="email"
              value={signInFormData.email}
              onChange={handleSignInChange}
            />
            {signInErrors.email && <span>{signInErrors.email}</span>}
            <Components.Input
              type="password"
              placeholder="Password"
              name="password"
              value={signInFormData.password}
              onChange={handleSignInChange}
            />
            {signInErrors.password && <span>{signInErrors.password}</span>}
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={isSignInActive}>
          <Components.Overlay signinIn={isSignInActive}>
            <Components.LeftOverlayPanel signinIn={isSignInActive}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => handleToggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={!isSignInActive}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => handleToggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Components.PageContainer>
  );
}

export default SignUp;
