# Source inventory and extraction audit

This inventory was written after the source ZIP was fully unpacked and before any application code was authored.

## Source archive

- Archive: `builerz-master.zip` (1,852,758 bytes)
- SHA-256: `110442220e4326ba39b7572ec8ccdc59dfe5981e630dfc558cdaddd706e9c260`
- Extracted directory: `builerz-master/`
- Extracted files: **106**
- Extracted directories: **23** (including `builerz-master/`)
- Extracted payload size: **2,574,843 bytes**
- Extraction is complete; the ZIP and extracted source files are preserved unchanged.

## Source identity and usage notes

- Template: **Builderz — Construction Company Website Template**, HTML Codex.
- The included license permits personal/commercial modification under CC BY 4.0 and requires attribution. The HTML Codex credit is retained in the source archive and should remain in the production site's footer.
- Source consists of a static Bootstrap/jQuery template. It has eight HTML pages, original theme CSS/JS, local vendor libraries, and sample images.
- It is not a Next.js project: there is no `package.json`, package lock, application router, Vercel configuration, or existing environment-variable file.

## Extracted design and integration facts

- Main theme stylesheet: `builerz-master/css/style.css` (preserved verbatim).
- CSS custom properties (`--name: value`) or `:root` design-token declarations: **none** in the source CSS/SCSS/LESS files.
- Main stylesheet's exact hex color literals: ``#000000`, `#00acee`, `#030f27`, `#0e76a8`, `#121518`, `#3b5998`, `#3f729b`, `#666666`, `#999999`, `#dddddd`, `#f3f6ff`, `#f8f9fa`, `#fdbe33`, `#ffffff``.
- Main stylesheet's exact `font-size` values: `0`, `12px`, `13px`, `14px`, `15px`, `16px`, `18px`, `20px`, `22px`, `25px`, `30px`, `35px`, `40px`, `45px`, `50px`, `60px`.
- Main body font: Poppins, sans-serif, weight 400. The HTML loads Google Fonts with weights 100, 200, 300, 400, 500, 600, 700, 800, and 900 and `display=swap`.
- Local `@font-face` rules are present for the Flaticon icon font and Slick's icon font. Their original CSS/SCSS/LESS files (including `src`, `font-weight`, and any absent `font-display`) remain byte-for-byte unchanged. No `font-display` declaration appears in those local rules.
- Existing layout includes a yellow-and-navy top bar/nav, hero carousel, feature strip, stats, six services, team, FAQ, testimonials, blog, footer, portfolio filter, and contact page. Primary source colors include yellow `#fdbe33` and navy `#030f27`.
- The source's sticky navigation threshold is **90 px** (`builerz-master/js/main.js`); counter-up duration is **2,000 ms**. WOW.js initializes scroll-reveal effects. The source has no branded page preloader.
- One source contact form (`#contactForm`) uses `jqBootstrapValidation`, posts via jQuery AJAX to `mail/contact.php`, and displays success/failure messages. The PHP handler validates/escapes input and calls PHP's `mail()` with the placeholder recipient `info@example.com`. The footer newsletter input is not wired to a backend. No CAPTCHA provider is included.

## Requested systems absent from the source

The archive does **not** contain a loading screen, cookie-consent banner, CAPTCHA/reCAPTCHA, privacy/terms/cookie legal pages, dedicated 404 or 500 page layouts, JSON API route files, `.env` files, or named environment variables. The only PHP files are `mail/contact.php` and two small library-link helpers (`lib/lightbox/links.php`, `lib/waypoints/links.php`). The source's footer contains placeholder legal links; these are not complete legal pages. Any requested equivalents therefore must be newly implemented rather than copied, while the source files remain untouched.

## Third-party libraries and declared versions in the source

| Library / asset | Version or exact declaration | Where it is declared |
|---|---|---|
| Bootstrap | 4.4.1 | CDN URLs in HTML heads and footers |
| jQuery | 3.4.1 | CDN URL in HTML footers |
| Font Awesome | 5.10.0 | CDN URL in HTML heads |
| Google Fonts: Poppins | weights 100–900; `display=swap` | Google Fonts URL in HTML heads |
| Animate.css | 3.5.2 | `lib/animate/animate.min.css` banner |
| jQuery CounterUp | 2.1.0 | `lib/counterup/counterup.min.js` banner |
| jQuery Easing | 1.4.1 | `lib/easing/easing.js` banner |
| Isotope | 3.0.5 | `lib/isotope/isotope.pkgd.js` banner |
| Lightbox2 | 2.10.0 | `lib/lightbox/js/lightbox.js` banner |
| Owl Carousel | 2.2.1 | `lib/owlcarousel/owl.carousel.js` banner |
| Slick Carousel | 1.8.0 | `lib/slick/slick.js` banner |
| Waypoints | 4.0.1 | `lib/waypoints/waypoints.min.js` banner |
| WOW.js | 1.3.0 | `lib/wow/wow.js` banner |
| Flaticon icon font | no version declared | `lib/flaticon/font/` |
| jqBootstrapValidation | no version declared | `mail/jqBootstrapValidation.min.js` |
| PHP `mail()` | PHP built-in; no package version | `mail/contact.php` |

There is no source `package.json` or lockfile, so there are **no npm package names/versions declared by the original project**. Versions above are only those explicitly found in CDN URLs or vendor banners.

## Complete extracted file inventory

Paths below are relative to `builerz-master/`; sizes are the extracted byte sizes. The separately preserved archive is `builerz-master.zip` (1,852,758 bytes; SHA-256 above).

| File | Bytes |
|---|---:|
| `LICENSE.txt` | 1,279 |
| `READ-ME.txt` | 555 |
| `about.html` | 25,810 |
| `blog.html` | 19,936 |
| `construction-company-website-template.jpg` | 90,684 |
| `contact.html` | 15,752 |
| `css/style.css` | 39,249 |
| `img/about.jpg` | 165,625 |
| `img/blog-1.jpg` | 34,103 |
| `img/blog-2.jpg` | 29,227 |
| `img/blog-3.jpg` | 36,678 |
| `img/carousel-1.jpg` | 205,641 |
| `img/carousel-2.jpg` | 100,515 |
| `img/carousel-3.jpg` | 127,067 |
| `img/portfolio-1.jpg` | 40,182 |
| `img/portfolio-2.jpg` | 52,972 |
| `img/portfolio-3.jpg` | 32,701 |
| `img/portfolio-4.jpg` | 39,358 |
| `img/portfolio-5.jpg` | 33,577 |
| `img/portfolio-6.jpg` | 47,657 |
| `img/post-1.jpg` | 4,978 |
| `img/post-2.jpg` | 5,001 |
| `img/post-3.jpg` | 6,006 |
| `img/post-4.jpg` | 5,181 |
| `img/post-5.jpg` | 5,262 |
| `img/quote.png` | 630 |
| `img/service-1.jpg` | 66,848 |
| `img/service-2.jpg` | 42,963 |
| `img/service-3.jpg` | 45,701 |
| `img/service-4.jpg` | 50,534 |
| `img/service-5.jpg` | 48,359 |
| `img/service-6.jpg` | 53,338 |
| `img/single.jpg` | 77,331 |
| `img/team-1.jpg` | 24,722 |
| `img/team-2.jpg` | 23,749 |
| `img/team-3.jpg` | 26,431 |
| `img/team-4.jpg` | 18,810 |
| `img/testimonial-1.jpg` | 7,270 |
| `img/testimonial-2.jpg` | 9,152 |
| `img/testimonial-3.jpg` | 7,614 |
| `img/testimonial-4.jpg` | 8,919 |
| `img/user.jpg` | 4,048 |
| `index.html` | 52,890 |
| `js/main.js` | 3,700 |
| `lib/animate/animate.css` | 23,848 |
| `lib/animate/animate.min.css` | 16,953 |
| `lib/counterup/counterup.min.js` | 2,406 |
| `lib/easing/easing.js` | 4,092 |
| `lib/easing/easing.min.js` | 2,302 |
| `lib/flaticon/backup.txt` | 1,332 |
| `lib/flaticon/font/Flaticon.eot` | 8,838 |
| `lib/flaticon/font/Flaticon.svg` | 45,871 |
| `lib/flaticon/font/Flaticon.ttf` | 8,660 |
| `lib/flaticon/font/Flaticon.woff` | 5,360 |
| `lib/flaticon/font/Flaticon.woff2` | 4,308 |
| `lib/flaticon/font/_flaticon.scss` | 1,836 |
| `lib/flaticon/font/flaticon.css` | 1,296 |
| `lib/flaticon/font/flaticon.html` | 20,042 |
| `lib/flaticon/license/license.pdf` | 35,708 |
| `lib/isotope/isotope.pkgd.js` | 91,330 |
| `lib/isotope/isotope.pkgd.min.js` | 35,503 |
| `lib/lightbox/css/lightbox.css` | 3,714 |
| `lib/lightbox/css/lightbox.min.css` | 2,608 |
| `lib/lightbox/images/close.png` | 280 |
| `lib/lightbox/images/loading.gif` | 8,476 |
| `lib/lightbox/images/next.png` | 1,350 |
| `lib/lightbox/images/prev.png` | 1,360 |
| `lib/lightbox/js/lightbox.js` | 18,410 |
| `lib/lightbox/js/lightbox.min.js` | 9,418 |
| `lib/lightbox/links.php` | 128 |
| `lib/owlcarousel/LICENSE` | 1,090 |
| `lib/owlcarousel/assets/ajax-loader.gif` | 3,208 |
| `lib/owlcarousel/assets/owl.carousel.css` | 4,028 |
| `lib/owlcarousel/assets/owl.carousel.min.css` | 2,936 |
| `lib/owlcarousel/assets/owl.theme.default.css` | 1,303 |
| `lib/owlcarousel/assets/owl.theme.default.min.css` | 936 |
| `lib/owlcarousel/assets/owl.theme.green.css` | 1,301 |
| `lib/owlcarousel/assets/owl.theme.green.min.css` | 936 |
| `lib/owlcarousel/assets/owl.video.play.png` | 4,976 |
| `lib/owlcarousel/owl.carousel.js` | 85,368 |
| `lib/owlcarousel/owl.carousel.min.js` | 42,766 |
| `lib/slick/ajax-loader.gif` | 4,178 |
| `lib/slick/config.rb` | 161 |
| `lib/slick/fonts/slick.eot` | 2,048 |
| `lib/slick/fonts/slick.svg` | 2,152 |
| `lib/slick/fonts/slick.ttf` | 1,892 |
| `lib/slick/fonts/slick.woff` | 1,380 |
| `lib/slick/slick-theme.css` | 3,133 |
| `lib/slick/slick-theme.less` | 4,181 |
| `lib/slick/slick-theme.scss` | 4,758 |
| `lib/slick/slick.css` | 1,776 |
| `lib/slick/slick.js` | 88,955 |
| `lib/slick/slick.less` | 1,756 |
| `lib/slick/slick.min.js` | 42,863 |
| `lib/slick/slick.scss` | 1,756 |
| `lib/waypoints/links.php` | 77 |
| `lib/waypoints/waypoints.min.js` | 9,028 |
| `lib/wow/wow.js` | 16,517 |
| `lib/wow/wow.min.js` | 8,156 |
| `mail/contact.js` | 2,598 |
| `mail/contact.php` | 820 |
| `mail/jqBootstrapValidation.min.js` | 14,877 |
| `portfolio.html` | 19,435 |
| `service.html` | 28,379 |
| `single.html` | 50,801 |
| `team.html` | 20,884 |
