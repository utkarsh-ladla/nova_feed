import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import MainLayout from "../components/layout/MainLayout";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            const data = await registerUser(formData);
            login(data.user, data.token);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="flex items-center justify-center min-h-[85vh] px-4">
                <div className="w-full max-w-md">
                    <div className="bg-[#091225] border border-slate-800 rounded-2xl p-8 shadow-2xl">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white">
                                Create Account
                            </h1>

                            <p className="text-gray-400 mt-2 text-sm">
                                Join NovaFeed and bookmark your favorite stories.
                            </p>
                        </div>

                
                        {
                            error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
                                    {error}
                                </div>
                            )
                        }

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Utkarsh Ladla"
                                    required
                                    className="w-full bg-[#020817] border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@company.com"
                                    required
                                    className="w-full bg-[#020817] border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-[#020817] border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 transition rounded-lg py-3 font-semibold flex items-center justify-center gap-2"
                            >
                                {
                                    loading
                                        ? "Creating Account..."
                                        : "Create Account"
                                }

                                <FiArrowRight size={18} />
                            </button>
                        </form>

                        <div className="border-t border-slate-800 mt-8 pt-6 text-center">
                            <p className="text-gray-400 text-sm">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-400 hover:text-blue-300 font-medium transition"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex-1 h-[1px] bg-slate-800"></div>
                            <span className="text-xs uppercase text-gray-500">
                                Secure Authentication
                            </span>
                            <div className="flex-1 h-[1px] bg-slate-800"></div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Register;