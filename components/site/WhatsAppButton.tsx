import { MessageCircle } from "lucide-react";

const whatsappUrl = "https://wa.me/254112272061?text=Hello!%20I%20would%20like%20to%20enquire%20about%20a%20construction%20project%20with%20Nehemiah%20Build.";

export function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Enquire about a project or tender on WhatsApp">
      <span className="whatsapp-tooltip">Enquire about a project or tender</span>
      <MessageCircle aria-hidden="true" />
    </a>
  );
}
