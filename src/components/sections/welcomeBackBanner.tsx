const FlowerImage = "/assets/images/flower.png";
export default function WelcomeBackBanner({ headerText= "",text = "" }) {
  return (
    <div className="h-[190px] bg-primary rounded-bl-[50px] relative">
      <div className="pt-10 px-5">
        <h1 className="text-[28px] text-white font-heading mb-1.5">
          {headerText}
        </h1>
        <p className="text-sm font-normal text-white opacity-[.8]">
          {text}
        </p>
        <div className="absolute bottom-0 right-5">
          <img src={FlowerImage} alt="FlowerImage" className="block" />
        </div>
      </div>
    </div>
  );
}
