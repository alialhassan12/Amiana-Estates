import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, Phone, User, MessageSquare, Gem, CheckCircle2, Sparkle, ChevronDown } from "lucide-react";
import { useSubmitEnquiry } from "../hooks/useEnquiry";
import { toast } from "./ui/toast";
import { useGetPropertyTypesForFeatures } from "../hooks/usePropertyTypes";
import { useInView } from "../hooks/useInView";

const Enquiry = () => {
    const {isInView,ref}=useInView({rootMargin:'250px'})
    const { mutateAsync: submitEnquiry, isPending } = useSubmitEnquiry();
    const {data}=useGetPropertyTypesForFeatures(isInView);
    const propertyTypes=data?.propertyTypes;
    console.log(propertyTypes);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await submitEnquiry({
                name: form.name,
                email: form.email,
                phone: form.phone || undefined,
                interest: form.interest,
                message: form.message,
            });
            setSubmitted(true);
            setForm({ name: "", email: "", phone: "", interest: "", message: "" });
        } catch (err: any) {
            toast.add({
                description: typeof err === "string" ? err : "Submission failed. Please try again later.",
                type: "error",
            });
        }
    };

    const inputBase =
        "w-full bg-transparent border-b border-white/20 py-3.5 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 body-text tracking-wide";

    return (
        <section
            id="enquiry"
            ref={ref}
            className="relative w-full overflow-hidden bg-[#0E0D0B] px-6 sm:px-10 md:px-16 lg:px-20 py-20 sm:py-28 lg:py-36 "
        >
            {/* Background ambient gradient */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 60% 100%, rgba(179,143,91,0.07) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 xl:gap-32 items-start">

                    {/* Left: Copy */}
                    <div className="flex flex-col gap-8">
                        <p
                            data-aos="fade-up"
                            className="body-text text-[10px] font-medium uppercase tracking-[0.28em] text-[#B38F5B]"
                        >
                            Private Enquiries
                        </p>

                        <div data-aos="fade-up" data-aos-delay="100">
                            <h2 className="title text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight uppercase">
                                Begin Your&nbsp;
                                <span className="italic text-[#B38F5B]">Journey</span>
                            </h2>
                        </div>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="body-text text-sm sm:text-base text-white/50 leading-relaxed max-w-md"
                        >
                            Our private residences team is on hand to guide you through every
                            detail — from your first viewing to the moment you call Amiana home.
                            Share your interest and we will be in touch within 24 hours.
                        </p>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="350"
                            className="mt-4 flex items-center gap-4"
                        >
                            <div className="h-px flex-1 bg-white/8" />
                            <span className="title text-[#B38F5B]/40 text-lg italic">
                                <Sparkle className="h-4 w-4" />
                            </span>
                            <div className="h-px flex-1 bg-white/8" />
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div data-aos="fade-up" data-aos-delay="150">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#B38F5B]/40 bg-[#B38F5B]/10">
                                    <CheckCircle2 className="h-7 w-7 text-[#B38F5B]" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="title text-2xl text-white uppercase tracking-wide">
                                        Enquiry Received
                                    </h3>
                                    <p className="body-text text-sm text-white/45 leading-relaxed max-w-xs">
                                        Thank you for reaching out. We will be in touch
                                        with you shortly.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="body-text mt-2 flex items-center gap-2 border-b border-[#B38F5B]/50 pb-1 text-xs uppercase tracking-[0.2em] text-[#B38F5B] transition-opacity hover:opacity-70"
                                >
                                    Submit another enquiry
                                    <ArrowRight className="h-3 w-3" />
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-0 border border-white/8 bg-white/[0.025] backdrop-blur-sm"
                                noValidate
                            >
                                {/* Form header strip */}
                                <div className="border-b border-white/8 px-8 py-5">
                                    <p className="body-text text-[10px] uppercase tracking-[0.22em] text-[#B38F5B]">
                                        Confidential Enquiry Form
                                    </p>
                                </div>

                                {/* Fields */}
                                <div className="flex flex-col gap-0 px-8 pt-6 pb-8">
                                    {/* Row: Name + Phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                                        {/* Full Name */}
                                        <div className="relative group pb-7">
                                            <label
                                                htmlFor="enq-name"
                                                className="body-text flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/35 mb-2"
                                            >
                                                <User className="h-3 w-3" />
                                                Full Name
                                            </label>
                                            <input
                                                id="enq-name"
                                                name="name"
                                                type="text"
                                                required
                                                autoComplete="name"
                                                placeholder="Alexander Whitmore"
                                                value={form.name}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("name")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputBase}
                                                style={{
                                                    borderBottomColor:
                                                        focusedField === "name"
                                                            ? "#B38F5B"
                                                            : "rgba(255,255,255,0.15)",
                                                }}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="relative group pb-7">
                                            <label
                                                htmlFor="enq-phone"
                                                className="body-text flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/35 mb-2"
                                            >
                                                <Phone className="h-3 w-3" />
                                                Phone Number
                                            </label>
                                            <input
                                                id="enq-phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                placeholder="+232 76 000 000"
                                                value={form.phone}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("phone")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputBase}
                                                style={{
                                                    borderBottomColor:
                                                        focusedField === "phone"
                                                            ? "#B38F5B"
                                                            : "rgba(255,255,255,0.15)",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="relative group pb-7">
                                        <label
                                            htmlFor="enq-email"
                                            className="body-text flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/35 mb-2"
                                        >
                                            <Mail className="h-3 w-3" />
                                            Email Address
                                        </label>
                                        <input
                                            id="enq-email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            placeholder="a.whitmore@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            className={inputBase}
                                            style={{
                                                borderBottomColor:
                                                    focusedField === "email"
                                                        ? "#B38F5B"
                                                        : "rgba(255,255,255,0.15)",
                                            }}
                                        />
                                    </div>

                                    {/* Interest */}
                                    <div className="relative group pb-7">
                                        <label
                                            htmlFor="enq-interest"
                                            className="body-text flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/35 mb-2"
                                        >
                                            <Gem className="h-3 w-3" />
                                            I am interested in
                                        </label>
                                        <select
                                            id="enq-interest"
                                            name="interest"
                                            required
                                            value={form.interest}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("interest")}
                                            onBlur={() => setFocusedField(null)}
                                            className={`${inputBase} appearance-none cursor-pointer`}
                                            style={{
                                                borderBottomColor:
                                                    focusedField === "interest"
                                                        ? "#B38F5B"
                                                        : "rgba(255,255,255,0.15)",
                                                background: "transparent",
                                                color: form.interest ? "white" : "rgba(255,255,255,0.3)",
                                            }}
                                        >
                                            <option value="" disabled style={{ background: "#161513" }}>
                                                Select your interest…
                                            </option>
                                            {propertyTypes?.map((opt) => (
                                                <option
                                                    key={opt?.id}
                                                    value={opt?.title}
                                                    style={{ background: "#161513", color: "white" }}
                                                >
                                                    {opt?.title}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute right-0 bottom-7 text-[#B38F5B]/60">
                                            <ChevronDown className="w-5 h-5"/>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="relative group pb-2">
                                        <label
                                            htmlFor="enq-message"
                                            className="body-text flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/35 mb-2"
                                        >
                                            <MessageSquare className="h-3 w-3" />
                                            Your Message
                                        </label>
                                        <textarea
                                            id="enq-message"
                                            name="message"
                                            required
                                            rows={4}
                                            placeholder="I would like to learn more about…"
                                            value={form.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("message")}
                                            onBlur={() => setFocusedField(null)}
                                            className={`${inputBase} resize-none leading-relaxed`}
                                            style={{
                                                borderBottomColor:
                                                    focusedField === "message"
                                                        ? "#B38F5B"
                                                        : "rgba(255,255,255,0.15)",
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/8 px-8 py-6">
                                    <button
                                        id="enq-submit"
                                        type="submit"
                                        disabled={isPending}
                                        className="group flex items-center gap-3 bg-[#B38F5B] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed body-text"
                                    >
                                        {isPending ? (
                                            <>
                                                <span
                                                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black"
                                                    aria-hidden
                                                />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                Submit Enquiry
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Enquiry;
