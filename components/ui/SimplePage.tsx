import ButtonLink from '@/components/ui/ButtonLink';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';

type SimplePageProps = {
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  body: string[];
  cta?: { label: string; href: string };
};

/**
 * Shared shell for the secondary pages: brand hero, a short body column and a
 * closing call to action.
 */
export default function SimplePage({
  title,
  intro,
  image = '/images/banner-13-bg.jpg',
  imageAlt = 'Savannah Age Management Medicine',
  body,
  cta = { label: 'Book Appointment', href: '/contact-us' },
}: SimplePageProps) {
  return (
    <>
      <PageHero
        title={title}
        intro={intro}
        image={image}
        imageAlt={imageAlt}
        position="center 40%"
      />

      <section className="section bg-white">
        <div className="shell-narrow">
          <Reveal className="mx-auto max-w-[760px]">
            {body.map((paragraph) => (
              <p key={paragraph} className="mb-6 text-[15px] leading-[1.9] last:mb-0">
                {paragraph}
              </p>
            ))}

            <div className="mt-10">
              <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
