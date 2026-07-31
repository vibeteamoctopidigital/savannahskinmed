import Image from 'next/image';

type PageHeroProps = {
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  /** Focal point for the background crop. */
  position?: string;
};

export default function PageHero({
  title,
  intro,
  image,
  imageAlt,
  position = 'center',
}: PageHeroProps) {
  const imageSrc =
    typeof image === 'string' && image.trim() !== '' && image !== '{}'
      ? image
      : '/images/banner-15-bg.jpg';

  return (
    <section className="relative flex min-h-[560px] sm:min-h-[500px] sm:h-[88vh] sm:max-h-[760px] items-center justify-center overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority

        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      {/* Neutral, light scrim only — keeps the photo's own warmth and lighting.
          Legibility comes from the text shadow rather than a heavy tint. */}
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/12 to-black/22" />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 pt-28 text-center sm:pt-32">
        <h1 className="display-1 animate-fadeUp text-white text-shadow-hero">{title}</h1>
        {intro && (
          <p className="mx-auto mt-5 max-w-[680px] animate-fadeUp text-[19px] leading-[1.65] text-white text-shadow-hero [animation-delay:120ms] sm:mt-6 sm:text-[20px] sm:leading-[1.7] lg:text-[21px]">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
