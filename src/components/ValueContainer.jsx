import ArcProgress from "react-arc-progress";
import React from "react";
const styles = {
  values: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
export const ValueContainer = ({ title, unit, value, max }) => {
  const progress = value / max;
  return (
    <div style={styles.values}>
      <div>
        <ArcProgress
          progress={progress}
          text={`${value} ${unit}`}
          textStyle={{ size: "30px", font: "tahoma" }}
        />

        <h2>{title}</h2>
      </div>
    </div>
  );
};
