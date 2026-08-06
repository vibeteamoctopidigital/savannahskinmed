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
    tone === 'white' ? 'text-white font-bold text-[14px]' : 'text-navy font-bold text-[14px]';

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
        className={`font-serif font-medium text-[36px] leading-[1.1] sm:text-[36px] lg:text-[48px] [text-wrap:initial] ${tone === 'white' ? 'text-white' : 'text-navy'}`}
      >
        {title}
      </h2>

      {intro && (
        <p
          className={`mt-4 sm:mt-5 font-sans text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.5] ${
            tone === 'white' ? 'text-white' : 'text-ink'
          } ${centered ? 'mx-auto max-w-[620px]' : ''}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
