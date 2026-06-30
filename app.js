const presetFonts = [
  { name: "Noto Serif Tibetan", source: "Google Fonts 在线", online: true },
  { name: "Jomolhari", source: "Google Fonts 在线", online: true },
  { name: "Microsoft Himalaya", source: "Windows 系统" },
  { name: "Kailasa", source: "macOS 系统" },
  { name: "Kokonor", source: "macOS 系统" },
  { name: "Noto Sans Tibetan", source: "Noto/本地" },
  { name: "DDC Uchen", source: "代表性预设" },
  { name: "DDC Rinzin", source: "代表性预设" },
  { name: "Tibetan Machine Uni", source: "代表性预设" },
  { name: "BabelStone Tibetan", source: "代表性预设" },
  { name: "Monlam Uni OuChan1", source: "Monlam 预设" },
  { name: "Monlam Uni Chouk", source: "Monlam 预设" },
  { name: "Monlam Uni Dutsa1", source: "Monlam 预设" },
  { name: "Monlam Uni PayTsik", source: "Monlam 预设" },
  { name: "Qomolangma-Uchen Sarchung", source: "Qomolangma 预设" },
  { name: "Qomolangma-Tsumachu", source: "Qomolangma 预设" },
  { name: "Qomolangma-Title", source: "Qomolangma 预设" },
  { name: "Qomolangma-Woodblock", source: "Qomolangma 预设" },
  { name: "TCRC Youtso Unicode", source: "TCRC 预设" },
  { name: "TCRC Youtso", source: "TCRC 预设" }
];

const els = {
  textInput: document.querySelector("#textInput"),
  fontSelect: document.querySelector("#fontSelect"),
  fontSize: document.querySelector("#fontSize"),
  lineHeight: document.querySelector("#lineHeight"),
  padding: document.querySelector("#padding"),
  textColor: document.querySelector("#textColor"),
  backgroundColor: document.querySelector("#backgroundColor"),
  transparentBackground: document.querySelector("#transparentBackground"),
  fontUpload: document.querySelector("#fontUpload"),
  mainCanvas: document.querySelector("#mainCanvas"),
  gallery: document.querySelector("#fontGallery"),
  currentFontName: document.querySelector("#currentFontName"),
  fontStatus: document.querySelector("#fontStatus"),
  downloadSelected: document.querySelector("#downloadSelected"),
  downloadAll: document.querySelector("#downloadAll"),
  refresh: document.querySelector("#refresh")
};

let fonts = [...presetFonts];
let currentWeight = "400";

function cssFontName(name) {
  return `"${name.replace(/"/g, '\\"')}"`;
}

function getSettings() {
  return {
    text: els.textInput.value.trim() || "བོད་ཡིག",
    fontSize: Number(els.fontSize.value) || 72,
    lineHeight: Number(els.lineHeight.value) || 1.35,
    padding: Number(els.padding.value) || 48,
    textColor: els.textColor.value,
    backgroundColor: els.backgroundColor.value,
    transparentBackground: els.transparentBackground.checked,
    weight: currentWeight
  };
}

async function isFontAvailable(fontName) {
  const fontMeta = fonts.find((font) => font.name === fontName);
  if (fontMeta?.imported || fontMeta?.online) return true;
  if (fontName === "Microsoft Himalaya") return true;
  await document.fonts.ready;

  const probe = document.createElement("canvas").getContext("2d");
  const sample = "བོད་ཡིག་གཟུགས་བརྙན";
  const fallbacks = ["serif", "sans-serif", "monospace"];
  const fallbackWidths = fallbacks.map((fallback) => {
    probe.font = `48px ${fallback}`;
    return probe.measureText(sample).width;
  });

  return fallbacks.some((fallback, index) => {
    probe.font = `48px ${cssFontName(fontName)}, ${fallback}`;
    return Math.abs(probe.measureText(sample).width - fallbackWidths[index]) > 0.5;
  });
}

function wrapText(ctx, text, maxWidth) {
  const paragraphs = text.split(/\n/);
  const lines = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/(\s+)/).filter(Boolean);
    let line = "";

    if (words.length === 1 && ctx.measureText(paragraph).width > maxWidth) {
      for (const char of [...paragraph]) {
        const next = line + char;
        if (line && ctx.measureText(next).width > maxWidth) {
          lines.push(line);
          line = char;
        } else {
          line = next;
        }
      }
      if (line) lines.push(line);
      continue;
    }

    for (const word of words) {
      const next = line + word;
      if (line && ctx.measureText(next).width > maxWidth) {
        lines.push(line.trimEnd());
        line = word.trimStart();
      } else {
        line = next;
      }
    }
    lines.push(line || " ");
  }

  return lines;
}

function renderCanvas(canvas, fontName, options = {}) {
  const settings = getSettings();
  const scale = options.scale || window.devicePixelRatio || 1;
  const width = options.width || 1180;
  const maxTextWidth = width - settings.padding * 2;
  const ctx = canvas.getContext("2d");

  ctx.font = `${settings.weight} ${settings.fontSize}px ${cssFontName(fontName)}, "Microsoft Himalaya", serif`;
  const lines = wrapText(ctx, settings.text, maxTextWidth);
  const linePx = settings.fontSize * settings.lineHeight;
  const height = Math.max(180, settings.padding * 2 + lines.length * linePx);

  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  canvas.style.aspectRatio = `${width} / ${height}`;

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, width, height);
  if (!settings.transparentBackground) {
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.fillStyle = settings.textColor;
  ctx.textBaseline = "alphabetic";
  ctx.direction = "ltr";
  ctx.font = `${settings.weight} ${settings.fontSize}px ${cssFontName(fontName)}, "Microsoft Himalaya", serif`;

  lines.forEach((line, index) => {
    const y = settings.padding + settings.fontSize + index * linePx;
    ctx.fillText(line, settings.padding, y);
  });
}

function makeSafeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "_");
}

function downloadCanvas(canvas, fontName) {
  const link = document.createElement("a");
  link.download = `${makeSafeFileName(fontName)}_藏文字体.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function updateMain() {
  const fontName = els.fontSelect.value;
  els.currentFontName.textContent = fontName;
  renderCanvas(els.mainCanvas, fontName);
  const available = await isFontAvailable(fontName);
  els.fontStatus.textContent = available ? "预览已生成，当前字体可用" : "预览已生成；如字形没变化，请安装或导入该字体";
  els.mainCanvas.classList.toggle("transparent-preview", getSettings().transparentBackground);
}

async function buildGallery() {
  els.gallery.innerHTML = "";

  for (const font of fonts) {
    const card = document.createElement("article");
    card.className = "font-card";

    const header = document.createElement("header");
    const title = document.createElement("strong");
    const status = document.createElement("small");
    title.textContent = font.name;
    status.textContent = font.imported ? "已导入" : "检测中";
    header.append(title, status);

    const canvas = document.createElement("canvas");
    renderCanvas(canvas, font.name, { width: 760, scale: 1.5 });
    canvas.classList.toggle("transparent-preview", getSettings().transparentBackground);

    const footer = document.createElement("footer");
    const choose = document.createElement("button");
    const save = document.createElement("button");
    choose.type = "button";
    save.type = "button";
    choose.textContent = "使用这个字体";
    save.textContent = "↓";
    save.title = "下载 PNG";
    save.className = "icon-button secondary";
    footer.append(choose, save);

    choose.addEventListener("click", () => {
      els.fontSelect.value = font.name;
      updateMain();
    });
    save.addEventListener("click", () => downloadCanvas(canvas, font.name));

    card.append(header, canvas, footer);
    els.gallery.append(card);

    if (!font.imported) {
      const available = await isFontAvailable(font.name);
      status.textContent = available ? font.source : "需安装/导入";
    }
  }
}

function fillFontSelect() {
  els.fontSelect.innerHTML = "";
  for (const font of fonts) {
    const option = document.createElement("option");
    option.value = font.name;
    option.textContent = font.name;
    els.fontSelect.append(option);
  }
}

async function addUploadedFonts(files) {
  for (const file of files) {
    const family = file.name.replace(/\.(ttf|otf|woff2?|TTF|OTF|WOFF2?)$/, "");
    const url = URL.createObjectURL(file);
    const face = new FontFace(family, `url(${url})`);
    await face.load();
    document.fonts.add(face);
    fonts = fonts.filter((font) => font.name !== family);
    fonts.unshift({ name: family, source: "本地导入", imported: true });
  }
  fillFontSelect();
  els.fontSelect.value = fonts[0].name;
  updateMain();
  buildGallery();
}

function bindEvents() {
  const rerender = () => {
    updateMain();
    buildGallery();
  };

  ["input", "change"].forEach((eventName) => {
    els.textInput.addEventListener(eventName, rerender);
    els.fontSize.addEventListener(eventName, rerender);
    els.lineHeight.addEventListener(eventName, rerender);
    els.padding.addEventListener(eventName, rerender);
    els.textColor.addEventListener(eventName, rerender);
    els.backgroundColor.addEventListener(eventName, rerender);
    els.transparentBackground.addEventListener(eventName, rerender);
  });

  els.fontSelect.addEventListener("change", updateMain);
  els.refresh.addEventListener("click", rerender);

  document.querySelectorAll(".weight").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".weight").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      currentWeight = button.dataset.weight;
      rerender();
    });
  });

  els.fontUpload.addEventListener("change", (event) => {
    addUploadedFonts([...event.target.files]).catch((error) => {
      alert(`字体导入失败：${error.message}`);
    });
  });

  els.downloadSelected.addEventListener("click", () => {
    renderCanvas(els.mainCanvas, els.fontSelect.value, { scale: 2 });
    downloadCanvas(els.mainCanvas, els.fontSelect.value);
    updateMain();
  });

  els.downloadAll.addEventListener("click", () => {
    for (const font of fonts) {
      const canvas = document.createElement("canvas");
      renderCanvas(canvas, font.name, { scale: 2 });
      downloadCanvas(canvas, font.name);
    }
  });
}

fillFontSelect();
bindEvents();
updateMain();
buildGallery();
