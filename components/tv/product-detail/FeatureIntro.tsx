type FeatureIntroProps = {
  title?: string;
  text?: string;
};

const FeatureIntro = ({ title, text }: FeatureIntroProps) => {
  if (!title || !text) return null;

  return (
    <div className="w-full mx-auto max-w-360">
      <div className="text-center ">
        <h2
          className="text-2xl font-black text-transparent md:text-4xl bg-clip-text md:py-2 2xl:text-6xl"
          style={{ backgroundImage: 'linear-gradient(90deg, #6DEBE6, #00AAA6, #067977)' }}
        >
          {title}
        </h2>
        <p className="mt-4 text-sm font-semiold leading-10 text-(--text-muted-color) md:text-base 2xl:text-lg 4xl:text-2xl">
          {text}
        </p>
      </div>
    </div>
  );
};

export default FeatureIntro;
