import { useState, ChangeEvent, FormEvent } from "react";
import * as Components from "./SignUp.styles";

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

  const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateSignUp();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Sign Up Form submitted:", signUpFormData);
      // Add your sign-up logic here
    } else {
      setSignUpErrors(validationErrors);
    }
  };

  const handleSignInSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateSignIn();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Sign In Form submitted:", signInFormData);
      // Add your sign-in logic here
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
              placeholder="Name"
              name="name"
              value={signUpFormData.firstName}
              onChange={handleSignUpChange}
            />
            {signUpErrors.firstName && <span>{signUpErrors.firstName}</span>}
            <Components.Input
              type="text"
              placeholder="Name"
              name="name"
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
