import { PhoneIcon } from "./icons";

export default function TunkaCard({ item }) {
  const telHref = `tel:${item.phone.replace(/[^\d+]/g, "")}`;

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

        <div className="tunka-meta">
          <span className="tunka-price">{item.price}</span>
          <a
            className="tunka-call"
            href={telHref}
            aria-label={`${item.name} uchun qo'ng'iroq qilish`}
          >
            <PhoneIcon className="tunka-call__icon" />
            Telefon qilish
          </a>
        </div>
        <span className="tunka-number">{item.phone}</span>
      </div>
    </article>
  );
}
