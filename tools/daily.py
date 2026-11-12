#!/usr/bin/env python3
"""Runs on GitHub Actions every day (stdlib only). Builds /today/<key>/ pages,
/feeds/<key>.xml RSS feeds, /feeds/honest-little-apps.opml and sitemap-daily.xml
from the dated items in /data/*.json. Safe to run locally: python3 tools/daily.py"""
import json, os, glob, html, datetime as dt, email.utils, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://honestlittleapps.github.io"
PT = "129123876"
today = dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).date()  # Eastern (standard) date
ds = today.isoformat()
h = lambda s: html.escape(s, quote=True)
NICE = today.strftime("%A, %B %-d, %Y")


def store(app_name, app, ct):
    return f"https://apps.apple.com/app/id{app}?pt={PT}&ct={ct}&mt=8"


def body_html(b):
    b = b.split("\n\n—\n")[0]
    parts = b.split("\n\n\n\n")
    q = "".join(f"<p>{h(p).replace(chr(10), '<br>')}</p>" for p in parts[0].split("\n\n"))
    if len(parts) > 1:
        q += f"<details><summary>Show the answer</summary><p>{h(parts[1].strip()).replace(chr(10), '<br>')}</p></details>"
    return q


CSS = ("*{box-sizing:border-box}body{margin:0;font:17px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;"
       "background:#f6f5f2;color:#1d1d1f}.w{max-width:720px;margin:0 auto;padding:0 18px 40px}header{padding:14px 0;font-size:14px;color:#6e6e73}"
       "header a{color:#6e6e73;text-decoration:none}.card{background:#fff;border-radius:20px;padding:22px;box-shadow:0 8px 24px rgba(0,0,0,.06);margin:8px 0 18px}"
       ".kick{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--a);font-weight:700}h1{font-size:30px;line-height:1.15;margin:6px 0 12px;letter-spacing:-.02em}"
       "h2{font-size:21px;margin:26px 0 8px}.cta{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}.b{display:inline-block;padding:12px 16px;border-radius:13px;"
       "text-decoration:none;font-weight:650}.b1{background:var(--a);color:#fff}.b2{background:#fff;color:var(--a);border:1px solid #ddd}"
       "ul.n{list-style:none;padding:0}ul.n li{background:#fff;border-radius:14px;padding:12px 16px;margin:8px 0}ul.n b{display:block}ul.n span{color:#6e6e73;font-size:14px}"
       "details{background:#f6f5f2;border-radius:12px;padding:10px 14px;margin-top:10px}summary{cursor:pointer;font-weight:650}"
       "code{word-break:break-all;font-size:13px}footer{font-size:14px;color:#6e6e73;margin-top:30px}footer a{color:#6e6e73}")


def build():
    idx = json.load(open(f"{ROOT}/data/index.json"))
    os.makedirs(f"{ROOT}/feeds", exist_ok=True)
    feeds, urls = [], []
    for ent in idx:
        key = ent["key"]
        d = json.load(open(f"{ROOT}/data/{key}.json"))
        items = d["items"]
        past = [i for i in items if i["d"] <= ds]
        cur_d = past[-1]["d"] if past else (items[0]["d"] if items else ds)
        cur = [i for i in items if i["d"] == cur_d]
        nxt = [i for i in items if i["d"] > ds][:6]
        recent = past[-20:]
        name = d["calname"]
        ct = ("today-" + key)[:40]
        st = store(d["appName"], d["app"], ct)
        page = f"{BASE}/today/{key}/"
        webcal = d["ics"].replace("https://", "webcal://")
        title = f"{name} for Today, {today.strftime('%B %-d, %Y')}"
        desc = f"Today's entry from the free {name} calendar: {cur[0]['t'] if cur else name}. Updated every morning; subscribe on iPhone in one tap."
        cards = "".join(f"<div class='card'><div class='kick'>{h(i['d'] if i['d']!=ds else 'Today')}{(' · ' + h(i['tm'])) if i['tm'] else ''}</div><h1>{h(i['t'])}</h1>{body_html(i['b'])}</div>" for i in cur[:3])
        upcoming = "".join(f"<li><b>{h(i['t'])}</b><span>{h(dt.date.fromisoformat(i['d']).strftime('%a %b %-d'))}{(' · ' + h(i['tm'])) if i['tm'] else ''}</span></li>" for i in nxt)
        ld = {"@context": "https://schema.org", "@type": "WebPage", "name": title, "description": desc, "url": page, "dateModified": ds,
              "publisher": {"@type": "Organization", "name": "Honest Little Apps", "url": BASE + "/"}}
        doc = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{h(title)}</title><meta name="description" content="{h(desc)}"><link rel="canonical" href="{page}">
<meta name="apple-itunes-app" content="app-id={d['app']}"><meta name="theme-color" content="{d['color']}">
<link rel="manifest" href="manifest.webmanifest"><link rel="apple-touch-icon" href="{BASE}/icons/{d['app']}.jpg"><meta name="apple-mobile-web-app-title" content="{h(name[:24])}">
<link rel="alternate" type="application/rss+xml" title="{h(name)}" href="{BASE}/feeds/{key}.xml">
<meta property="og:title" content="{h(title)}"><meta property="og:description" content="{h(desc)}"><meta property="og:image" content="{BASE}/calendars/{d['slug']}/og.jpg">
<style>:root{{--a:{d['color']}}}{CSS}</style><script type="application/ld+json">{json.dumps(ld)}</script></head><body><div class="w">
<header><a href="{BASE}/">Honest Little Apps</a> · <a href="{BASE}/today/">Daily pages</a> · {h(NICE)}</header>
{cards or "<div class='card'><h1>Nothing scheduled today</h1><p>See what's coming up below.</p></div>"}
<div class="cta"><a class="b b1" href="{h(webcal)}">Get this daily in iPhone Calendar</a><a class="b b2" href="{h(st)}">{h(d['appName'].split(':')[0])} on the App Store</a></div>
<h2>Coming up</h2><ul class="n">{upcoming}</ul>
<h2>Keep it close</h2><p>Add this page to your Home Screen (Safari › Share › Add to Home Screen) and it opens on today's entry every time. Prefer a feed reader? Use the <a href="{BASE}/feeds/{key}.xml">RSS feed</a>. Run a website? <a href="{BASE}/embed/{d['slug']}/">Embed it for free</a>.</p>
<footer>This page updates itself every morning. Part of the free <a href="{d['calPage']}">{h(name)} calendar</a> from <a href="{BASE}/">Honest Little Apps</a>.</footer>
</div></body></html>"""
        os.makedirs(f"{ROOT}/today/{key}", exist_ok=True)
        open(f"{ROOT}/today/{key}/index.html", "w").write(doc)
        man = {"name": name, "short_name": name[:12], "start_url": f"/today/{key}/", "scope": f"/today/{key}/", "display": "standalone",
               "background_color": "#f6f5f2", "theme_color": d["color"], "icons": [{"src": f"/icons/{d['app']}.jpg", "sizes": "144x144", "type": "image/jpeg"}]}
        json.dump(man, open(f"{ROOT}/today/{key}/manifest.webmanifest", "w"))
        urls.append(page)
        # RSS
        rss_items = ""
        for i in reversed(recent):
            pub = email.utils.format_datetime(dt.datetime.fromisoformat(i["d"] + "T11:00:00+00:00"))
            txt = i["b"].split("\n\n—\n")[0].replace("\n\n\n\n", "\n\nAnswer: ").strip()
            rss_items += (f"<item><title>{h(i['t'])}</title><link>{page}</link><guid isPermaLink=\"false\">{h(key + '|' + i['d'] + '|' + i['t'] + '|' + i['tm'])}</guid>"
                          f"<pubDate>{pub}</pubDate><description>{h(txt + chr(10) + chr(10) + 'Free on the App Store: ' + d['appName'] + ' ' + st)}</description></item>")
        rss = (f"<?xml version=\"1.0\" encoding=\"UTF-8\"?><rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\"><channel><title>{h(name)}</title>"
               f"<link>{page}</link><description>{h(desc)}</description><language>en</language><lastBuildDate>{email.utils.format_datetime(dt.datetime.now(dt.timezone.utc))}</lastBuildDate>"
               f"<atom:link href=\"{BASE}/feeds/{key}.xml\" rel=\"self\" type=\"application/rss+xml\"/><image><url>{BASE}/icons/{d['app']}.jpg</url><title>{h(name)}</title><link>{page}</link></image>{rss_items}</channel></rss>")
        open(f"{ROOT}/feeds/{key}.xml", "w").write(rss)
        feeds.append((name, key))
    opml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><opml version=\"2.0\"><head><title>Honest Little Apps daily feeds</title></head><body>" + "".join(
        f"<outline type=\"rss\" text=\"{h(n)}\" title=\"{h(n)}\" xmlUrl=\"{BASE}/feeds/{k}.xml\" htmlUrl=\"{BASE}/today/{k}/\"/>" for n, k in feeds) + "</body></opml>"
    open(f"{ROOT}/feeds/honest-little-apps.opml", "w").write(opml)
    # daily index page
    li = "".join(f"<li><b><a href=\"{BASE}/today/{k}/\">{h(n)}</a></b><span><a href=\"{BASE}/feeds/{k}.xml\">RSS</a></span></li>" for n, k in feeds)
    os.makedirs(f"{ROOT}/today", exist_ok=True)
    open(f"{ROOT}/today/index.html", "w").write(f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Today's Daily Pages — Proverbs, Psalms, Puzzles, Sunsets & More | Honest Little Apps</title>
<meta name="description" content="Free pages that update every morning: today's Proverbs and Psalms, daily brain and number puzzles, sunset times, history, money and weather facts. Each has an RSS feed.">
<link rel="canonical" href="{BASE}/today/"><style>:root{{--a:#1d2440}}{CSS}</style></head><body><div class="w"><header><a href="{BASE}/">Honest Little Apps</a> · {h(NICE)}</header>
<div class="card"><div class="kick">Updated every morning</div><h1>Today's pages</h1><p>Each page shows today's entry and the week ahead. Add any of them to your Home Screen, follow the RSS feed, or subscribe in iPhone Calendar. Feed readers can import <a href="{BASE}/feeds/honest-little-apps.opml">all feeds at once (OPML)</a>.</p></div>
<ul class="n">{li}</ul><footer>Free, no account. <a href="{BASE}/calendars/">Calendars</a> · <a href="{BASE}/embed/">Website widgets</a> · <a href="{BASE}/partners/">Partners & press</a></footer></div></body></html>""")
    urls.append(f"{BASE}/today/")
    sm = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" + "".join(
        f"<url><loc>{u}</loc><lastmod>{ds}</lastmod><changefreq>daily</changefreq></url>" for u in urls) + "</urlset>"
    open(f"{ROOT}/sitemap-daily.xml", "w").write(sm)
    open(f"{ROOT}/today/urls.txt", "w").write("\n".join(urls))
    print("built", len(feeds), "daily pages + feeds for", ds)


if __name__ == "__main__":
    build()
