// Renders a `<script type="application/ld+json">` block from a structured
// data object — the pattern Next.js docs recommend for JSON-LD in the App
// Router (no head-only Metadata API field exists for it). `data` is
// intentionally untyped: schema.org shapes vary per page and callers own
// their own object literal's correctness.
export function JsonLd({ data }: { data: unknown }) {
  // `data` is a build-time literal (see content/index.ts), never user input,
  // so this is JSON.stringify output only — not unsanitized HTML.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
