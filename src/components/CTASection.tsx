"use client";

import React, { useState } from "react";
import { ArrowRight, Calendar, ShieldCheck, X, CheckCircle2, Loader2, Factory, MapPin, Phone, Building2 } from "lucide-react";

export default function CTASection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<any>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    plant_location: "Bengaluru, Karnataka",
    machine_count: 25,
    primary_challenge: "Legacy machine downtime & lack of real-time OEE visibility",
    preferred_date: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/v1/contact/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Failed to submit assessment request");
      }

      const data = await res.json();
      setSubmittedResponse(data);
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-[#050505] text-white overflow-hidden border-b border-white/10">
      {/* Background glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#00a7e1]/20 to-[#00d2b8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#0a0e17] via-[#0c121e] to-[#0a0e17] border border-white/15 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#00a7e1]" />
            <span className="font-mono text-[11px] font-semibold text-[#00a7e1] tracking-[0.2em] uppercase">
              Ready to Upgrade Your Factory?
            </span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Schedule Your On-Site Plant Audit
          </h2>

          <p className="font-mono text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Our engineering team will assess your legacy machinery, map out sensor placement, and deliver a zero-downtime ROI transformation proposal within 7 days.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => {
                setSubmittedResponse(null);
                setModalOpen(true);
              }}
              className="px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-[#00a7e1] text-black hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,167,225,0.4)] hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Plant Assessment</span>
            </button>
            <a
              href="/products"
              className="px-8 py-4 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-[#00a7e1]" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#0d121d] border border-white/20 p-6 sm:p-8 text-left shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedResponse ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-syne font-bold text-2xl text-white mb-2">Audit Confirmed!</h3>
                <p className="font-mono text-xs text-emerald-400 mb-6">REFERENCE ID: {submittedResponse.id}</p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left font-mono text-xs space-y-2 mb-6">
                  <div><span className="text-white/40">Company:</span> <span className="text-white">{submittedResponse.company}</span></div>
                  <div><span className="text-white/40">Assigned Squad:</span> <span className="text-[#00a7e1]">{submittedResponse.scheduled_team}</span></div>
                  <div><span className="text-white/40">Dispatch Status:</span> <span className="text-emerald-400">7-Day On-Site Deployment Queued</span></div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-syne font-bold text-xl text-white mb-1">Book On-Site Plant Audit</h3>
                  <p className="font-mono text-xs text-white/60">Powered by FastAPI Backend (`/api/v1/contact/assessment`)</p>
                </div>

                {formError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-[#00a7e1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1">Work Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@manufacturing.in"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-[#00a7e1] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1">Company Name</label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Auto Components"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-[#00a7e1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-[#00a7e1] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1">Plant Location (State/City)</label>
                    <input
                      required
                      type="text"
                      value={formData.plant_location}
                      onChange={(e) => setFormData({ ...formData, plant_location: e.target.value })}
                      placeholder="e.g. Bengaluru, KA / Chennai, TN"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-[#00a7e1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-white/70 uppercase mb-1">Machine Count to Retrofit</label>
                    <input
                      required
                      type="number"
                      min={1}
                      max={500}
                      value={formData.machine_count}
                      onChange={(e) => setFormData({ ...formData, machine_count: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-[#00a7e1] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-white/70 uppercase mb-1">Primary Challenge</label>
                  <textarea
                    rows={2}
                    value={formData.primary_challenge}
                    onChange={(e) => setFormData({ ...formData, primary_challenge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-xs font-mono focus:border-[#00a7e1] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest uppercase bg-[#00a7e1] text-black hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting to Backend...</span>
                    </>
                  ) : (
                    <span>Confirm Audit Booking</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
