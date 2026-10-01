import { useState } from "react";
import type { Enquiry } from "../../@types/enquirye";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import {
    Calendar,
    Clock,
    Copy,
    Check,
    Mail,
    MessageSquareQuote,
    Phone,
    Send,
    ExternalLink,
    Building2,
} from "lucide-react";

type ViewEnquiryDialogProps = {
    enquiry: Enquiry | null;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export const ViewEnquiryDialog = ({
    enquiry,
    open,
    setOpen,
}: ViewEnquiryDialogProps) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    if (!enquiry) {
        return null;
    }

    // Format date nicely
    const formatDateTime = (dateStr?: string) => {
        if (!dateStr) return "N/A";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }).format(date);
        } catch {
            return dateStr;
        }
    };

    // Calculate visitor initials
    const getInitials = (name?: string) => {
        if (!name) return "VE";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        toast.add({
            description: `${label} copied to clipboard`,
            type: "success",
        });
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleCopyFullDetails = () => {
        const fullSummary = `
            AMIANA ESTATES - ENQUIRY DETAILS
            ----------------------------------------
            Reference ID: #ENQ-${String(enquiry.id).padStart(4, "0")}
            Date: ${formatDateTime(enquiry.created_at)}
            Client Name: ${enquiry.name}
            Email: ${enquiry.email}
            Phone: ${enquiry.phone}
            Interest: ${enquiry.interest || "General Inquiry"}
            ----------------------------------------
            Message:
            ${enquiry.message}
            ----------------------------------------
        `.trim();

        navigator.clipboard.writeText(fullSummary);
        toast.add({
            description: "Full enquiry details copied to clipboard",
            type: "success",
        });
    };

    const emailSubject = encodeURIComponent(
        `Amiana Estates - Regarding Your Enquiry about ${enquiry.interest || "our properties"}`
    );
    const emailBody = encodeURIComponent(
        `Dear ${enquiry.name},\n\nThank you for reaching out to Amiana Estates regarding your interest in ${enquiry.interest || "our residences"}.\n\n`
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl md:max-w-2xl w-full !p-0 !gap-0 overflow-hidden bg-white border border-[#ECE9E5] shadow-2xl rounded-xl">
                {/* Header */}
                <DialogHeader className="shrink-0 border-b border-[#ECE9E5] px-6 py-5 bg-[#FAF9F6]/80 pr-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-xs">
                                <MessageSquareQuote className="h-5 w-5" />
                            </div>
                            <div>
                                <DialogTitle className="title text-xl text-neutral-900 tracking-tight font-medium">
                                    Enquiry Details
                                </DialogTitle>
                                <DialogDescription className="body-text text-xs text-neutral-500 mt-0.5 flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-neutral-400" />
                                    Submitted {formatDateTime(enquiry.created_at)}
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {/* Dialog Body Content */}
                <div className="px-6 py-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    {/* Visitor Card */}
                    <div className="p-4 sm:p-5 rounded-lg bg-[#FAF9F6] border border-[#ECE9E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="w-13 h-13 rounded-full bg-neutral-900 text-[#FAF9F6] flex items-center justify-center text-base font-serif tracking-widest border-2 border-primary/30 shadow-xs shrink-0">
                                {getInitials(enquiry.name)}
                            </div>
                            <div>
                                <span className="body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-400 block mb-0.5">
                                    Client / Visitor
                                </span>
                                <h3 className="title text-lg sm:text-xl text-neutral-900 font-medium tracking-tight">
                                    {enquiry.name}
                                </h3>
                            </div>
                        </div>

                        {/* Interest Badge */}
                        <div className="self-start sm:self-center">
                            <span className="body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-400 block mb-1 sm:text-right">
                                Area of Interest
                            </span>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/25 text-xs text-primary font-medium shadow-xs">
                                <Building2 className="h-3.5 w-3.5 shrink-0" />
                                <span className="tracking-wide">
                                    {enquiry.interest || "General Property Inquiry"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Email Card */}
                        <div className="p-3.5 sm:p-4 rounded-lg border border-[#ECE9E5] bg-white hover:border-neutral-300 transition-colors">
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-1.5 text-neutral-500">
                                    <Mail className="h-3.5 w-3.5 text-primary" />
                                    <span className="body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                                        Email Address
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(enquiry.email, "Email")}
                                    title="Copy email"
                                    className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                                >
                                    {copiedField === "Email" ? (
                                        <>
                                            <Check className="h-3 w-3 text-emerald-600" />
                                            <span className="text-emerald-600 font-medium">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3 w-3" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <a
                                href={`mailto:${enquiry.email}?subject=${emailSubject}&body=${emailBody}`}
                                className="body-text text-sm font-medium text-neutral-900 hover:text-primary transition-colors break-all flex items-center gap-1.5 group"
                            >
                                <span>{enquiry.email}</span>
                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                            </a>
                        </div>

                        {/* Phone Card */}
                        <div className="p-3.5 sm:p-4 rounded-lg border border-[#ECE9E5] bg-white hover:border-neutral-300 transition-colors">
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-1.5 text-neutral-500">
                                    <Phone className="h-3.5 w-3.5 text-primary" />
                                    <span className="body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                                        Phone Number
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy(enquiry.phone, "Phone")}
                                    title="Copy phone"
                                    className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                                >
                                    {copiedField === "Phone" ? (
                                        <>
                                            <Check className="h-3 w-3 text-emerald-600" />
                                            <span className="text-emerald-600 font-medium">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3 w-3" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <a
                                href={`tel:${enquiry.phone}`}
                                className="body-text text-sm font-medium text-neutral-900 hover:text-primary transition-colors flex items-center gap-1.5 group font-mono"
                            >
                                <span>{enquiry.phone}</span>
                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                            </a>
                        </div>
                    </div>

                    {/* Inquiry Message Section */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                                <MessageSquareQuote className="h-3.5 w-3.5 text-primary" />
                                Client Inquiry Message
                            </span>
                            <button
                                type="button"
                                onClick={() => handleCopy(enquiry.message, "Message")}
                                className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                            >
                                {copiedField === "Message" ? (
                                    <>
                                        <Check className="h-3 w-3 text-emerald-600" />
                                        <span className="text-emerald-600 font-medium">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3 w-3" />
                                        <span>Copy text</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="relative p-5 rounded-lg bg-[#FAF9F6] border border-[#ECE9E5] text-neutral-800">
                            <p className="body-text text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text">
                                {enquiry.message || "No message body provided."}
                            </p>
                        </div>
                    </div>

                    {/* Details Metadata */}
                    <div className="pt-2 border-t border-[#ECE9E5]/60 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 body-text gap-2">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                            <span>Received: {formatDateTime(enquiry.created_at)}</span>
                        </div>
                        {enquiry.updated_at && enquiry.updated_at !== enquiry.created_at && (
                            <div>
                                <span>Last Updated: {formatDateTime(enquiry.updated_at)}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 border-t border-[#ECE9E5] bg-[#FAF9F6] px-6 py-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCopyFullDetails}
                        className="border-[#ECE9E5] text-neutral-700 hover:bg-white cursor-pointer inline-flex items-center gap-1.5 text-xs"
                    >
                        <Copy className="h-3.5 w-3.5" />
                        Copy Full Details
                    </Button>

                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-[#ECE9E5] text-neutral-700 hover:bg-white cursor-pointer text-xs"
                        >
                            Close
                        </Button>
                        <a
                            href={`mailto:${enquiry.email}?subject=${emailSubject}&body=${emailBody}`}
                            className="inline-flex"
                        >
                            <Button
                                type="button"
                                className="bg-primary hover:bg-primary/90 text-white cursor-pointer inline-flex items-center gap-2 text-xs"
                            >
                                <Send className="h-3.5 w-3.5" />
                                Reply via Email
                            </Button>
                        </a>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewEnquiryDialog;