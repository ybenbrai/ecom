// src/app/login/page.tsx
"use client";
import { useRouter } from "next/navigation";
import styles from "../../styles/login.module.css";
import LoginForm from "./LoginForm";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/login", {
      // Send POST to /login
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token); // Store the token
      login(data.access_token); // Update the auth state
      router.push("/"); // Redirect to home page
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
