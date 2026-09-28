import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Lock,
    Save,
    Search,
    Globe,
    Check,
    Copy,
    Compass,
    Eye,
    EyeOff,
    RotateCcw,
    Shield,
    ExternalLink,
    AlertCircle,
    Loader2,
    X,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { toast } from "../../components/ui/toast";
import { useGetCompanyInfo, useUpdateCompany, useUpdateContactInfo } from "../../hooks/useCompany";
import { useDeleteSocial, useGetSocials } from "../../hooks/useSocials";
import AddSocialDialog from "../../components/admin/AddSocialDialog";
import type { Social } from "../../@types/social";
import DeleteAlertDialog from "../../components/admin/DeleteAlertDialog";
import EditSocialDialog from "../../components/admin/EditSocialDialog";
import { useGetLocation } from "../../hooks/useLocation";
import LocationSettingsTab from "../../components/admin/LocationSettingsTab";
import SecuritySettingsTab from "../../components/admin/SecuritySettingsTab";

type TabKey = "company" | "contact" | "location" | "security";



const Settings = () => {
    const [activeTab, setActiveTab] = useState<TabKey>("company");

    // -------------------------------------------------------------
    // 1. Company Profile State
    // -------------------------------------------------------------
    const {data:company,isLoading:isCompanyLoading}=useGetCompanyInfo(activeTab === 'company' || activeTab === 'contact');
    const {mutateAsync:updateCompany, isPending:isCompanyUpdating}=useUpdateCompany();
    const [companyName, setCompanyName] = useState(company?.name || "");
    const isCompanyNameEdited=companyName.trim() !== (company?.name || "").trim();

    const handleUpdateCompany=async()=>{
        try {
            const formData=new FormData();
            formData.append("name",companyName.trim());
            await updateCompany(formData);
            
            toast.add({
                description:"Company updated successfully",
                type:"success"
            });

        } catch (error:any) {
            toast.add({
                description:error?.response?.data?.message || "error updating company",
                type:"error"
            });
        }
    }

    useEffect(()=>{
        if(company){
            setCompanyName(company.name || "");
        }
    },[company]);
    
    // -------------------------------------------------------------
    // 2. Contact Informatio
    // -------------------------------------------------------------
    const [primaryEmail, setPrimaryEmail] = useState(company?.contact_email || "");
    const [primaryPhone, setPrimaryPhone] = useState(company?.contact_phone || "");
    const isEmailEdited=primaryEmail.trim() !== (company?.contact_email || "").trim();
    const isPhoneEdited=primaryPhone.trim() !== (company?.contact_phone || "").trim();

    const {mutateAsync:updateContactInfo,isPending:isContactInfoUpdating}=useUpdateContactInfo();
    const handleUpdateContactInfo=async()=>{
        try {
            await updateContactInfo({
                contact_email:primaryEmail.trim(),
                contact_phone:primaryPhone.trim()
            });
            
            toast.add({
                description:"Contact information updated successfully",
                type:"success"
            });

        } catch (error:any) {
            toast.add({
                description:error?.response?.data?.message || "error updating contact information",
                type:"error"
            });
        }
    }

    useEffect(()=>{
        if(company){
            setPrimaryEmail(company.contact_email || "");
            setPrimaryPhone(company.contact_phone || "");
        }
    },[company]);

    // -------------------------------------------------------------
    // 3. Social Media State
    // -------------------------------------------------------------

    const {data:socials}=useGetSocials(activeTab === "contact");
    const [openAddSocial,setOpenAddSocial]=useState<boolean>(false);
    const [openEditSocial,setOpenEditSocial]=useState<boolean>(false);
    const [openDeleteDialog,setOpenDeleteDialog]=useState<boolean>(false);
    const [selectedSocial,setSelectedSocial]=useState<Social | null>(null);

    const {mutateAsync:deleteSocial,isPending:isDeletingSocial}=useDeleteSocial();

    const handleOpenEditSocial=(social:Social)=>{
        setSelectedSocial(social);
        setOpenEditSocial(true);
    }
    const handleOpenDeleteDialog=(social:Social)=>{
        setSelectedSocial(social);
        setOpenDeleteDialog(true);
    }
    const handleDeleteSocial=async()=>{
        if(!selectedSocial) return;
        try {
            await deleteSocial(selectedSocial.id);
            setOpenDeleteDialog(false);
            setSelectedSocial(null);
            toast.add({
                description:"Social deleted successfully",
                type:"success"
            });
        } catch (error:any) {
            toast.add({
                description:error?.response?.data?.message || "error deleting social",
                type:"error"
            });
        }
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-full pb-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#ECE9E5] pb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="uppercase body-text text-[11px] tracking-[0.2em] text-primary font-semibold">
                            System Management
                        </span>
                    </div>
                    <h1 className="title text-2xl sm:text-3xl text-neutral-900 tracking-tight mt-1">
                        Global Settings
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Configure company branding, contact details, social accounts, Mapbox coordinates, and credentials.
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#ECE9E5] overflow-x-auto custom-scrollbar pb-px">
                <button
                    type="button"
                    onClick={() => setActiveTab("company")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                        activeTab === "company"
                            ? "border-primary text-primary bg-[#FAF9F6]"
                            : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300"
                    }`}
                >
                    <Building2 className="h-4 w-4" />
                    Company Profile
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("contact")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                        activeTab === "contact"
                            ? "border-primary text-primary bg-[#FAF9F6]"
                            : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300"
                    }`}
                >
                    <Mail className="h-4 w-4" />
                    Contact & Socials
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("location")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                        activeTab === "location"
                            ? "border-primary text-primary bg-[#FAF9F6]"
                            : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300"
                    }`}
                >
                    <MapPin className="h-4 w-4" />
                    Location & Mapbox
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                        activeTab === "security"
                            ? "border-primary text-primary bg-[#FAF9F6]"
                            : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300"
                    }`}
                >
                    <Lock className="h-4 w-4" />
                    Admin Security
                </button>
            </div>

            {/* Tab 1: Company Profile */}
            {activeTab === "company" && (

                <section className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs">
                    <h2 className="title text-lg text-neutral-900 mb-1 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        Brand Identity & Details
                    </h2>
                    <p className="body-text text-xs text-neutral-500 mb-6">
                        Basic public information displayed across property brochures, footers, and SEO metadata.
                    </p>

                    <div className="space-y-5">
                        <div >
                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                Company Name
                            </label>
                            <div className="flex items-center gap-1">
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="E.g. Amiana Estates"
                                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase"
                                />
                                {isCompanyNameEdited &&
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="cursor-pointer"
                                        onClick={handleUpdateCompany}
                                        disabled={isCompanyUpdating}
                                    >
                                        {isCompanyUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
                                        {!isCompanyUpdating && <Save className="h-4 w-4" />}
                                    </Button>
                                }
                            </div>
                        </div>

                    </div>
                </section>
            )}

            {/* Tab 2: Contact & Socials */}
            {activeTab === "contact" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contact Channels */}
                    <section className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-5">
                        <div>
                            <h2 className="title text-lg text-neutral-900 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                Official Contact Channels
                            </h2>
                            <p className="body-text text-xs text-neutral-500 mt-1">
                                Inquiries sent from the residence contact form and footer links will route to these.
                            </p>
                        </div>

                        <div>
                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                Primary Inquiries Email
                            </label>
                            <div className="relative flex items-center gap-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <input
                                    type="email"
                                    value={primaryEmail}
                                    onChange={(e) => setPrimaryEmail(e.target.value)}
                                    placeholder="inquiries@amianaestates.com"
                                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                />
                                {
                                    isEmailEdited &&(
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="cursor-pointer"
                                            onClick={handleUpdateContactInfo}
                                            disabled={isContactInfoUpdating}
                                        >
                                            {isContactInfoUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
                                            {!isContactInfoUpdating && <Save className="h-4 w-4" />}
                                        </Button>
                                    )
                                }
                            </div>
                        </div>

                        <div className="gap-4">
                            <div>
                                <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                    Primary Phone
                                </label>
                                <div className="relative flex items-center gap-1">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                    <input
                                        type="tel"
                                        value={primaryPhone}
                                        onChange={(e) => setPrimaryPhone(e.target.value)}
                                        placeholder="+232 76 000 000"
                                        className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    {
                                        isPhoneEdited &&(
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="cursor-pointer"
                                                onClick={handleUpdateContactInfo}
                                                disabled={isContactInfoUpdating}
                                            >
                                                {isContactInfoUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
                                                {!isContactInfoUpdating && <Save className="h-4 w-4" />}
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Social Media Links */}
                    <section className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-5">
                        <div className="flex flex-col gap-5">
                            <div className="">
                                <h2 className="title text-lg text-neutral-900 flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-primary" />
                                    Social Media Handles
                                </h2>
                                <p className="body-text text-xs text-neutral-500 mt-1">
                                    Connected profiles rendered on the public website footer and navigation bar.
                                </p>
                            </div>
                            <Button
                                onClick={()=>setOpenAddSocial(true)}
                            >
                                <Plus className="h-4 w-4" />
                                Add Social Link
                            </Button>
                        </div>
                        {/* social label and links */}
                        <div className="flex flex-col gap-2">
                            {socials?.map((social)=>{
                                return(
                                    <div 
                                        key={social?.id} 
                                        className="flex flex-row items-center  justify-between"
                                    >
                                        <p className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700">{social.label}</p>
                                        {/* actions */}
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button
                                                type="button"
                                                title={`Edit ${social.label}`}
                                                aria-label={`Edit ${social.label}`}
                                                onClick={()=>{
                                                    handleOpenEditSocial(social);
                                                }}
                                                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#ECE9E5] text-neutral-600 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                title={`Delete ${social.label}`}
                                                aria-label={`Delete ${social.label}`}
                                                onClick={()=>{
                                                    handleOpenDeleteDialog(social);
                                                }}
                                                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#ECE9E5] text-neutral-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </section>
                </div>
            )}

            {/* Tab 3: Location & Mapbox Integration */}
            {activeTab === "location" && (
                <LocationSettingsTab activeTab={activeTab} />
            )}

            {/* Tab 4: Security & Change Password */}
            {activeTab === "security" && (
                <SecuritySettingsTab/>
            )}

            <AddSocialDialog
                open={openAddSocial}
                setOpen={setOpenAddSocial}
            />

            <EditSocialDialog
                open={openEditSocial}
                setOpen={setOpenEditSocial}
                social={selectedSocial}
            />

            <DeleteAlertDialog
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                isLoading={isDeletingSocial}
                onConfirm={handleDeleteSocial}
                onCancel={()=>setOpenDeleteDialog(false)}
                title="Delete Social"
                description={`Are you sure you want to delete ${selectedSocial?.label} social link?`}
            />
        </div>
    );
};

export default Settings;