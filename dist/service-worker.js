if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let r = Promise.resolve();
      return (
        s[e] ||
          (r = new Promise(async (r) => {
            if ("document" in self) {
              const s = document.createElement("script");
              (s.src = e), document.head.appendChild(s), (s.onload = r);
            } else importScripts(e), r();
          })),
        r.then(() => {
          if (!s[e]) throw new Error(`Module ${e} didn’t register its module`);
          return s[e];
        })
      );
    },
    r = (r, s) => {
      Promise.all(r.map(e)).then((e) => s(1 === e.length ? e[0] : e));
    },
    s = { require: Promise.resolve(r) };
  self.define = (r, i, t) => {
    s[r] ||
      (s[r] = Promise.resolve().then(() => {
        let s = {};
        const o = { uri: location.origin + r.slice(1) };
        return Promise.all(
          i.map((r) => {
            switch (r) {
              case "exports":
                return s;
              case "module":
                return o;
              default:
                return e(r);
            }
          })
        ).then((e) => {
          const r = t(...e);
          return s.default || (s.default = r), s;
        });
      }));
  };
}
define("./service-worker.js", ["./workbox-468c4d03"], function (e) {
  "use strict";
  e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "bundle.js", revision: "b6166784a5db0250357cec4af7a45eea" },
        { url: "index.html", revision: "73a4e762ca67f685108098d26c0c380a" },
        { url: "styles.css", revision: "0c02ea3a44f599920489f30ff19fb88a" },
      ],
      {}
    );
});
