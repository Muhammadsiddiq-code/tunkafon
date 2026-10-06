import { useEffect, useMemo, useState } from "react";
import { tunkaItems } from "./data/tunka";
import {
  THEMES,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  CART_STORAGE_KEY,
} from "./theme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ThemeSwitcher from "./components/ThemeSwitcher";
import TunkaCard from "./components/TunkaCard";
import { SearchIcon, LayeredIcon } from "./components/icons";

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, DEFAULT_THEME);
  const [lastViewed] = useLocalStorage(CART_STORAGE_KEY, null);
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const types = useMemo(
    () => ["all", ...new Set(tunkaItems.map((item) => item.type))],
    []
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tunkaItems.filter((item) => {
      const byType = type === "all" || item.type === type;
      const byQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return byType && byQuery;
    });
  }, [type, query]);

  return (
    <div className="app">
      <header className="site-header">
        <div className="brand-mark">
          <span className="brand-dot">
            <LayeredIcon className="brand-dot__icon" />
          </span>
          <div>
            <strong>Tunikabond Ustalari</strong>
            <small>Metall shift va fasad qoplamalari</small>
          </div>
        </div>
        <ThemeSwitcher themes={THEMES} value={theme} onChange={setTheme} />
      </header>

      <section className="hero">
        <h1>Tunikabond va metall qoplama xizmatlari</h1>
        <p>
          Shift, fasad, tom va devor qoplamalari uchun mahsulot turlari. Narxni
          ko'ring va bir tugma bilan ustaga qo'ng'iroq qiling.
        </p>
        {lastViewed && (
          <p className="hero-recent">
            Oxirgi ko'rganingiz: <strong>{lastViewed}</strong>
          </p>
        )}
      </section>

      <section className="toolbar">
        <div className="search-wrap">
          <SearchIcon className="search-icon" />
          <input
            type="search"
            className="search"
            placeholder="Mahsulot yoki xizmat qidirish..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {/* <div className="filters">
          {types.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-btn${type === item ? " is-active" : ""}`}
              onClick={() => setType(item)}
            >
              {item === "all" ? "Barchasi" : item}
            </button>
          ))}
        </div> */}
      </section>

      <main className="grid">
        {visible.map((item) => (
          <TunkaCard key={item.id} item={item} />
        ))}
        {visible.length === 0 && (
          <p className="empty">
            Hech narsa topilmadi. Boshqa so'z bilan urinib ko'ring.
          </p>
        )}
      </main>

      <footer className="site-footer">
        <p>
          © {CURRENT_YEAR} Tunikabond Ustalari. Narxlar taxminiy va m² hisobida.
        </p>
      </footer>
    </div>
  );
}
