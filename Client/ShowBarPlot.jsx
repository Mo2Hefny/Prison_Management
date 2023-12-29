//ShowBarPlot.jsx
import OffenseBarPlot from './OffenseBarPlot';
import { fetchOffenses } from './src/service/prisonerService';

// ReportComponent.js
import React, { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLegend } from 'victory';

const ReportComponent = () => {
  const [showBarPlot, setShowBarPlot] = useState(false);

  const handleButtonClick = () => {
    setShowBarPlot(true);
  };

  const convictedData = fetchOffenses()

  return (
    <div>
      <h2>Report Component</h2>
      <button onClick={handleButtonClick}>Show Bar Plot</button>

      {showBarPlot && (
        <div>
          <h3>Offense Bar Plot</h3>
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis
              tickValues={convictedData.map(d => d.OffenseID)}
              tickFormat={convictedData.map(d => d.OffenseName)}
              style={{ tickLabels: { angle: -45, fontSize: 8, padding: 5 } }}
            />
            <VictoryAxis dependentAxis />
            <VictoryBar data={convictedData} x="OffenseID" y="count" />
            <VictoryLegend x={200} y={50}
              orientation="horizontal"
              gutter={20}
              data={[{ name: 'Count', symbol: { fill: 'tomato' } }]}
            />
          </VictoryChart>
        </div>
      )}
    </div>
  );
};
export default ReportComponent;
