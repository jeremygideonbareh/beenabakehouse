import { site } from "../lib/content";
import { scrollToId } from "../lib/SmoothScroll";
import "./Footer.css";

export function Footer() {
  const { footer } = site;
  const words = footer.marquee_words;
  void site.brand;
  const marquee = [...words, ...words, ...words];

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__marquee" aria-hidden="true">
        <div className="footer__marquee-track">
          {marquee.map((w, i) => (
            <span key={i}>
              {w}<span className="dot" />
            </span>
          ))}
        </div>
      </div>

      <div className="footer__cols">
        <div className="footer__brand-block">
          <p className="footer__brand">Beena's Bake House</p>
          <p className="muted" style={{ margin: 0, maxWidth: "32ch", fontSize: "0.85rem" }}>
            Homemade butter cakes, made to order in Trivandrum since 2000. Delivered to your door.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Order</h4>
          <ul>
            <li><a href="#visit" onClick={(e) => { e.preventDefault(); scrollToId("visit"); }}>Order a cake</a></li>
            <li><a href={site.brand.contact.whatsapp_deep_link} target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a href={`tel:${site.brand.contact.phone_primary.replace(/\s/g, "")}`}>Call us</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">About</h4>
          <ul>
            <li><a href="#story" onClick={(e) => { e.preventDefault(); scrollToId("story"); }}>Our 25 years</a></li>
            <li><a href="#signature" onClick={(e) => { e.preventDefault(); scrollToId("signature"); }}>Signature cakes</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToId("gallery"); }}>Gallery</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Visit</h4>
          <ul>
            <li><span className="muted">Trivandrum only</span></li>
            <li><span className="muted">By phone/WhatsApp</span></li>
            <li><span className="muted">Home delivery</span></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Follow</h4>
          <ul>
            <li><a href={site.brand.social.instagram_url} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={site.brand.social.facebook_url} target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href={`mailto:${site.brand.contact.email}`}>Email</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__base">
        <span>{footer.legal}</span>
        <span>Trivandrum · Kerala · India</span>
      </div>
    </footer>
  );
}