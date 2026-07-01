const bundledFontFiles = [
  "amdo_classic_3.ttf",
  "ctrc-betsu.ttf",
  "ctrc-bt.ttf",
  "ctrc-drutsa.ttf",
  "ctrc-ht.ttf",
  "ctrc-tsumachu.ttf",
  "ctrc-uchen.ttf",
  "ddc_rinzin.ttf",
  "ddc_uchen.ttf",
  "himalaya.ttf",
  "jomolhari-alpha3c-0605331.ttf",
  "jomolhari-id-a3d.ttf",
  "monlam_sans_serifbold.ttf",
  "monlam_uni_chouk.ttf",
  "monlam_uni_choukmatik.ttf",
  "monlam_uni_dutsa1.ttf",
  "monlam_uni_dutsa2.ttf",
  "monlam_uni_ochan1.ttf",
  "monlam_uni_ouchan2.ttf",
  "monlam_uni_ouchan3.ttf",
  "monlam_uni_ouchan4.ttf",
  "monlam_uni_ouchan5.ttf",
  "monlam_uni_paytsik.ttf",
  "monlam_uni_tikrang.ttf",
  "monlam_uni_tiktong.ttf",
  "perfect_unicode.ttf",
  "Qomolangma-Art.ttf",
  "Qomolangma-Betsu.ttf",
  "Qomolangma-Chuyig.ttf",
  "Qomolangma-Drutsa.ttf",
  "Qomolangma-Dunhuang.ttf",
  "Qomolangma-Edict.ttf",
  "Qomolangma-Horyig.ttf",
  "Qomolangma-Subtitle.ttf",
  "Qomolangma-Title.ttf",
  "Qomolangma-Tsumachu.ttf",
  "Qomolangma-Tsuring.ttf",
  "Qomolangma-Tsutong.ttf",
  "Qomolangma-UchenSarchen.ttf",
  "Qomolangma-UchenSarchung.ttf",
  "Qomolangma-UchenSuring.ttf",
  "Qomolangma-UchenSutung.ttf",
  "Qomolangma-Woodblock.ttf",
  "tashi.ttf",
  "the_script_of_zhangzhung_smar.ttf",
  "tib-usunicode.ttf",
  "tibetanmachineunialpha.ttf",
  "tibetanmachineweb.ttf",
  "tibetansambhotayigchung.ttf",
  "tibetantsugring.otf",
  "tibetanyigchung098.otf",
  "tsuig_03.ttf",
  "uchen.ttf",
  "wangdi.ttf",
  "wangdi_29.ttf",
  "嘟栢郊嘟戉紜嘟∴讲嘟傕紜嘟傕綗嘟脆絺.ttf"
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function prettyFontName(fileName) {
  const baseName = fileName.replace(/\.(ttf|otf|woff2?)$/i, "");
  return baseName
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bCtrc\b/g, "CTRC")
    .replace(/\bDdc\b/g, "DDC");
}

function fontUrl(fileName) {
  return `./${encodeURIComponent("字体")}/${encodeURIComponent(fileName)}`;
}

const bundledStyles = bundledFontFiles.map((fileName, index) => {
  const label = prettyFontName(fileName);
  const weight = /bold/i.test(fileName) ? 700 : 400;
  return {
    id: `bundled-${index}-${slugify(fileName) || index}`,
    label,
    family: `Bundled Tibetan ${index}`,
    weight,
    source: "站点内置字体",
    effect: "plain",
    url: fontUrl(fileName)
  };
});

const onlineStyles = [
  { id: "noto-thin", label: "Noto Serif Tibetan Thin", family: "Noto Serif Tibetan", weight: 100, source: "在线字体", effect: "plain" },
  { id: "noto-light", label: "Noto Serif Tibetan Light", family: "Noto Serif Tibetan", weight: 300, source: "在线字体", effect: "plain" },
  { id: "noto-regular", label: "Noto Serif Tibetan Regular", family: "Noto Serif Tibetan", weight: 400, source: "在线字体", effect: "plain" },
  { id: "noto-semibold", label: "Noto Serif Tibetan Semibold", family: "Noto Serif Tibetan", weight: 600, source: "在线字体", effect: "plain" },
  { id: "noto-bold", label: "Noto Serif Tibetan Bold", family: "Noto Serif Tibetan", weight: 700, source: "在线字体", effect: "plain" },
  { id: "noto-black", label: "Noto Serif Tibetan Black", family: "Noto Serif Tibetan", weight: 900, source: "在线字体", effect: "plain" },
  { id: "jomolhari-regular", label: "Jomolhari Regular", family: "Jomolhari", weight: 400, source: "在线字体", effect: "plain" },
  { id: "jomolhari-ink", label: "Jomolhari Ink", family: "Jomolhari", weight: 400, source: "在线字体样式", effect: "ink" },
  { id: "noto-outline", label: "Noto Serif Outline", family: "Noto Serif Tibetan", weight: 700, source: "在线字体样式", effect: "outline" },
  { id: "noto-gold", label: "Noto Serif Gold", family: "Noto Serif Tibetan", weight: 800, source: "在线字体样式", effect: "gold" },
  { id: "noto-shadow", label: "Noto Serif Shadow", family: "Noto Serif Tibetan", weight: 700, source: "在线字体样式", effect: "shadow" },
  { id: "noto-red-seal", label: "Noto Serif Red Seal", family: "Noto Serif Tibetan", weight: 900, source: "在线字体样式", effect: "seal" },
  { id: "noto-ice", label: "Noto Serif Ice Blue", family: "Noto Serif Tibetan", weight: 500, source: "在线字体样式", effect: "ice" },
  { id: "noto-night", label: "Noto Serif Night", family: "Noto Serif Tibetan", weight: 600, source: "在线字体样式", effect: "night" }
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

let styles = [...bundledStyles, ...onlineStyles];
let selectedStyleId = styles[0].id;
let fontReady = document.fonts ? document.fonts.ready : Promise.resolve();

function cssFontName(name) {
  return `"${name.replace(/"/g, '\\"')}"`;
}

function getSelectedStyle() {
  return styles.find((style) => style.id === selectedStyleId) || styles[0];
}

function getSettings() {
  return {
    text: els.textInput.value.trim() || "བོད་ཡིག",
    fontSize: Number(els.fontSize.value) || 72,
    lineHeight: Number(els.lineHeight.value) || 1.35,
    padding: Number(els.padding.value) || 48,
    textColor: els.textColor.value,
    backgroundColor: els.backgroundColor.value,
    transparentBackground: els.transparentBackground.checked
  };
}

async function waitForStyleFont(style) {
  if (style.url && !style.loadPromise) {
    const face = new FontFace(style.family, `url("${style.url}")`, {
      display: "swap",
      weight: String(style.weight)
    });
    style.loadPromise = face.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
      return loadedFace;
    });
  }

  if (style.loadPromise) {
    await style.loadPromise;
    return;
  }

  await fontReady;
  if (document.fonts?.load) {
    await document.fonts.load(`${style.weight} 48px ${cssFontName(style.family)}`, "བོད");
  }
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

function applyEffect(ctx, style, settings, width, height) {
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.miterLimit = 2;

  if (style.effect === "gold") {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#8f5d12");
    gradient.addColorStop(0.45, "#e0b75a");
    gradient.addColorStop(1, "#6f470e");
    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(80, 47, 8, 0.2)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    return;
  }

  if (style.effect === "seal") {
    ctx.fillStyle = "#9f1d1d";
    ctx.strokeStyle = "#5d0d0d";
    ctx.lineWidth = Math.max(2, settings.fontSize * 0.035);
    return;
  }

  if (style.effect === "ice") {
    ctx.fillStyle = "#1f6f8b";
    ctx.strokeStyle = "#d7f2f6";
    ctx.lineWidth = Math.max(2, settings.fontSize * 0.04);
    ctx.shadowColor = "rgba(31, 111, 139, 0.25)";
    ctx.shadowBlur = 10;
    return;
  }

  if (style.effect === "night") {
    ctx.fillStyle = "#e8edf2";
    ctx.strokeStyle = "#15202b";
    ctx.lineWidth = Math.max(3, settings.fontSize * 0.055);
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    return;
  }

  if (style.effect === "ink") {
    ctx.fillStyle = settings.textColor;
    ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    return;
  }

  if (style.effect === "outline") {
    ctx.fillStyle = settings.textColor;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(3, settings.fontSize * 0.07);
    ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;
    return;
  }

  if (style.effect === "shadow") {
    ctx.fillStyle = settings.textColor;
    ctx.shadowColor = "rgba(0, 0, 0, 0.28)";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = Math.max(2, settings.fontSize * 0.045);
    ctx.shadowOffsetY = Math.max(2, settings.fontSize * 0.045);
    return;
  }

  ctx.fillStyle = settings.textColor;
}

function paintText(ctx, line, x, y, style) {
  if (["outline", "seal", "ice", "night"].includes(style.effect)) {
    ctx.strokeText(line, x, y);
  }
  ctx.fillText(line, x, y);
}

function renderCanvas(canvas, style, options = {}) {
  const settings = getSettings();
  const scale = options.scale || window.devicePixelRatio || 1;
  const width = options.width || 1180;
  const maxTextWidth = width - settings.padding * 2;
  const ctx = canvas.getContext("2d");
  const fontStack = `${style.weight} ${settings.fontSize}px ${cssFontName(style.family)}, "Noto Serif Tibetan", serif`;

  ctx.font = fontStack;
  const lines = wrapText(ctx, settings.text, maxTextWidth);
  const linePx = settings.fontSize * settings.lineHeight;
  const height = Math.max(180, settings.padding * 2 + lines.length * linePx);

  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  canvas.style.aspectRatio = `${width} / ${height}`;

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, width, height);

  if (!settings.transparentBackground) {
    ctx.fillStyle = style.effect === "night" ? "#17202a" : settings.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.textBaseline = "alphabetic";
  ctx.direction = "ltr";
  ctx.font = fontStack;
  applyEffect(ctx, style, settings, width, height);

  lines.forEach((line, index) => {
    const y = settings.padding + settings.fontSize + index * linePx;
    paintText(ctx, line, settings.padding, y, style);
  });
}

function makeSafeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "_");
}

function downloadCanvas(canvas, style) {
  const link = document.createElement("a");
  link.download = `${makeSafeFileName(style.label)}_藏文字体.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function updateMain() {
  const style = getSelectedStyle();
  els.currentFontName.textContent = style.label;
  els.fontStatus.textContent = "正在加载网页字体";
  await waitForStyleFont(style);
  renderCanvas(els.mainCanvas, style);
  els.mainCanvas.classList.toggle("transparent-preview", getSettings().transparentBackground);
  els.fontStatus.textContent = `${style.source}已加载，可导出 PNG`;
}

function buildGallery() {
  els.gallery.innerHTML = "";

  for (const style of styles) {
    const card = document.createElement("article");
    card.className = "font-card";

    const header = document.createElement("header");
    const title = document.createElement("strong");
    const status = document.createElement("small");
    title.textContent = style.label;
    status.textContent = "加载中";
    header.append(title, status);

    const canvas = document.createElement("canvas");
    renderCanvas(canvas, style, { width: 760, scale: 1.5 });
    canvas.classList.toggle("transparent-preview", getSettings().transparentBackground);

    const footer = document.createElement("footer");
    const choose = document.createElement("button");
    const save = document.createElement("button");
    choose.type = "button";
    save.type = "button";
    choose.textContent = "使用这个样式";
    save.textContent = "↓";
    save.title = "下载 PNG";
    save.className = "icon-button secondary";
    footer.append(choose, save);

    choose.addEventListener("click", () => {
      selectedStyleId = style.id;
      els.fontSelect.value = style.id;
      updateMain();
    });
    save.addEventListener("click", async () => {
      await waitForStyleFont(style);
      renderCanvas(canvas, style, { width: 760, scale: 2 });
      downloadCanvas(canvas, style);
      renderCanvas(canvas, style, { width: 760, scale: 1.5 });
    });

    card.append(header, canvas, footer);
    els.gallery.append(card);

    waitForStyleFont(style)
      .then(() => {
        renderCanvas(canvas, style, { width: 760, scale: 1.5 });
        canvas.classList.toggle("transparent-preview", getSettings().transparentBackground);
        status.textContent = style.source;
      })
      .catch(() => {
        status.textContent = "加载失败";
      });
  }
}

function fillFontSelect() {
  els.fontSelect.innerHTML = "";
  for (const style of styles) {
    const option = document.createElement("option");
    option.value = style.id;
    option.textContent = style.label;
    els.fontSelect.append(option);
  }
  els.fontSelect.value = selectedStyleId;
}

async function addUploadedFonts(files) {
  for (const file of files) {
    const family = file.name.replace(/\.(ttf|otf|woff2?|TTF|OTF|WOFF2?)$/, "");
    const url = URL.createObjectURL(file);
    const face = new FontFace(family, `url(${url})`);
    await face.load();
    document.fonts.add(face);
    const id = `upload-${family.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    styles = styles.filter((style) => style.id !== id);
    styles.unshift({ id, label: family, family, weight: 400, source: "本地导入", effect: "plain" });
    selectedStyleId = id;
  }
  fillFontSelect();
  await updateMain();
  buildGallery();
}

function scheduleRender() {
  updateMain();
  buildGallery();
}

function bindEvents() {
  ["input", "change"].forEach((eventName) => {
    els.textInput.addEventListener(eventName, scheduleRender);
    els.fontSize.addEventListener(eventName, scheduleRender);
    els.lineHeight.addEventListener(eventName, scheduleRender);
    els.padding.addEventListener(eventName, scheduleRender);
    els.textColor.addEventListener(eventName, scheduleRender);
    els.backgroundColor.addEventListener(eventName, scheduleRender);
    els.transparentBackground.addEventListener(eventName, scheduleRender);
  });

  els.fontSelect.addEventListener("change", () => {
    selectedStyleId = els.fontSelect.value;
    updateMain();
  });

  els.refresh.addEventListener("click", scheduleRender);

  els.fontUpload.addEventListener("change", (event) => {
    addUploadedFonts([...event.target.files]).catch((error) => {
      alert(`字体导入失败：${error.message}`);
    });
  });

  els.downloadSelected.addEventListener("click", async () => {
    const style = getSelectedStyle();
    await waitForStyleFont(style);
    renderCanvas(els.mainCanvas, style, { scale: 2 });
    downloadCanvas(els.mainCanvas, style);
    renderCanvas(els.mainCanvas, style);
  });

  els.downloadAll.addEventListener("click", async () => {
    for (const style of styles) {
      await waitForStyleFont(style);
      const canvas = document.createElement("canvas");
      renderCanvas(canvas, style, { scale: 2 });
      downloadCanvas(canvas, style);
    }
  });
}

fillFontSelect();
bindEvents();
updateMain();
buildGallery();
