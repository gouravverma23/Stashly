const Skeleton = ({ className = '', style = {} }) => {
  return (
    <div
      className={`skeleton-pulse rounded-xl ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
