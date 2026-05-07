import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import MainLayout from "../components/layout/MainLayout";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
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
            const data = await loginUser(formData);
            login(data.user, data.token);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid credentials"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="flex items-center justify-center min-h-[85vh] px-4">
                <div className="w-full max-w-md">
                    <div className="bg-[#091225] border border-slate-800 rounded-2xl p-8 shadow-xl">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white">
                                Welcome Back
                            </h1>

                            <p className="text-gray-400 mt-2 text-sm">
                                Developer Intelligence for the modern builder.
                            </p>
                        </div>

                        {
                            error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
                                    {error}
                                </div>
                            )
                        }

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* Email */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-400">
                                        Email Address
                                    </label>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@company.com"
                                    required
                                    className="w-full bg-[#020817] border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-white"
                                />
                            </div>
                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs uppercase tracking-widest text-gray-400">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs text-blue-400 hover:text-blue-300"
                                    >
                                        Forgot?
                                    </button>

                                </div>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-[#020817] border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 transition rounded-lg py-3 font-semibold flex items-center justify-center gap-2"
                            >

                                {
                                    loading
                                        ? "Signing In..."
                                        : "Login"
                                }

                                <FiArrowRight />
                            </button>

                        </form>

                        <div className="border-t border-slate-800 mt-8 pt-6 text-center">
                            <p className="text-gray-400 text-sm">
                                Don’t have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-400 hover:text-blue-300 font-medium"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
};

export default Login;