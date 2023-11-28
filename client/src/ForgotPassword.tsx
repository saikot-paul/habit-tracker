import {FormEvent, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import config from "./config/config";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await sendPasswordResetEmail(config, email);
            alert("Check your email");
            navigate("/");
        } catch (error:any) {
            if (error.code === 'auth/user-not-found') {
                alert('User not found, try again!')
                setEmail('')
        }
    }

    // Inline styles
    const styles = {
        container: {
            textAlign: 'center',
            marginTop: '50px',
        },
        input: {
            margin: '10px',
        },
        button: {
            backgroundColor: '#4CAF50', // Green color
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
        }
    };

    return (
        <div style={styles.container}>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    style={styles.input}
                    name="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required 
                />
                <br/>
                <button style={styles.button} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Reset'}
                </button>
                {error && <p style={styles.error}>Error: {error}</p>}
            </form>
        </div>
    );
}

export default ForgotPassword;
