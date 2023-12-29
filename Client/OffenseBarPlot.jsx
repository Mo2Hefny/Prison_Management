// BarPlotComponent.js
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const BarPlotComponent = ({ data }) => {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryAxis
        tickValues={data.map(d => d.x)}
        tickFormat={data.map(d => `${d.x} - ${d.label}`)}
        style={{ tickLabels: { angle: -45, fontSize: 8, padding: 5 } }}
      />
      <VictoryAxis dependentAxis />
      <VictoryBar data={data} x="x" y="y" />
    </VictoryChart>
  );
};

export default BarPlotComponent;