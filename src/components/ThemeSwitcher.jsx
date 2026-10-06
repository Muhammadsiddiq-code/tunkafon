import { SunIcon, MoonIcon, FlameIcon, PaletteIcon } from "./icons";

const THEME_META = {
  light: { Icon: SunIcon, title: "Yorug' mavzu" },
  dark: { Icon: MoonIcon, title: "Qorong'i mavzu" },
  warm: { Icon: FlameIcon, title: "Iliq mavzu" },
};

export default function ThemeSwitcher({ themes, value, onChange }) {
  return (
    <div className="theme-switcher" role="group" aria-label="Rang mavzusi">
      {themes.map((theme) => {
        const active = theme.id === value;
        const meta = THEME_META[theme.id];
        const Icon = meta ? meta.Icon : PaletteIcon;
        return (
          <button
            key={theme.id}
            type="button"
            className={`theme-btn${active ? " is-active" : ""}`}
            aria-pressed={active}
            title={meta ? meta.title : theme.label}
            onClick={() => onChange(theme.id)}
          >
            <Icon className="theme-icon" />
            <span className="theme-label">{theme.label}</span>
          </button>
        );
      })}
    </div>
  );
}
