import { useState } from "react";
import { toast } from "../ui/toast";
import { AlertCircle, Check, Eye, EyeOff, Loader2, Lock, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { useUpdatePassword } from "../../hooks/useAuth";

const SecuritySettingsTab=()=>{

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {mutateAsync:updatePassword,isPending:isUpdatingPassword}=useUpdatePassword();

    const handlePasswordChange = async(e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword) {
            toast.add({
                description: "Please enter your current password.",
                type: "error",
            });
            return;
        }

        if (newPassword.length < 8) {
            toast.add({
                description: "New password must be at least 8 characters long.",
                type: "error",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.add({
                description: "New passwords do not match.",
                type: "error",
            });
            return;
        }

        try{
            await updatePassword({
                current_password:currentPassword,
                new_password:newPassword,
                confirm_password:confirmPassword
            });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            toast.add({
                description: "Password changed successfully.",
                type: "success",
            });
        }catch (error:any){
            toast.add({
                description:error?.response?.data?.message || "Failed to update password. Please try again.",
                type: "error",
            });
        }
    };

    // Password strength calculation
    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { score: 0, label: "Empty", color: "bg-neutral-200" };
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        switch (score) {
            case 1:
                return { score: 25, label: "Weak", color: "bg-red-500" };
            case 2:
                return { score: 50, label: "Fair", color: "bg-amber-500" };
            case 3:
                return { score: 75, label: "Good", color: "bg-blue-500" };
            case 4:
                return { score: 100, label: "Strong", color: "bg-emerald-500" };
            default:
                return { score: 10, label: "Very Weak", color: "bg-red-400" };
        }
    };

    const strength = getPasswordStrength(newPassword);

    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handlePasswordChange}
                            className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6"
                        >
                            <div>
                                <h2 className="title text-lg text-neutral-900 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    Change Admin Password
                                </h2>
                                <p className="body-text text-xs text-neutral-500 mt-1">
                                    Ensure your administrator account uses a strong, unique password to prevent unauthorized access.
                                </p>
                            </div>

                            {/* Current Password */}
                            <div>
                                <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full pl-3.5 pr-10 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                                    >
                                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <hr className="border-[#ECE9E5]" />

                            {/* New Password */}
                            <div>
                                <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter strong password..."
                                        className="w-full pl-3.5 pr-10 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                                    >
                                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>

                                {/* Password Strength Meter */}
                                {newPassword && (
                                    <div className="mt-2 space-y-1.5">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-neutral-500">Strength:</span>
                                            <span className="font-semibold text-neutral-800">{strength.label}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${strength.color}`}
                                                style={{ width: `${strength.score}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Repeat new password..."
                                        className="w-full pl-3.5 pr-10 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1.5">Passwords do not match.</p>
                                )}
                                {confirmPassword && newPassword === confirmPassword && (
                                    <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                                        <Check className="h-3.5 w-3.5" /> Passwords match perfectly.
                                    </p>
                                )}
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isUpdatingPassword}
                                    className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                                >
                                    {isUpdatingPassword ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Updating Password...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="h-4 w-4" />
                                            Update Password
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Security Recommendations Card */}
                    <div className="space-y-6">
                        <section className="bg-white border border-[#ECE9E5] rounded-xl p-5 shadow-xs space-y-4">
                            <h3 className="title text-sm uppercase tracking-wider text-neutral-900 font-semibold flex items-center gap-1.5">
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                Password Requirements
                            </h3>

                            <ul className="space-y-2.5 text-xs text-neutral-600 body-text">
                                <li className="flex items-center gap-2">
                                    <span
                                        className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                                            newPassword.length >= 8
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-neutral-100 text-neutral-400"
                                        }`}
                                    >
                                        ✓
                                    </span>
                                    At least 8 characters
                                </li>
                                <li className="flex items-center gap-2">
                                    <span
                                        className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                                            /[A-Z]/.test(newPassword)
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-neutral-100 text-neutral-400"
                                        }`}
                                    >
                                        ✓
                                    </span>
                                    At least one uppercase letter (A-Z)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span
                                        className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                                            /[0-9]/.test(newPassword)
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-neutral-100 text-neutral-400"
                                        }`}
                                    >
                                        ✓
                                    </span>
                                    At least one number (0-9)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span
                                        className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                                            /[^A-Za-z0-9]/.test(newPassword)
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-neutral-100 text-neutral-400"
                                        }`}
                                    >
                                        ✓
                                    </span>
                                    At least one special character (!@#$%)
                                </li>
                            </ul>
                        </section>

                        <section className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-xl p-5 shadow-xs">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                                Session Info
                            </span>
                            <p className="text-xs text-neutral-500 leading-relaxed body-text">
                                Logged in as administrator. Session is secured with Bearer API tokens and rate-limited against brute force attempts.
                            </p>
                        </section>
                    </div>
                </div>
    )
}

export default SecuritySettingsTab