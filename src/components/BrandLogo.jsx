export default function BrandLogo({ size = "text-3xl" }) {
  return (
    <div className="flex flex-col leading-tight">
      <h1 className={`${size} font-light tracking-wide`}>
        <span className="text-softRose">Her</span>
        <span className="text-lavenderDark">Sync</span>
      </h1>
      <p className="text-xs text-mutedText tracking-widest uppercase mt-1">
        My Life Tracker
      </p>
    </div>
  );
}
