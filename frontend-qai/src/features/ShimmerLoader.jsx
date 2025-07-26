const ShimmerLoader = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white/10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
};

export default ShimmerLoader;
