import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signIn.create({ identifier: email, password });
      await setActive({ session: result.createdSessionId });
      navigate("/");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Sign in failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
      <form
        onSubmit={handleSignIn}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center w-full max-w-sm"
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-primary">Sign In</h2>
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
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="gradient-primary text-white px-6 py-2 rounded-md mb-2 w-full"
          disabled={loading || !isLoaded}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {/* Sign up link */}
        <div className="mt-2 text-sm text-muted-foreground w-full text-center">
          Create new account?{" "}
          <button
            type="button"
            className="text-primary underline"
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;

// import React from "react";
// import { SignIn } from "@clerk/clerk-react";

// const SignInPage = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10">
//     <SignIn routing="path" path="/sign-in" forceRedirectUrl="/" />
//   </div>
// );

// export default SignInPage;
