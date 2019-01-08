/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1c63eb72281fcaaf38c7c0302e516abd"
  },
  {
    "url": "assets/css/2.styles.4d515d21.css",
    "revision": "af6cf761566dec008d0c78772143432e"
  },
  {
    "url": "assets/css/3.styles.90f01f4c.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/5.styles.d0864d0a.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/styles.4c717c2e.css",
    "revision": "6a2319d447e135213fbdc24a1b879754"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.86bec7be.js",
    "revision": "9be0c25e1d4193878b6147f0ab1f5f90"
  },
  {
    "url": "assets/js/2.4d515d21.js",
    "revision": "aa0c208aa79557461278f1f997e005cf"
  },
  {
    "url": "assets/js/3.90f01f4c.js",
    "revision": "85dc843b4b11beeada287f1a8ffa3df8"
  },
  {
    "url": "assets/js/4.41c9057f.js",
    "revision": "c9dd7332a60dec16a91f12cc989dedf9"
  },
  {
    "url": "assets/js/5.d0864d0a.js",
    "revision": "3c3f1bfbb365baa6225dd027c4606be0"
  },
  {
    "url": "assets/js/6.fadcb86e.js",
    "revision": "228ef5bdcbb296a9d50ee98b9a0ed1eb"
  },
  {
    "url": "assets/js/app.4c717c2e.js",
    "revision": "022102f9abcc090b4e37b49d3af65fcd"
  },
  {
    "url": "date.html",
    "revision": "a8108fcc7738bcc036b8ff418c923aa8"
  },
  {
    "url": "index.html",
    "revision": "1e529b871c488c77d10d4ce979f3f4c1"
  },
  {
    "url": "logo.png",
    "revision": "a53179ca13039218c56cb6bce42e3aa6"
  },
  {
    "url": "mcalendar.html",
    "revision": "23093e0016ace484036aa507fddcbcc6"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
