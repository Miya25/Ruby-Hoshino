const LoadingDots = ({
  color = "#000",
  style = "small",
}) => {
  const loadingStyle = style === "small" ? smallLoadingStyle : regularLoadingStyle;

  return (
    <span className={loadingStyle.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;

LoadingDots.defaultProps = {
  style: "small",
};

const smallLoadingStyle = {
  loading: "inline-flex",
  spacer: {
    marginRight: "2px",
  },
};

const regularLoadingStyle = {
  loading: "inline-flex",
  spacer: {
    marginRight: "2px",
  },
};
