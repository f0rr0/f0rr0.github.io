#!/usr/bin/env python3
"""Bounded, same-origin SEO snapshot. Standard library only; see SKILL.md."""

import argparse
import hashlib
import json
import sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener
from xml.etree import ElementTree


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta, self.links, self.titles, self.h1, self.schema = {}, [], [], [], []
        self.capture, self.parts = None, []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            key = (attrs.get("name") or attrs.get("property") or "").lower()
            self.meta.setdefault(key, []).append(attrs.get("content", ""))
        if tag == "link":
            self.links.append(attrs)
        if tag in ("title", "h1") or (tag == "script" and attrs.get("type") == "application/ld+json"):
            self.capture, self.parts = tag, []

    def handle_data(self, data):
        if self.capture:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag != self.capture:
            return
        value = "".join(self.parts).strip()
        if tag == "script":
            try:
                self.schema.append(json.loads(value))
            except ValueError as error:
                self.schema.append({"parse_error": str(error)})
        else:
            (self.titles if tag == "title" else self.h1).append(value)
        self.capture = None


def origin(url):
    parts = urlsplit(url)
    if parts.scheme not in ("http", "https") or not parts.netloc or parts.username or parts.password:
        raise ValueError("Supply an http(s) origin without credentials")
    return f"{parts.scheme}://{parts.netloc}"


class SameOriginRedirect(HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, msg, headers, newurl):
        if origin(newurl) != origin(request.full_url):
            raise ValueError(f"Cross-origin redirect requires review: {newurl}")
        return super().redirect_request(request, fp, code, msg, headers, newurl)


def fetch(url):
    request = Request(url, headers={"User-Agent": "SiteSEOAudit/1.0", "Accept": "*/*"})
    try:
        response = build_opener(SameOriginRedirect()).open(request, timeout=20)
    except HTTPError as error:
        response = error
    with response:
        body = response.read(5_000_001)
        if len(body) > 5_000_000:
            raise ValueError("Response exceeds 5 MB; inspect with a specialised tool")
        return {"status": response.status, "final_url": response.url,
                "content_type": response.headers.get("Content-Type", ""),
                "x_robots_tag": ", ".join(response.headers.get_all("X-Robots-Tag", [])),
                "link_header": ", ".join(response.headers.get_all("Link", []))}, body


def inspect_html(body, response, canonical, expect_noindex=False):
    page = Page()
    page.feed(body.decode("utf-8", errors="replace"))
    canonicals = [link.get("href") for link in page.links if "canonical" in link.get("rel", "").split()]
    robots = " ".join(page.meta.get("robots", []) + page.meta.get("googlebot", []) + [response["x_robots_tag"]]).lower()
    issues = []
    if canonicals != [canonical]:
        issues.append("canonical_mismatch_or_duplicate")
    if len(page.titles) != 1 or not page.titles[0]:
        issues.append("missing_or_duplicate_title")
    if len(page.h1) != 1:
        issues.append("review_h1_structure")
    if not any(page.meta.get("description", [])):
        issues.append("missing_description")
    if bool({"noindex", "none"} & set(robots.replace(",", " ").split())) != expect_noindex:
        issues.append("unexpected_indexing_directive")
    if any(isinstance(node, dict) and "parse_error" in node for node in page.schema):
        issues.append("invalid_json_ld")
    if page.meta.get("og:url") != [canonical]:
        issues.append("og_url_mismatch_or_missing")
    for key in ("og:title", "og:type", "og:image", "twitter:card"):
        if not any(page.meta.get(key, [])):
            issues.append(f"missing_{key}")
    return {"titles": page.titles, "h1": page.h1, "meta": page.meta,
            "links": page.links, "json_ld": page.schema, "review_items": issues}


def self_test():
    source = b'<title>A &amp; B</title><h1>A <span>story</span></h1><meta name="description" content="Description"><meta name="robots" content="noindex"><link rel="canonical" href="https://example.com/a"><script type="application/ld+json">{"@type":"BlogPosting"}</script>'
    result = inspect_html(source, {"x_robots_tag": ""}, "https://example.com/a", True)
    assert result["titles"] == ["A & B"] and result["h1"] == ["A story"]
    assert result["json_ld"] == [{"@type": "BlogPosting"}]
    assert "unexpected_indexing_directive" not in result["review_items"]
    assert "unexpected_indexing_directive" in inspect_html(source, {"x_robots_tag": ""}, "https://example.com/a")["review_items"]
    assert "canonical_mismatch_or_duplicate" in inspect_html(source, {"x_robots_tag": ""}, "https://example.com/b")["review_items"]
    assert "invalid_json_ld" in inspect_html(source.replace(b'{"@type":"BlogPosting"}', b'{broken}'), {"x_robots_tag": ""}, "https://example.com/a")["review_items"]
    try:
        SameOriginRedirect().redirect_request(Request("https://example.com/"), None, 302, "", {}, "https://elsewhere.com/")
    except ValueError:
        pass
    else:
        raise AssertionError("Cross-origin redirect was followed")
    print("audit self-check passed")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url", nargs="?")
    parser.add_argument("--canonical-origin")
    parser.add_argument("--limit", type=int, default=100)
    parser.add_argument("--expect-noindex", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if not args.url or not 1 <= args.limit <= 1000:
        parser.error("Supply an origin and a limit from 1 to 1000")
    base = origin(args.url)
    canonical_base = origin(args.canonical_origin or base)
    report = {"checked_at": datetime.now(timezone.utc).isoformat(), "origin": base,
              "canonical_origin": canonical_base, "resources": {}, "pages": [], "review_items": []}
    locations = [canonical_base + "/"]
    for path in ("/robots.txt", "/sitemap.xml", "/llms.txt", "/rss.xml"):
        try:
            response, body = fetch(base + path)
            report["resources"][path] = response
            if response["status"] != 200:
                response["review"] = "optional_missing" if path == "/llms.txt" and response["status"] == 404 else "unexpected_status"
                continue
            if path in ("/robots.txt", "/llms.txt"):
                response["text"] = body.decode("utf-8", errors="replace")
            else:
                tree = ElementTree.fromstring(body)
                if path == "/sitemap.xml":
                    # ponytail: one urlset; use an existing crawler for sitemap indexes.
                    if not tree.tag.endswith("urlset"):
                        report["review_items"].append("sitemap_index_requires_separate_crawl")
                    else:
                        locations = [node.text for node in tree.findall("{*}url/{*}loc") if node.text]
        except Exception as error:
            report["resources"][path] = {"error": str(error)}
    if len(locations) != len(set(locations)):
        report["review_items"].append("duplicate_sitemap_locations")
    report["listed_pages"] = len(locations)
    report["skipped_by_limit"] = max(0, len(locations) - args.limit)
    for location in locations[:args.limit]:
        page = {"canonical_expected": location}
        try:
            if origin(location) != canonical_base:
                raise ValueError("Sitemap location uses an unexpected origin")
            parts = urlsplit(location)
            url = urljoin(base, parts.path or "/") + (f"?{parts.query}" if parts.query else "")
            response, body = fetch(url)
            page.update(response)
            if response["status"] != 200:
                page["review_items"] = ["unexpected_status"]
            elif "text/html" in response["content_type"]:
                page.update(inspect_html(body, response, location, args.expect_noindex))
                fields = {key: page[key] for key in ("titles", "meta", "links", "json_ld")}
                page["metadata_sha256"] = hashlib.sha256(json.dumps(fields, sort_keys=True).encode()).hexdigest()
            else:
                page["review_items"] = ["non_html_resource_check_indexing_and_canonical_headers"]
        except Exception as error:
            page["error"] = str(error)
        report["pages"].append(page)
    json.dump(report, sys.stdout, ensure_ascii=False, indent=2)
    print()


if __name__ == "__main__":
    main()
