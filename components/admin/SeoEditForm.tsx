'use client';

import Link from 'next/link';
import { useState } from 'react';

type RobotsDirective = 'INHERIT' | 'INDEX_FOLLOW' | 'NOINDEX_FOLLOW' | 'NOINDEX_NOFOLLOW';
type SchemaSource = 'AUTO' | 'CUSTOM';

export type SeoEditFormProps = {
  id: string;
  slug: string;
  route: string;
  fallbackTitle: string;
  fallbackDescription: string;
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: RobotsDirective;
  schemaEnabled: boolean;
  schemaSource: SchemaSource;
  customSchema: string;
  action: (formData: FormData) => Promise<void>;
};

const robotsOptions: { value: RobotsDirective; label: string; description: string }[] = [
  {
    value: 'INHERIT',
    label: 'Inherit site default (index, follow)',
    description: 'Use the global setting from app/layout.tsx',
  },
  { value: 'INDEX_FOLLOW', label: 'Index, follow', description: 'Standard public page' },
  {
    value: 'NOINDEX_FOLLOW',
    label: 'Noindex, follow',
    description: 'Hide from search but pass link equity',
  },
  {
    value: 'NOINDEX_NOFOLLOW',
    label: 'Noindex, nofollow',
    description: 'Fully hide (e.g. thank-you, activation)',
  },
];

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3.5 py-2.5 text-[14px] text-navy outline-none focus:border-navy';

export default function SeoEditForm(props: SeoEditFormProps) {
  const [description, setDescription] = useState(props.description || props.fallbackDescription);
  const [robots, setRobots] = useState<RobotsDirective>(props.robots);
  const [schemaEnabled, setSchemaEnabled] = useState(props.schemaEnabled);
  const [schemaSource, setSchemaSource] = useState<SchemaSource>(props.schemaSource);

  return (
    <form action={props.action} className="space-y-6">
      <input type="hidden" name="id" value={props.id} />
      <input type="hidden" name="slug" value={props.slug} />

      <div className="flex items-center justify-between">
        <Link
          href="/admin/dashboard/seo"
          className="text-[13px] font-medium text-navy/70 hover:text-navy"
        >
          &larr; All routes
        </Link>
        <button
          type="submit"
          className="rounded-lg bg-navy px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-navy-deep"
        >
          Save
        </button>
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-white">
          🌐
        </span>
        <div>
          <p className="font-mono text-[15px] text-navy">{props.route}</p>
          <p className="text-[13px] text-muted">
            Per-route SEO meta + JSON-LD schema. Empty fields fall back to the page&rsquo;s
            hardcoded defaults.
          </p>
        </div>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-serif text-[19px] text-navy">Search engine metadata</h2>
        <p className="mb-5 text-[13px] text-muted">
          Title, description, keywords. Leave blank to keep the page&rsquo;s built-in fallback.
        </p>

        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Title
            </label>
            <input
              name="title"
              defaultValue={props.title}
              placeholder={props.fallbackTitle}
              className={inputClass}
            />
            <p className="mt-1 text-[12px] text-muted">Google truncates around 60 characters.</p>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={props.fallbackDescription}
              rows={3}
              className={inputClass}
            />
            <p className="mt-1 text-[12px] text-muted">
              {description.length} chars — Google truncates around 160.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Keywords
            </label>
            <input
              name="keywords"
              defaultValue={props.keywords}
              placeholder="keyword one, keyword two, keyword three"
              className={inputClass}
            />
            <p className="mt-1 text-[12px] text-muted">
              Comma-separated. Modern search engines mostly ignore this — included for
              completeness.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Canonical URL (optional)
            </label>
            <input
              name="canonicalUrl"
              defaultValue={props.canonicalUrl}
              placeholder="https://www.savannahskinmed.com/some-path"
              className={inputClass}
            />
            <p className="mt-1 text-[12px] text-muted">
              Absolute URL only. Leave blank to use the site default (SITE_URL + route).
            </p>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Robots directive
            </label>
            <div className="space-y-2">
              {robotsOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`block cursor-pointer rounded-xl border px-4 py-3 transition-colors ${
                    robots === opt.value ? 'border-navy bg-cream' : 'border-navy/10 hover:border-navy/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="robots"
                    value={opt.value}
                    checked={robots === opt.value}
                    onChange={() => setRobots(opt.value)}
                    className="sr-only"
                  />
                  <span className="block font-sans text-[14px] font-medium text-navy">
                    {opt.label}
                  </span>
                  <span className="text-[12px] text-muted">{opt.description}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-serif text-[19px] text-navy">JSON-LD schema</h2>
        <p className="mb-5 text-[13px] text-muted">
          Structured data Google reads for rich results. Toggle off on pages that shouldn&rsquo;t
          have any (thank-you, activation, etc.).
        </p>

        <div className="mb-5">
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-muted">
            Enable schema on this page
          </label>
          <button
            type="button"
            onClick={() => setSchemaEnabled((v) => !v)}
            className={`flex items-center gap-3 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              schemaEnabled ? 'bg-mint text-sage' : 'bg-navy/5 text-muted'
            }`}
          >
            <span
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                schemaEnabled ? 'bg-sage' : 'bg-navy/20'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  schemaEnabled ? 'translate-x-[18px]' : 'translate-x-0'
                }`}
              />
            </span>
            <span>{schemaEnabled ? 'On — schema will be injected' : 'Off — no schema on this page'}</span>
          </button>
          <input type="hidden" name="schemaEnabled" value={schemaEnabled ? 'on' : 'off'} />
        </div>

        {schemaEnabled && (
          <>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Schema source
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setSchemaSource('AUTO')}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  schemaSource === 'AUTO' ? 'border-navy bg-cream' : 'border-navy/10 hover:border-navy/30'
                }`}
              >
                <span className="block font-sans text-[14px] font-medium text-navy">Auto</span>
                <span className="text-[12px] text-muted">
                  Framework injects a BreadcrumbList for this route. Organization schema is
                  already global.
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSchemaSource('CUSTOM')}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  schemaSource === 'CUSTOM' ? 'border-navy bg-cream' : 'border-navy/10 hover:border-navy/30'
                }`}
              >
                <span className="block font-sans text-[14px] font-medium text-navy">Custom</span>
                <span className="text-[12px] text-muted">
                  Paste your own JSON-LD below. Replaces the auto BreadcrumbList for this route.
                </span>
              </button>
            </div>
            <input type="hidden" name="schemaSource" value={schemaSource} />

            {schemaSource === 'CUSTOM' && (
              <textarea
                name="customSchema"
                defaultValue={props.customSchema}
                placeholder='{"@context": "https://schema.org", "@type": "FAQPage", ...}'
                rows={8}
                className={`${inputClass} mt-4 font-mono text-[12px]`}
              />
            )}
          </>
        )}
      </section>

      <button
        type="submit"
        className="rounded-lg bg-navy px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-navy-deep"
      >
        Save changes
      </button>
    </form>
  );
}
