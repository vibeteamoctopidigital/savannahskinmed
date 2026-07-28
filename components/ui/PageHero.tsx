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
  return (
    <section className="relative flex min-h-[440px] max-h-[560px] items-center justify-center overflow-hidden sm:h-[88vh] sm:min-h-[480px] sm:max-h-[760px]">
      <Image
        src={image}
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

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-5 pt-14 text-center sm:pt-20">
        <h1 className="display-1 animate-fadeUp text-white text-shadow-hero">{title}</h1>
        {intro && (
          <p className="mx-auto mt-6 max-w-[680px] animate-fadeUp text-[16px] leading-[1.8] text-white text-shadow-hero [animation-delay:120ms]">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
