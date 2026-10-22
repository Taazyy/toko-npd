/* Logika toko: katalog, filter, keranjang, dan ringkasan pesanan.
   Data produk dan pembayaran ada di data.js. */
(function () {
  var PRODUCTS = NPD.products, PAY = NPD.pay, ONGKIR = NPD.ongkir, GRATIS = NPD.gratis;
  var state = { cat: "all", sort: "default", cart: {}, size: {}, kirim: "kirim", bayar: "transfer" };
  PRODUCTS.forEach(function (p) { if (p.sizes) state.size[p.id] = "M"; });

  function $(id) { return document.getElementById(id); }
  function rp(n) { return "Rp" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  function byId(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }

  var SHAPES = {
    tee: '<path class="shape" d="M70 28 L38 44 L16 86 L42 100 L56 82 L56 172 H144 V82 L158 100 L184 86 L162 44 L130 28 C122 44 78 44 70 28Z"/><path class="ln" d="M72 31 C80 46 120 46 128 31"/>',
    hoodie: '<path class="shape" d="M72 36 L34 54 L20 154 L46 158 L60 100 L60 174 H140 V100 L154 158 L180 154 L166 54 L128 36Z"/><path class="shape" d="M70 38 C68 6 132 6 130 38 C124 56 76 56 70 38Z"/><path class="ln" d="M100 56 V174 M90 56 V82 M110 56 V82"/>',
    cap: '<path class="shape" d="M44 120 C44 50 156 50 156 120Z"/><path class="shape" d="M34 122 C70 108 130 108 166 122 C150 154 50 154 34 122Z"/><circle class="shape" cx="100" cy="54" r="5"/><path class="ln" d="M72 64 C62 84 60 102 62 118 M128 64 C138 84 140 102 138 118"/>',
    tote: '<path class="ln" style="stroke-width:6" d="M72 78 C72 16 128 16 128 78"/><path class="shape" d="M44 76 H156 L164 184 H36Z"/>',
    sticker: '<rect x="30" y="62" width="140" height="76" rx="10" transform="rotate(7 100 100)" style="fill:#1d3fe0;stroke:#12288f;stroke-width:2"/><rect class="shape" x="30" y="62" width="140" height="76" rx="10" transform="rotate(-5 100 100)"/>',
    key: '<circle class="ln" style="stroke-width:5" cx="40" cy="92" r="16"/><rect class="shape" x="34" y="82" width="132" height="56" rx="12"/><circle class="ln" cx="52" cy="110" r="5"/>',
    lanyard: '<rect class="shape" x="80" y="6" width="40" height="148" rx="2"/><path class="shape" d="M91 154 H109 V172 H91Z"/><circle class="ln" style="stroke-width:5" cx="100" cy="184" r="10"/>'
  };

  function pic(p) {
    return '<div class="pic" style="--g:' + p.g + ';--gs:' + p.gs + ';--lx:' + p.lx + ';--ly:' + p.ly + ';--lw:' + p.lw + ';--rot:' + (p.rot || "0deg") + '">' +
      '<svg viewBox="0 0 200 200" role="img" aria-label="' + p.nama + '">' + SHAPES[p.shape] + '</svg>' +
      '<span class="lg' + (p.white ? " on-dark" : "") + '" aria-hidden="true"></span></div>';
  }

  function visible() {
    var list = PRODUCTS.filter(function (p) { return state.cat === "all" || p.kat === state.cat; });
    if (state.sort === "asc") list.sort(function (a, b) { return a.harga - b.harga; });
    if (state.sort === "desc") list.sort(function (a, b) { return b.harga - a.harga; });
    return list;
  }

  function renderGrid() {
    var list = visible();
    $("results").textContent = list.length + " produk";
    $("grid").innerHTML = list.map(function (p) {
      var sizes = "";
      if (p.sizes) {
        sizes = '<div class="sizes" role="group" aria-label="Ukuran ' + p.nama + '">' + p.sizes.map(function (s) {
          return '<button class="sz" type="button" data-pid="' + p.id + '" data-sz="' + s + '" aria-pressed="' + (state.size[p.id] === s) + '">' + s + '</button>';
        }).join("") + '</div>';
      }
      return '<article class="card">' + pic(p) +
        '<div class="body">' +
        '<span class="kat">' + p.kat + '</span>' +
        '<h3>' + p.nama + '</h3>' +
        '<p class="desc">' + p.desc + '</p>' + sizes +
        '<div class="buy"><div class="price">' + rp(p.harga) + '</div>' +
        '<button class="add" type="button" data-add="' + p.id + '">Tambah</button></div>' +
        '</div></article>';
    }).join("");
  }

  function totals() {
    var sub = 0, n = 0;
    Object.keys(state.cart).forEach(function (k) {
      var it = state.cart[k];
      sub += byId(it.id).harga * it.qty;
      n += it.qty;
    });
    var ship = 0;
    if (n > 0 && state.kirim === "kirim" && sub < GRATIS) ship = ONGKIR;
    return { sub: sub, n: n, ship: ship, total: sub + ship };
  }

  function renderCart() {
    var t = totals();
    var keys = Object.keys(state.cart);
    $("cart-count").textContent = t.n;
    $("cart-empty").hidden = keys.length > 0;
    $("checkout").hidden = keys.length === 0;
    $("items").innerHTML = keys.map(function (k) {
      var it = state.cart[k], p = byId(it.id);
      var label = p.nama + (it.size ? " (" + it.size + ")" : "");
      return '<li class="item">' +
        '<div><div class="nm">' + label + '</div><div class="sub">' + rp(p.harga) + ' &times; ' + it.qty + '</div></div>' +
        '<div class="line">' + rp(p.harga * it.qty) + '</div>' +
        '<div class="step"><button type="button" data-dec="' + k + '" aria-label="Kurangi ' + label + '">&minus;</button><span>' + it.qty + '</span><button type="button" data-inc="' + k + '" aria-label="Tambah ' + label + '">+</button></div>' +
        '<button class="rm" type="button" data-rm="' + k + '">Hapus</button>' +
        '</li>';
    }).join("");
    $("subtotal").textContent = rp(t.sub);
    $("ongkir").textContent = t.ship === 0 ? "Gratis" : rp(t.ship);
    $("total").textContent = rp(t.total);
    var ambil = state.kirim === "ambil";
    $("meter-wrap").hidden = ambil;
    $("meter").style.width = Math.min(100, Math.round(t.sub / GRATIS * 100)) + "%";
    $("ship-msg").textContent = ambil ? "Ambil langsung, tanpa ongkir." : (t.sub >= GRATIS ? "Gratis ongkir untuk pesanan ini." : "Belanja " + rp(GRATIS - t.sub) + " lagi untuk gratis ongkir.");
    $("alamat-wrap").hidden = ambil;
    $("alamat").required = !ambil;
    var cod = $("p-cod");
    cod.disabled = !ambil;
    cod.closest(".opt").classList.toggle("is-off", !ambil);
    if (!ambil && state.bayar === "cod") { state.bayar = "transfer"; $("p-transfer").checked = true; }
    $("pay-detail").innerHTML = PAY[state.bayar].html;
    $("order-out").hidden = true;
  }

  var toastTimer;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 1700);
  }

  function setCart(open) {
    $("drawer").classList.toggle("open", open);
    $("scrim").classList.toggle("open", open);
    $("drawer").setAttribute("aria-hidden", open ? "false" : "true");
    if (open) $("close-cart").focus(); else $("open-cart").focus();
  }

  $("grid").addEventListener("click", function (e) {
    var s = e.target.closest("[data-sz]");
    if (s) {
      var pid = s.getAttribute("data-pid");
      state.size[pid] = s.getAttribute("data-sz");
      s.parentNode.querySelectorAll(".sz").forEach(function (x) { x.setAttribute("aria-pressed", x === s ? "true" : "false"); });
      return;
    }
    var b = e.target.closest("[data-add]");
    if (!b) return;
    var id = b.getAttribute("data-add"), p = byId(id);
    var size = p.sizes ? state.size[id] : "";
    var key = id + "|" + (size || "-");
    if (state.cart[key]) state.cart[key].qty += 1; else state.cart[key] = { id: id, size: size, qty: 1 };
    renderCart();
    toast(p.nama + (size ? " (" + size + ")" : "") + " masuk keranjang");
  });
  $("items").addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    var k = t.getAttribute("data-inc") || t.getAttribute("data-dec") || t.getAttribute("data-rm");
    if (!k || !state.cart[k]) return;
    if (t.hasAttribute("data-inc")) state.cart[k].qty += 1;
    if (t.hasAttribute("data-dec")) { state.cart[k].qty -= 1; if (state.cart[k].qty <= 0) delete state.cart[k]; }
    if (t.hasAttribute("data-rm")) delete state.cart[k];
    renderCart();
  });
  document.querySelectorAll("[data-cat]").forEach(function (b) {
    b.addEventListener("click", function () {
      state.cat = b.getAttribute("data-cat");
      document.querySelectorAll("[data-cat]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      renderGrid();
    });
  });
  document.querySelectorAll('input[name="kirim"]').forEach(function (r) {
    r.addEventListener("change", function () { state.kirim = r.value; renderCart(); });
  });
  document.querySelectorAll('input[name="bayar"]').forEach(function (r) {
    r.addEventListener("change", function () { state.bayar = r.value; $("pay-detail").innerHTML = PAY[state.bayar].html; });
  });
  $("sort").addEventListener("change", function (e) { state.sort = e.target.value; renderGrid(); });
  $("to-shop").addEventListener("click", function () { $("koleksi").scrollIntoView({ behavior: "smooth" }); });
  $("open-cart").addEventListener("click", function () { setCart(true); });
  $("close-cart").addEventListener("click", function () { setCart(false); });
  $("scrim").addEventListener("click", function () { setCart(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && $("drawer").classList.contains("open")) setCart(false); });

  $("order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var t = totals();
    var lines = Object.keys(state.cart).map(function (k) {
      var it = state.cart[k], p = byId(it.id);
      return "- " + p.nama + (it.size ? " (" + it.size + ")" : "") + " x" + it.qty + " = " + rp(p.harga * it.qty);
    });
    var cat = $("catatan").value.trim();
    var ambil = state.kirim === "ambil";
    var text = "PESANAN MERCH NPD CLUB\n\n" +
      lines.join("\n") + "\n\n" +
      "Subtotal: " + rp(t.sub) + "\n" +
      "Ongkir: " + (t.ship === 0 ? "Gratis" : rp(t.ship)) + "\n" +
      "Total: " + rp(t.total) + "\n" +
      "Pembayaran: " + PAY[state.bayar].label + "\n\n" +
      "Nama: " + $("nama").value.trim() + "\n" +
      "WhatsApp: " + $("wa").value.trim() + "\n" +
      (ambil ? "Pengambilan: ambil langsung\n" : "Alamat: " + $("alamat").value.trim() + "\n") +
      (cat ? "Catatan: " + cat + "\n" : "");
    $("order-text").value = text;
    $("order-out").hidden = false;
    $("order-text").scrollIntoView({ block: "nearest" });
  });
  $("copy-order").addEventListener("click", function () {
    var ta = $("order-text");
    function fallback() { ta.focus(); ta.select(); toast("Teks terpilih, tekan salin"); }
    try {
      navigator.clipboard.writeText(ta.value).then(function () { toast("Ringkasan disalin"); }, fallback);
    } catch (err) { fallback(); }
  });

  renderGrid();
  renderCart();
})();
