import { useEffect, useState, useCallback, useMemo } from "react";
import { X, Download, ImageIcon, Check, RefreshCw, Eye } from "lucide-react";
import { site } from "../lib/content";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ImageEntry {
  id: string;
  label: string;
  section: string;
  originalUrl: string;
  newUrl: string;
  path: string;
  alt: string;
  changed: boolean;
}

type SectionName = "Hero" | "Story" | "Signature Cakes" | "Menu" | "Gallery" | "Process";

const SECTIONS: SectionName[] = [
  "Hero",
  "Story",
  "Signature Cakes",
  "Menu",
  "Gallery",
  "Process",
];

const SECTION_ICONS: Record<SectionName, string> = {
  Hero: "🏠",
  Story: "📖",
  "Signature Cakes": "🎂",
  Menu: "📋",
  Gallery: "🖼️",
  Process: "⚙️",
};

/* ------------------------------------------------------------------ */
/*  Build catalog — traverse the typed site object                    */
/* ------------------------------------------------------------------ */

function buildCatalog(): ImageEntry[] {
  const entries: ImageEntry[] = [];
  let counter = 0;

  const push = (
    section: SectionName,
    label: string,
    path: string,
    url: string,
    alt: string,
  ) => {
    entries.push({
      id: `img_${counter++}`,
      label,
      section,
      originalUrl: url,
      newUrl: url,
      path,
      alt,
      changed: false,
    });
  };

  // Hero
  push("Hero", "Hero — Primary Image", "hero.image_primary.url", site.hero.image_primary.url, site.hero.image_primary.alt);
  push("Hero", "Hero — Alt Image", "hero.image_alt.url", site.hero.image_alt.url, site.hero.image_alt.alt);

  // Story
  site.story.images.forEach((img, i) => {
    push("Story", `Story Image ${i + 1}`, `story.images[${i}].url`, img.url, img.alt);
  });

  // Signature Cakes
  site.signature_cakes.items.forEach((item, i) => {
    push("Signature Cakes", `Signature — ${item.name}`, `signature_cakes.items[${i}].image.url`, item.image.url, item.image.alt);
  });

  // Menu
  site.menu.categories.forEach((cat, ci) => {
    cat.items.forEach((item, ii) => {
      if (item.image) {
        push("Menu", `Menu — ${item.name}`, `menu.categories[${ci}].items[${ii}].image.url`, item.image.url, item.image.alt);
      }
    });
  });

  // Gallery
  site.gallery.images.forEach((img, i) => {
    push("Gallery", `Gallery Image ${i + 1}`, `gallery.images[${i}].url`, img.url, img.alt);
  });

  // Process
  site.process.images.forEach((img, i) => {
    push("Process", `Process Image ${i + 1}`, `process.images[${i}].url`, img.url, img.alt);
  });

  return entries;
}

/* ------------------------------------------------------------------ */
/*  Apply changes to site object, export JSON                         */
/* ------------------------------------------------------------------ */

function setNested(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split(".");
  let current: unknown = obj;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, key, indexStr] = arrayMatch;
      const index = parseInt(indexStr, 10);
      const arr = (current as Record<string, unknown>)[key] as unknown[];
      if (i === parts.length - 1) {
        arr[index] = value as never;
      } else {
        current = arr[index];
      }
    } else {
      if (i === parts.length - 1) {
        (current as Record<string, unknown>)[part] = value;
      } else {
        current = (current as Record<string, unknown>)[part];
      }
    }
  }
}

function extractValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
    if (arrayMatch) {
      const [, key, indexStr] = arrayMatch;
      const index = parseInt(indexStr, 10);
      current = ((current as Record<string, unknown>)[key] as unknown[])[index];
    } else {
      current = (current as Record<string, unknown>)[part];
    }
  }
  return current;
}

function exportJson(entries: ImageEntry[]): string {
  // Deep clone the site object
  const clone = JSON.parse(JSON.stringify(site)) as Record<string, unknown>;
  for (const entry of entries) {
    if (entry.changed) {
      setNested(clone, entry.path, entry.newUrl);
    }
  }
  return JSON.stringify(clone, null, 2);
}

function downloadJson(json: string): void {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "content-updated.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const catalog = useMemo(() => buildCatalog(), []);
  const [entries, setEntries] = useState<ImageEntry[]>(catalog);
  const [activeSection, setActiveSection] = useState<SectionName>("Hero");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLabel, setPreviewLabel] = useState("");

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = useMemo(
    () => entries.filter((e) => e.section === activeSection),
    [entries, activeSection],
  );

  const changeCount = useMemo(
    () => entries.filter((e) => e.changed).length,
    [entries],
  );

  const updateUrl = useCallback(
    (id: string, newUrl: string) => {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, newUrl, changed: newUrl !== e.originalUrl && isValidUrl(newUrl) }
            : e,
        ),
      );
    },
    [],
  );

  const revert = useCallback((id: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, newUrl: e.originalUrl, changed: false } : e,
      ),
    );
  }, []);

  const handleExport = useCallback(() => {
    const json = exportJson(entries);
    downloadJson(json);
  }, [entries]);

  /* ---------- Image counts per section ---------- */
  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const e of entries) {
      m[e.section] = (m[e.section] || 0) + 1;
    }
    return m;
  }, [entries]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative ml-auto w-full max-w-[1200px] h-full bg-[#0f0f11] border-l border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---- Header ---- */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div>
            <h1 className="text-white text-lg font-[500] tracking-tight m-0">
              Image Admin
            </h1>
            <p className="text-white/40 text-[0.75rem] m-0 mt-[2px] font-mono">
              {changeCount > 0
                ? `${changeCount} image${changeCount > 1 ? "s" : ""} changed`
                : "No changes"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {changeCount > 0 && (
              <button
                onClick={() => setEntries(entries.map((e) => ({ ...e, newUrl: e.originalUrl, changed: false })))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] text-white/50 hover:text-white/80 border border-white/10 hover:border-white/25 transition-all cursor-pointer bg-transparent"
              >
                <RefreshCw size={13} />
                Reset all
              </button>
            )}
            {changeCount > 0 && (
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[0.75rem] font-[500] text-black bg-indigo-400 hover:bg-indigo-300 transition-all cursor-pointer border-0"
              >
                <Download size={14} />
                Export JSON
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-0 bg-transparent"
              aria-label="Close admin panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ---- Body ---- */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <aside className="w-[200px] shrink-0 border-r border-white/10 p-3 overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {SECTIONS.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-[0.8rem] transition-all cursor-pointer border-0 ${
                    activeSection === sec
                      ? "bg-indigo-500/20 text-indigo-300 font-[500]"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{SECTION_ICONS[sec]}</span>
                    <span>{sec}</span>
                  </span>
                  <span className="text-[0.65rem] text-white/30 font-mono">
                    {counts[sec] || 0}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-6">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-full text-white/20 text-[0.85rem]">
                No images found in this section
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((entry) => (
                  <ImageCard
                    key={entry.id}
                    entry={entry}
                    onUpdate={updateUrl}
                    onRevert={revert}
                    onPreview={(url, label) => {
                      setPreviewUrl(url);
                      setPreviewLabel(label);
                    }}
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* ---- Preview modal ---- */}
        {previewUrl && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/40"
            onClick={() => setPreviewUrl(null)}
          >
            <div
              className="bg-[#1a1a1e] rounded-xl border border-white/10 p-4 max-w-[90vw] max-h-[90vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/60 text-[0.75rem] font-mono truncate max-w-[400px]">
                  {previewLabel}
                </span>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="text-white/40 hover:text-white cursor-pointer bg-transparent border-0"
                >
                  <X size={16} />
                </button>
              </div>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-[70vh] rounded-lg object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image Card                                                        */
/* ------------------------------------------------------------------ */

function ImageCard({
  entry,
  onUpdate,
  onRevert,
  onPreview,
}: {
  entry: ImageEntry;
  onUpdate: (id: string, url: string) => void;
  onRevert: (id: string) => void;
  onPreview: (url: string, label: string) => void;
}) {
  const [inputVal, setInputVal] = useState(entry.newUrl);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setInputVal(entry.newUrl);
    setImgError(false);
  }, [entry.newUrl]);

  const hasValidUrl = isValidUrl(inputVal);

  return (
    <div
      className={`relative rounded-xl border overflow-hidden transition-all duration-200 ${
        entry.changed
          ? "border-indigo-500/50 ring-1 ring-indigo-500/20 bg-indigo-500/5"
          : "border-white/10 bg-white/5"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[3/2] bg-black/40 overflow-hidden">
        {!imgError ? (
          <img
            src={inputVal || entry.originalUrl}
            alt={entry.alt}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white/20">
            <ImageIcon size={32} />
          </div>
        )}
        {entry.changed && (
          <span className="absolute top-2 right-2 bg-indigo-500 text-white text-[0.55rem] px-2 py-0.5 rounded-full font-mono font-[500] uppercase">
            Changed
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-white/70 text-[0.7rem] font-mono truncate mb-1">
          {entry.section}
        </div>
        <div className="text-white text-[0.8rem] font-[500] truncate mb-2">
          {entry.label}
        </div>

        {/* URL input */}
        <div className="flex gap-1.5">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setImgError(false);
              if (isValidUrl(e.target.value)) {
                onUpdate(entry.id, e.target.value);
              }
            }}
            placeholder="Paste new Pexels URL..."
            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg text-[0.72rem] font-mono text-white/80 bg-white/5 border border-white/10 focus:border-indigo-400/50 focus:outline-none placeholder:text-white/20 transition-colors"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 mt-2">
          {hasValidUrl && (
            <button
              onClick={() => onPreview(inputVal, entry.label)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[0.65rem] text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-0 bg-transparent"
            >
              <Eye size={12} />
              Preview
            </button>
          )}
          {entry.changed && (
            <button
              onClick={() => {
                onRevert(entry.id);
                setInputVal(entry.originalUrl);
                setImgError(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[0.65rem] text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-0 bg-transparent"
            >
              <RefreshCw size={12} />
              Revert
            </button>
          )}
          {!entry.changed && !imgError && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[0.65rem] text-emerald-400/60">
              <Check size={12} />
              Current
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
