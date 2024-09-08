import React from 'react';

export const FilterDataNode = ({ data }) => (
  <div className="bg-white border-2 border-gray-300 rounded p-2">
    <h3 className="font-bold">{data.label}</h3>
    <p>Converts column data to lowercase</p>
  </div>
);

export const WaitNode = ({ data }) => (
  <div className="bg-white border-2 border-gray-300 rounded p-2">
    <h3 className="font-bold">{data.label}</h3>
    <p>Waits for 60 seconds</p>
  </div>
);

export const ConvertFormatNode = ({ data }) => (
  <div className="bg-white border-2 border-gray-300 rounded p-2">
    <h3 className="font-bold">{data.label}</h3>
    <p>Converts CSV to JSON</p>
  </div>
);

export const SendPostRequestNode = ({ data }) => (
  <div className="bg-white border-2 border-gray-300 rounded p-2">
    <h3 className="font-bold">{data.label}</h3>
    <p>Sends POST request with JSON payload</p>
  </div>
);