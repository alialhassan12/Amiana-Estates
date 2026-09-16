import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useAuth";
import type { LoginType } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "../components/ui/toast";
import { 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    ArrowLeft, 
    ShieldCheck, 
    Loader2,
    KeyRound
} from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    });

    const { mutateAsync, isPending } = useLogin();

    const onSubmit = async (credentials: LoginType) => {
        try {
            await mutateAsync(credentials);
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Login failed:", error);
        }
    };

    const onInvalid = () => {
        toast.add({
            description: "Please fill in all the fields correctly",
            type: 'error'
        });
    };

    return (
        <div className="min-h-screen w-full flex bg-[#0A0A0B] text-white selection:bg-primary/30 selection:text-white">
            <div className="w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 xl:p-20 relative bg-[#0C0B0D]">

                <div className="flex items-center justify-between relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors py-2 group"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                        <span>Return to Estate</span>
                    </Link>
                </div>

                {/* Main Form Centerpiece */}
                <div className="w-full max-w-md mx-auto my-auto relative z-10 py-10">
                    {/* Header */}
                    <div className="mb-10 text-left">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="uppercase body-text text-[11px] tracking-[0.25em] text-primary font-medium">
                                Amiana Estates Authentication
                            </span>
                        </div>
                        <h1 className="title text-3xl sm:text-4xl text-white font-normal tracking-tight">
                            Sign In
                        </h1>
                        <p className="body-text text-sm text-neutral-400 mt-2 font-light leading-relaxed">
                            Welcome back. Enter your credentials to manage your portfolio.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label 
                                htmlFor="email"
                                className="block body-text uppercase text-[11px] tracking-[0.18em] text-neutral-300 font-medium"
                            >
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-primary transition-colors">
                                    <Mail className="size-4" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="client@amianaestates.com"
                                    {...register("email")}
                                    className={`w-full pl-10 pr-4 py-3.5 bg-[#141416] border ${
                                        errors.email ? "border-red-500/80 focus:border-red-500" : "border-[#262524] focus:border-primary"
                                    } text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 ${
                                        errors.email ? "focus:ring-red-500/30" : "focus:ring-primary/30"
                                    } transition-all duration-200 body-text`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1 flex items-center gap-1 body-text">
                                    <span>{errors.email.message}</span>
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="">
                                <label 
                                    htmlFor="password"
                                    className="block body-text uppercase text-[11px] tracking-[0.18em] text-neutral-300 font-medium"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-primary transition-colors">
                                    <Lock className="size-4" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="••••••••••••"
                                    {...register("password")}
                                    className={`w-full pl-10 pr-11 py-3.5 bg-[#141416] border ${
                                        errors.password ? "border-red-500/80 focus:border-red-500" : "border-[#262524] focus:border-primary"
                                    } text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 ${
                                        errors.password ? "focus:ring-red-500/30" : "focus:ring-primary/30"
                                    } transition-all duration-200 body-text`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-white transition-colors cursor-pointer"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-400 mt-1 flex items-center gap-1 body-text">
                                    <span>{errors.password.message}</span>
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary hover:bg-[#9E7C4B] disabled:opacity-50 text-white py-3.5 px-6 uppercase tracking-[0.25em] text-xs font-semibold transition-all duration-300 shadow-lg shadow-black/40 flex items-center justify-center gap-2 cursor-pointer group"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Verifying Credentials...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Enter Residence Portal</span>
                                        <KeyRound className="size-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
