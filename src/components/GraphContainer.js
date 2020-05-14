import { ResponsiveBar } from "@nivo/bar";
import React, { useState, useEffect } from "react";

export default function GraphContainer(props) {
  const [dataForGraph, setDataForGraph] = useState(null);
  const [keysForGraph, setKeysForGraph] = useState(null);
  const [legendForGraph, setLegendForGraph] = useState(null);

  const Bubble = ({ x, y, width, height, color }) => {
    return (
      <circle
        cx={x + width / 2}
        cy={y + height / 2}
        r={Math.min(width, height) / 2}
        fill={color}
      />
    );
  };
  const Label = (d) => {
    return d.value + " M";
  };

  useEffect(() => {
    let key = props.selectedDataType === "volumes" ? "funding" : "rounds";
    let legend = props.selectedDataType === "volumes" ? "Rounds" : "Funding";
    setKeysForGraph([key]);
    setLegendForGraph(legend);
    setDataForGraph(props.data.aggregatedDataByCategory);
  }, [props]);

  return (
    <div className="graph-container">
      {dataForGraph && keysForGraph && (
        <ResponsiveBar
          data={dataForGraph}
          keys={keysForGraph}
          indexBy="category"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: "set2" }}
          colorBy="index"
          groupMode="stacked"
          defs={[]}
          fill={[]}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Category",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: [legendForGraph],
            legendPosition: "middle",
            legendOffset: -40,
          }}
          barComponent={Bubble}
          label={Label}
          labelSkipWidth={19}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "indexes",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      )}
    </div>
  );
}
