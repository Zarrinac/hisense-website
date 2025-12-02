type FeatureIntroProps = {
  title?: string;
  text?: string;
};

const FeatureIntro = ({ title, text }: FeatureIntroProps) => {
  if (!title || !text) return null;

  return (
    <div className="w-full mx-auto max-w-360">
      <div className="text-center ">
        <p
          className="text-2xl font-black text-transparent md:text-4xl bg-clip-text md:py-2"
          style={{ backgroundImage: 'var(--brand-gradient)' }}
        >
          {title}
        </p>
        <p className="mt-4 text-xs leading-10 text-(--text-muted-color) md:text-base 4xl:text-xl">
          {text}
        </p>
      </div>
    </div>
  );
};

export default FeatureIntro;
