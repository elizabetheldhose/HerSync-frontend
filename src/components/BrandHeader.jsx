import BrandLogo from "./BrandLogo";

export default function BrandHeader() {
  return (
    <div className="flex justify-between items-center mb-12">
      <BrandLogo />

      <div className="text-mutedText text-sm">
        Welcome back 🌸
      </div>
    </div>
  );
}
