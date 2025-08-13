// GraduateSchoolViz.jsx
import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraduateSchoolViz = () => {
  // Data from your Excel file (converted from decimal to percentage for rates)
  const data = [
    { Year: 2006, Rate: 26.9, Applications: 1271200 },
    { Year: 2007, Rate: 28.13, Applications: 1282000 },
    { Year: 2008, Rate: 32.22, Applications: 1200000 },
    { Year: 2009, Rate: 36.03, Applications: 1246000 },
    { Year: 2010, Rate: 33.74, Applications: 1406000 },
    { Year: 2011, Rate: 32.73, Applications: 1511000 },
    { Year: 2012, Rate: 31.48, Applications: 1656000 },
    { Year: 2013, Rate: 30.73, Applications: 1760000 },
    { Year: 2014, Rate: 31.9, Applications: 1720000 },
    { Year: 2015, Rate: 34.58, Applications: 1650000 },
    { Year: 2016, Rate: 33.32, Applications: 1770000 },
    { Year: 2017, Rate: 35.93, Applications: 2010000 },
    { Year: 2018, Rate: 32.04, Applications: 2380000 },
    { Year: 2019, Rate: 27.97, Applications: 2900000 },
    { Year: 2020, Rate: 29.88, Applications: 3410000 },
    { Year: 2021, Rate: 29.55, Applications: 3770000 },
    { Year: 2022, Rate: 24.22, Applications: 4570000 },
    { Year: 2023, Rate: 16.05, Applications: 4740000 },
    { Year: 2024, Rate: 16.7, Applications: 4380000 },
    { Year: 2025, Rate: 17.3, Applications: 3880000 }
  ];

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const applicationsData = payload.find(p => p.dataKey === 'Applications');
      const rateData = payload.find(p => p.dataKey === 'Rate');
      
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{`Year: ${label}`}</p>
          {applicationsData && (
            <p className="text-blue-600">
              <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span>
              {`Applications: ${(applicationsData.value / 1000000).toFixed(1)}M`}
            </p>
          )}
          {rateData && (
            <p className="text-red-600">
              <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
              {`Acceptance Rate: ${rateData.value}%`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            China Graduate School Applications & Acceptance Rates
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Trends from 2006 to 2025
          </p>
          
          <div className="h-96 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="Year" 
                  stroke="#666"
                  fontSize={12}
                  tickFormatter={(value) => value.toString()}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#3b82f6"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#ef4444"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                <Bar
                  yAxisId="left"
                  dataKey="Applications"
                  fill="#3b82f6"
                  fillOpacity={0.8}
                  name="Total Applications"
                  radius={[2, 2, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Rate"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  name="Acceptance Rate (%)"
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Key insights */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Application Growth</h3>
              <p className="text-blue-700 text-sm">
                Applications increased from 1.3M in 2006 to 3.9M in 2025, representing a 205% growth over 20 years.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Acceptance Rate Decline</h3>
              <p className="text-red-700 text-sm">
                Acceptance rates dropped from 26.9% to 17.3%, a 36% decrease, making graduate school increasingly competitive.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Peak Competition</h3>
              <p className="text-gray-700 text-sm">
                2023 marked the lowest acceptance rate (16.05%) with nearly 4.7M applications, representing peak competition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduateSchoolViz;

// If you want to use this component, you'll also need:
// npm install recharts react react-dom
// and Tailwind CSS for styling