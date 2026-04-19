import React, { useState } from 'react';
import { Mail,Lock, User, UserPlus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        // Here you would typically send the formData to your backend API for registration
        console.log('User Registered:', formData);
        // After successful registration, navigate to the login page
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-zinc-900flex items-center justify-center">
            <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Sign up to get started!</p>
                </div>
                <form onSubmit={handleSignUp} className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-sm font medium text-zinc-300 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500group-focus-within:text-indigo-400" />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-10 pr-4 focus:ring-indigo-500/50"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-10 pr-4 focus:ring-indigo-500/50"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                    </div>


                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform-translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400" />
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-3 pl-10 pr-4 focus:ring-indigo-500/50"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2transition-all shadow-lg shadow-indigo-500/20">
                        <UserPlus className=" w-5 h-5 " />
                        Sign Up
                    </button>
                
                </form>
                <p className="text-center text-zinc-500 mt-8 text-sm">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-400 font-medium hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;