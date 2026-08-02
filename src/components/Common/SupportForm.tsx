"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const VOLUNTEER_FORM = "https://forms.gle/your-form-id"; // replace with actual Google Form URL
const PAYBILL = "247247";
const ACCOUNT = "071218";

type Tab = "mpesa" | "inkind" | "partner";

export default function SupportForm() {
  const [tab, setTab] = useState<Tab>("mpesa");
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    vocation: "", organisation: "", duration: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handlePartner = (e: React.FormEvent) => {
    e.preventDefault();
    // Open Google Form in new tab — no backend needed
    window.open(VOLUNTEER_FORM, "_blank");
    toast.success("Opening registration form…");
  };

  const inputCls = "w-full rounded-md border border-border dark:border-dark_border bg-transparent px-4 py-3 text-base text-dark dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary transition";

  const tabs: { key: Tab; label: string }[] = [
    { key: "mpesa",   label: "M-Pesa" },
    { key: "inkind",  label: "In Kind" },
    { key: "partner", label: "Partner / Volunteer" },
  ];

  return (
    <div className="w-full">
      <Toaster />
      {/* Tab switcher */}
      <div className="flex rounded-lg overflow-hidden border border-border dark:border-dark_border mb-6">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-primary text-white"
                : "text-muted dark:text-white/60 hover:text-primary"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* M-Pesa */}
      {tab === "mpesa" && (
        <div className="space-y-4">
          <p className="text-sm text-muted dark:text-white/60 leading-relaxed">
            Send your contribution via M-Pesa Paybill. Please call us to confirm the transaction.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted dark:text-white/60">Paybill Number</span>
              <span className="font-bold text-midnight_text dark:text-white text-lg">{PAYBILL}</span>
            </div>
            <div className="border-t border-border dark:border-dark_border" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted dark:text-white/60">Account Number</span>
              <span className="font-bold text-midnight_text dark:text-white text-lg">{ACCOUNT}</span>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              📞 After sending, please call us to confirm your transaction and for us to acknowledge your support.
            </p>
          </div>
          <a href="tel:+254724571997"
            className="block w-full text-center bg-primary hover:bg-darkprimary text-white font-semibold py-3 rounded-lg transition-colors">
            Call to Confirm: +254 724 571 997
          </a>
        </div>
      )}

      {/* In Kind */}
      {tab === "inkind" && (
        <div className="space-y-4">
          <p className="text-sm text-muted dark:text-white/60 leading-relaxed">
            We welcome in-kind contributions — food, clothing, medical supplies, equipment, or professional services
            that directly support our rehabilitation programmes and community outreach.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 space-y-2">
            <p className="text-sm font-semibold text-midnight_text dark:text-white mb-3">What we accept:</p>
            {["Non-perishable food items", "Clothing & bedding", "Medical & hygiene supplies",
              "Professional services (medical, counselling, legal)", "Office & programme equipment"].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm text-muted dark:text-white/70">{i}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted dark:text-white/60">
            Contact us to discuss what you'd like to contribute and arrange logistics.
          </p>
          <a href="tel:+254724571997"
            className="block w-full text-center bg-primary hover:bg-darkprimary text-white font-semibold py-3 rounded-lg transition-colors">
            Call Us: +254 724 571 997
          </a>
        </div>
      )}

      {/* Partner / Volunteer */}
      {tab === "partner" && (
        <form onSubmit={handlePartner} className="space-y-4">
          <p className="text-sm text-muted dark:text-white/60 leading-relaxed">
            Join our team as a volunteer or partner. Fill in your details and we'll be in touch.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <input required value={form.firstName} onChange={set("firstName")} placeholder="First name *" className={inputCls} />
            <input required value={form.lastName} onChange={set("lastName")} placeholder="Last name *" className={inputCls} />
          </div>
          <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="Phone / WhatsApp *" className={inputCls} />
          <input required type="email" value={form.email} onChange={set("email")} placeholder="Email address *" className={inputCls} />
          <input required value={form.vocation} onChange={set("vocation")} placeholder="Vocation / Area of training *" className={inputCls} />
          <input value={form.organisation} onChange={set("organisation")} placeholder="Organisation (optional)" className={inputCls} />
          <div>
            <label className="text-xs text-muted dark:text-white/60 mb-1 block">Duration of volunteering *</label>
            <select required value={form.duration} onChange={set("duration")}
              className="w-full rounded-md border border-border dark:border-dark_border bg-white dark:bg-dark px-4 py-3 text-base text-dark dark:text-white focus:outline-none focus:border-primary">
              <option value="">Select duration</option>
              <option value="1week">1 Week</option>
              <option value="2weeks">2 Weeks</option>
              <option value="1month">1 Month</option>
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="1year">1 Year</option>
            </select>
          </div>
          <button type="submit"
            className="w-full bg-primary hover:bg-darkprimary text-white font-semibold py-3 rounded-lg transition-colors">
            Submit Registration
          </button>
          <p className="text-xs text-center text-muted dark:text-white/40">
            Submitting opens our registration form to complete your application.
          </p>
        </form>
      )}
    </div>
  );
}