import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        username,
      });
      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Sign up failed");
    }
    setLoading(false);
  };

  const usernamePreview = username.length > 0 ? `${username.substring(0, 6)}.` : "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
      <form
        onSubmit={handleSignUp}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center w-full max-w-sm"
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-primary">Sign Up</h2>
        <input
          className="mb-2 w-full px-3 py-2 rounded-md border"
          type="text"
          placeholder="Username(min. 4 length)"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="mb-2 w-full px-3 py-2 rounded-md border"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="mb-4 w-full px-3 py-2 rounded-md border"
          type="password"
          placeholder="Password(min. 8 length)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="gradient-primary text-white px-6 py-2 rounded-md mb-2 w-full cursor-pointer"
          disabled={loading || !isLoaded}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="mt-2 text-sm text-muted-foreground w-full text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="text-primary cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
// import React from "react";
// import { SignUp } from "@clerk/clerk-react";

// const SignUpPage = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
//     <SignUp routing="path" path="/sign-up" forceRedirectUrl="/" />
//   </div>
// );

// export default SignUpPage;
