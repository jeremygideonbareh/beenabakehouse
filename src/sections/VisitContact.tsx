import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "../lib/content";
import { isSupabaseConfigured, submitOrder, type OrderInsert } from "../lib/supabase";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { PillButton } from "../components/PillButton";
import { MagneticLink } from "../components/LinkUnderline";
import "./VisitContact.css";

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
    <section className="section visit" id="visit" aria-label="Visit and order">
      <div className="visit__head">
        <span className="eyebrow">{visit_contact.eyebrow}</span>
        <motion.h2
          className="display h2"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {visit_contact.h2}
        </motion.h2>
      </div>

      <div className="visit__layout">
        <div className="visit__left">
          <div className="visit__contact-block">
            <div className="visit__contact-row">
              <span className="visit__contact-label">Call</span>
              <a className="visit__contact-value" href={`tel:${visit_contact.phone.replace(/\s/g, "")}`}>
                {visit_contact.phone}
              </a>
            </div>
            <div className="visit__contact-row">
              <span className="visit__contact-label">WhatsApp</span>
              <a className="visit__contact-value" href={visit_contact.whatsapp_deep_link} target="_blank" rel="noreferrer">
                {visit_contact.whatsapp_display}
              </a>
            </div>
            <div className="visit__contact-row">
              <span className="visit__contact-label">Email</span>
              <a className="visit__contact-value" href={`mailto:${visit_contact.email}`}>
                {visit_contact.email}
              </a>
            </div>
            <div className="visit__contact-row">
              <span className="visit__contact-label">Follow</span>
              <span style={{ display: "flex", gap: "1.25rem", marginTop: "0.25rem" }}>
                <MagneticLink href={visit_contact.instagram_url} target="_blank" rel="noreferrer" magnetic={false}>Instagram</MagneticLink>
                <MagneticLink href={visit_contact.facebook_url} target="_blank" rel="noreferrer" magnetic={false}>Facebook</MagneticLink>
              </span>
            </div>
          </div>

          <div className="visit__smallnote">{visit_contact.service_area}</div>
          <div className="visit__smallnote">{visit_contact.hours_note}</div>

          <div className="visit__map">
            <iframe
              title="Service area map — Thiruvananthapuram"
              src={visit_contact.map_embed.embed_url_template}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form className="visit__form-wrap" onSubmit={onSubmit} data-cursor="ring">
          <h3 className="visit__legend">Order a cake</h3>
          <p className="visit__form-hint">
            Tell us a little about your celebration — we'll reply by phone or WhatsApp.
          </p>

          <div className="visit__form-row">
            <label htmlFor="f-name">Your name *</label>
            <input className="visit__field" id="f-name" name="name" required autoComplete="name" disabled={status === "submitting"} />
          </div>

          <div className="visit__form-row">
            <label htmlFor="f-phone">Phone *</label>
            <input className="visit__field" id="f-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 ..." disabled={status === "submitting"} />
          </div>

          <div className="visit__form-row">
            <label htmlFor="f-cake">Cake *</label>
            <select className="visit__field" id="f-cake" name="cake_type" required defaultValue="" disabled={status === "submitting"}>
              <option value="" disabled>Choose a cake</option>
              {cakeOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="Custom">Something custom</option>
            </select>
          </div>

          <div className="visit__form-row">
            <label htmlFor="f-date">Preferred date</label>
            <input className="visit__field" id="f-date" name="preferred_date" type="date" disabled={status === "submitting"} />
          </div>

          <div className="visit__form-row">
            <label htmlFor="f-msg">Message</label>
            <textarea className="visit__field" id="f-msg" name="message" placeholder="Occasion, number of guests, flavour ideas..." disabled={status === "submitting"} />
          </div>

          <div className="visit__form-actions">
            <PillButton type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send order"}
            </PillButton>
            {status === "ok" && (
              <span className="visit__status visit__status--ok">
                Thank you — we'll be in touch soon.
              </span>
            )}
            {status === "err" && (
              <span className="visit__status visit__status--err">
                Please try again, or WhatsApp us directly.
              </span>
            )}
          </div>

          {!isSupabaseConfigured && import.meta.env.DEV && (
            <p className="visit__smallnote" style={{ marginTop: "0.5rem", color: "var(--color-ink-muted)" }}>
              Dev demo mode — submissions are simulated. Configure Supabase env vars in production.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}