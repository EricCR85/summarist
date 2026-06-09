"use client";
import { useState } from "react";
import { auth } from "../app/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthModal({ toggleModal }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isSignUp, setIsSignUp] = useState(false);

const handleAuth = async (e) => {
e.preventDefault();
try {
if (isSignUp) {
await createUserWithEmailAndPassword(auth, email, password);
alert("Account created!");
} else {
await signInWithEmailAndPassword(auth, email, password);
alert("Logged in!");
}
toggleModal();
} catch (error) {
alert(error.message);
}
};

return (
<div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<form onSubmit={handleAuth} style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
<h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
<input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
<input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
<button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
<p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer', color: 'blue' }}>
{isSignUp ? "Already have an account? Log in" : "Need an account? Sign up"}
</p>
</form>
</div>
);
}