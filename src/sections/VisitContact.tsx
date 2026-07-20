import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "../lib/content";
import { isSupabaseConfigured, submitOrder, type OrderInsert } from "../lib/supabase";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { PillButton } from "../components/PillButton";
import { MagneticLink } from "../components/LinkUnderline";

type Status = "idle" | "submitting" | "ok" | "err";

export function VisitContact() {
  const reduced = usePrefersReducedMotion();
  const { visit_contact, signature_cakes } = site;
  const [status, setStatus] = useState<Status>("idle");

  const cakeOptions = signature_cakes.items.map((i) => i.name);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const order: OrderInsert = {
      name: String(form.get("name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      cake_type: String(form.get("cake_type") || "").trim(),
      message: String(form.get("message") || "").trim(),
      preferred_date: String(form.get("preferred_date") || "").trim() || undefined,
    };
    if (!order.name || !order.phone || !order.cake_type) {
      setStatus("err");
      return;
    }
    try {
      await submitOrder(order);
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      console.error("Order submit failed:", err);
      setStatus("err");
    }
  };

  return (
    <section className="relative pt-[clamp(5rem,12vw,11rem)] pb-[clamp(5rem,12vw,11rem)] px-[clamp(1.25rem,5vw,6rem)] scroll-mt-20" id="visit" aria-label="Visit and order">
      <div className="max-w-[1280px] mx-auto mb-[clamp(3rem,6vw,5rem)] flex flex-col gap-5">
        <span className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-[0.6rem]">{visit_contact.eyebrow}</span>
        <motion.h2
          className="font-display text-h2 leading-[1.04] tracking-[-0.02em] font-[400] m-0 text-ink max-w-[16ch]"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {visit_contact.h2}
        </motion.h2>
      </div>

      <div className="max-w-[1280px] mx-auto grid grid-cols-[1.1fr_1fr] gap-[clamp(1.5rem,5vw,4rem)] items-start max-md:grid-cols-1">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 pb-4 border-b border-hairline">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] uppercase text-ink-muted">Call</span>
              <a className="font-display text-[1.4rem] text-ink no-underline font-[400]" href={`tel:${visit_contact.phone.replace(/\s/g, "")}`}>
                {visit_contact.phone}
              </a>
            </div>
            <div className="flex flex-col gap-1 pb-4 border-b border-hairline">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] uppercase text-ink-muted">WhatsApp</span>
              <a className="font-display text-[1.4rem] text-ink no-underline font-[400]" href={visit_contact.whatsapp_deep_link} target="_blank" rel="noreferrer">
                {visit_contact.whatsapp_display}
              </a>
            </div>
            <div className="flex flex-col gap-1 pb-4 border-b border-hairline">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] uppercase text-ink-muted">Email</span>
              <a className="font-display text-[1.4rem] text-ink no-underline font-[400]" href={`mailto:${visit_contact.email}`}>
                {visit_contact.email}
              </a>
            </div>
            <div className="flex flex-col gap-1 pb-4 border-b border-hairline">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] uppercase text-ink-muted">Follow</span>
              <span className="flex gap-5 mt-1">
                <MagneticLink href={visit_contact.instagram_url} target="_blank" rel="noreferrer" magnetic={false}>Instagram</MagneticLink>
                <MagneticLink href={visit_contact.facebook_url} target="_blank" rel="noreferrer" magnetic={false}>Facebook</MagneticLink>
              </span>
            </div>
          </div>

          <div className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-muted">{visit_contact.service_area}</div>
          <div className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-muted">{visit_contact.hours_note}</div>

          <div className="h-[clamp(220px,30vw,320px)] rounded-[14px] overflow-hidden bg-surface border border-hairline">
            <iframe
              title="Service area map — Thiruvananthapuram"
              src={visit_contact.map_embed.embed_url_template}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>
        </div>

        <form className="bg-background border border-hairline rounded-[14px] p-[clamp(1.5rem,4vw,2.5rem)] flex flex-col gap-5 shadow-[0_1px_0_rgba(58,46,42,0.04),0_30px_60px_-50px_rgba(58,46,42,0.3)]" onSubmit={onSubmit} data-cursor="ring">
          <h3 className="font-display text-[1.6rem] m-0 font-[400]">Order a cake</h3>
          <p className="text-[0.85rem] text-ink-muted m-0">
            Tell us a little about your celebration — we'll reply by phone or WhatsApp.
          </p>

          <div className="flex flex-col gap-2">
            <label htmlFor="f-name" className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted">Your name *</label>
            <input className="px-4 py-[0.85rem] bg-transparent border border-hairline rounded-[10px] text-ink font-body text-base transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:border-ink focus:bg-white disabled:opacity-50 h-12" id="f-name" name="name" type="text" required autoComplete="name" inputMode="text" disabled={status === "submitting"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="f-phone" className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted">Phone *</label>
            <input className="px-4 py-[0.85rem] bg-transparent border border-hairline rounded-[10px] text-ink font-body text-base transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:border-ink focus:bg-white disabled:opacity-50 h-12" id="f-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91 ..." disabled={status === "submitting"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="f-cake" className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted">Cake *</label>
            <select className="px-4 py-[0.85rem] bg-transparent border border-hairline rounded-[10px] text-ink font-body text-base transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:border-ink focus:bg-white appearance-none cursor-pointer disabled:opacity-50 h-12" id="f-cake" name="cake_type" required defaultValue="" disabled={status === "submitting"}>
              <option value="" disabled>Choose a cake</option>
              {cakeOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="Custom">Something custom</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="f-date" className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted">Preferred date</label>
            <input className="px-4 py-[0.85rem] bg-transparent border border-hairline rounded-[10px] text-ink font-body text-base transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:border-ink focus:bg-white disabled:opacity-50 h-12" id="f-date" name="preferred_date" type="date" disabled={status === "submitting"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="f-msg" className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted">Message</label>
            <textarea className="px-4 py-[0.85rem] bg-transparent border border-hairline rounded-[10px] text-ink font-body text-base transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:border-ink focus:bg-white resize-y min-h-[110px] disabled:opacity-50" id="f-msg" name="message" placeholder="Occasion, number of guests, flavour ideas..." disabled={status === "submitting"} />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <PillButton type="submit" className="min-h-12" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send order"}
            </PillButton>
            {status === "ok" && (
              <span className="font-mono text-[0.78rem] tracking-[0.04em] px-[0.85rem] py-2 rounded-full bg-accent-mint text-ink">
                Thank you — we'll be in touch soon.
              </span>
            )}
            {status === "err" && (
              <span className="font-mono text-[0.78rem] tracking-[0.04em] px-[0.85rem] py-2 rounded-full bg-surface text-ink">
                Please try again, or WhatsApp us directly.
              </span>
            )}
          </div>

          {!isSupabaseConfigured && import.meta.env.DEV && (
            <p className="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-muted mt-2">
              Dev demo mode — submissions are simulated. Configure Supabase env vars in production.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
