type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'center' | 'left';
  tone?: 'navy' | 'white';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'navy',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-[940px] text-center' : 'max-w-[680px]'} ${className}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow mb-4 ${tone === 'white' ? 'text-white/80' : 'text-rose-deep'}`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`display-2 [text-wrap:initial] ${tone === 'white' ? 'text-white' : 'text-navy'}`}
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
