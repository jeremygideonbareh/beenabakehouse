import { site } from "../lib/content";
import { scrollToId } from "../lib/SmoothScroll";

export function Footer() {
  const { footer } = site;
  const words = footer.marquee_words;
  void site.brand;
  const marquee = [...words, ...words, ...words];

  return (
    <footer className="mt-[clamp(4rem,8vw,8rem)] relative overflow-hidden border-t border-hairline" aria-label="Site footer">
      <div className="flex gap-0 whitespace-nowrap overflow-hidden border-b border-hairline bg-background" aria-hidden="true">
        <div className="inline-flex flex-shrink-0 animate-marquee font-display italic text-[clamp(2rem,6vw,4.5rem)] leading-[1] py-6 text-ink">
          {marquee.map((w, i) => (
            <span key={i} className="inline-flex items-center">
              {w}<span className="w-[0.4em] h-[0.4em] rounded-full bg-accent-butter inline-block mx-[0.5em] -translate-y-[0.1em]" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto p-[clamp(2.5rem,6vw,4rem)_clamp(1.25rem,5vw,6rem)] grid grid-cols-[1.4fr_repeat(4,1fr)] gap-8 max-md:grid-cols-2">
        <div className="max-md:col-span-2">
          <p className="font-display text-[1.6rem] leading-[1.2] text-ink m-0 mb-4">Beena's Bake House</p>
          <p className="text-ink-muted m-0 max-w-[32ch] text-[0.85rem]">
            Homemade butter cakes, made to order in Trivandrum since 2000. Delivered to your door.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted m-0 mb-[1.2rem]">Order</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[0.6rem]">
            <li><a href="#visit" className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]" onClick={(e) => { e.preventDefault(); scrollToId("visit"); }}>Order a cake</a></li>
            <li><a href={site.brand.contact.whatsapp_deep_link} className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href={`tel:${site.brand.contact.phone_primary.replace(/\s/g, "")}`} className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]">Call us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted m-0 mb-[1.2rem]">About</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[0.6rem]">
            <li><a href="#story" className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]" onClick={(e) => { e.preventDefault(); scrollToId("story"); }}>Our 25 years</a></li>
            <li><a href="#signature" className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]" onClick={(e) => { e.preventDefault(); scrollToId("signature"); }}>Signature cakes</a></li>
            <li><a href="#gallery" className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]" onClick={(e) => { e.preventDefault(); scrollToId("gallery"); }}>Gallery</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted m-0 mb-[1.2rem]">Visit</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[0.6rem]">
            <li><span className="text-ink-muted">Trivandrum only</span></li>
            <li><span className="text-ink-muted">By phone/WhatsApp</span></li>
            <li><span className="text-ink-muted">Home delivery</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-ink-muted m-0 mb-[1.2rem]">Follow</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[0.6rem]">
            <li><a href={site.brand.social.instagram_url} className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={site.brand.social.facebook_url} className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href={`mailto:${site.brand.contact.email}`} className="text-ink no-underline text-[1rem] min-h-[44px] inline-flex items-center hover:underline underline-offset-[3px]">Email</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline p-6 max-w-[1280px] mx-auto flex justify-between items-center flex-wrap gap-4 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink-muted">
        <span>{footer.legal}</span>
        <span>Trivandrum · Kerala · India</span>
      </div>
    </footer>
  );
}
