import { PhoneIcon, TelegramIcon } from "./icons";
import { TELEGRAM_URL } from "../config";

export default function TunkaCard({ item }) {
  const telHref = `tel:${item.phone.replace(/[^\d+]/g, "")}`;
  const orderMessage = encodeURIComponent(
    `Assalomu alaykum! "${item.name}" (${item.type}) uchun zakaz bermoqchiman. Narxi: ${item.price}.`
  );
  const orderHref = `${TELEGRAM_URL}?text=${orderMessage}`;

  return (
    <article className="tunka-card">
      <div className="tunka-media">
        <img
          className="tunka-media__photo"
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
        <span className="tunka-media__badge">{item.type}</span>
      </div>

      <div className="tunka-body">
        <h3 className="tunka-name">{item.name}</h3>
        <p className="tunka-desc">{item.description}</p>

        <span className="tunka-price">{item.price}</span>

        <div className="tunka-actions">
          <a
            className="tunka-call"
            href={telHref}
            aria-label={`${item.name} uchun qo'ng'iroq qilish`}
          >
            <PhoneIcon className="tunka-call__icon" />
            Telefon qilish
          </a>
          <a
            className="tunka-order"
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.name} uchun Telegram orqali zakaz berish`}
          >
            <TelegramIcon className="tunka-order__icon" />
            Zakaz berish
          </a>
        </div>

        <span className="tunka-number">{item.phone}</span>
      </div>
    </article>
  );
}
