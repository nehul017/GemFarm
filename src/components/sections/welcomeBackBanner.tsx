const FlowerImage = "/assets/images/flower.png";
export default function WelcomeBackBanner({ headerText = "", text = "" }) {
  return (
    <div className="h-[190px] bg-primary rounded-bl-[50px] relative overflow-hidden px-5 flex flex-col justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.07)_5%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.07)_5%)] bg-[length:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <h1 className="text-[28px] text-white font-heading font-semibold mb-1.5">
          {headerText}
        </h1>
        <p className="text-sm font-normal text-white opacity-80">
          {text}
        </p>
      </div>

      {/* Flower Image */}
      <div className="absolute bottom-0 right-5">
        <img src={FlowerImage} alt="FlowerImage" className="block" />
      </div>
    </div>
  );
}
