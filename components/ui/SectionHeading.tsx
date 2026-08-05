type SectionHeadingProps = {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'center' | 'left';
  tone?: 'navy' | 'white';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  eyebrowClassName,
  title,
  intro,
  align = 'center',
  tone = 'navy',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';

  const defaultEyebrowStyle =
    tone === 'white'
      ? 'text-white/80 font-semibold text-[13px] sm:text-[14px]'
      : 'text-navy font-semibold text-[13px] sm:text-[14px]';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-[940px] text-center' : 'mx-auto max-w-[680px] text-center'} ${className}`}
    >
      {eyebrow && (
        <p className={`eyebrow mb-4 ${eyebrowClassName || defaultEyebrowStyle}`}>
          {eyebrow}
        </p>
      )}

      <h2
        className={`font-serif font-medium text-[32px] leading-[1.2] sm:text-[48px] sm:leading-[48px] [text-wrap:initial] ${tone === 'white' ? 'text-white' : 'text-navy'}`}
      >
        {title}
      </h2>

      {intro && (
        <p
          className={`mt-5 text-[16px] leading-[1.75] lg:text-[15px] lg:leading-[1.85] ${
            tone === 'white' ? 'text-white/85' : 'text-muted'
          } ${centered ? 'mx-auto max-w-[620px]' : ''}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
