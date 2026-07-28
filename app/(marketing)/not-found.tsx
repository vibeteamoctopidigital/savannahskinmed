import ButtonLink from '@/components/ui/ButtonLink';

export default function NotFound() {
  return (
    /* Dark ground so the transparent header's white links stay legible. */
    <section className="flex min-h-[80vh] items-center bg-navy-deep pt-24">
      <div className="shell text-center">
        <p className="eyebrow mb-4 text-rose-light">Error 404</p>
        <h1 className="display-2 text-white">We Couldn&rsquo;t Find That Page</h1>
        <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.85] text-white/85">
          The page you were looking for has moved or no longer exists. Let&rsquo;s get you back to
          something useful.
        </p>
        <div className="mt-9 flex justify-center">
          <ButtonLink href="/" variant="white">
            Back To Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
