"use client";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FirebaseStatus from "../../components/FirebaseStatus";
import LoginForm from "../../components/LoginForm";
import { AUTH } from "../../firebase/firebaseInit";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (!AUTH) return;
    if (typeof window === "undefined") return;
    if (isSignInWithEmailLink(AUTH, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      console.log("Email salvo no localStorage:", email);
      if (!email) {
        email = window.prompt("Por favor, digite seu e-mail para login:");
      }
      console.log(`Email usado para login: ${email}`);
      if (email) {
        signInWithEmailLink(AUTH, email, window.location.href)
          .then(() => {
            window.localStorage.removeItem("emailForSignIn");
            router.push("/test"); // Redireciona para /test após login
          })
          .catch((error) => {
            alert(`Erro ao autenticar: ${error.message}`);
            console.error("Erro detalhado do Firebase:", error);
          });
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <FirebaseStatus />
        <LoginForm />
      </div>
    </div>
  );
} 
