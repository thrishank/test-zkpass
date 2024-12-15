"use client";

import { useState } from "react";
import TransgateConnect from "@zkpass/transgate-js-sdk";

const verify = async (
  appid: string,
  schemaId: string,
  setOutput: (output: string) => void,
  setError: (error: string) => void,
) => {
  try {
    // Create the connector instance
    const connector = new TransgateConnect(appid);

    // Check if the TransGate extension is installed
    const isAvailable = await connector.isTransgateAvailable();

    if (isAvailable) {
      // Launch the process of verification
      const res = await connector.launch(schemaId);
      setOutput(JSON.stringify(res, null, 2));
    } else {
      setError("Please install TransGate");
    }
  } catch (error) {
    setError(`Transgate error: ${JSON.stringify(error)}`);
  }
};

export default function Zkschema() {
  const [appid, setAppid] = useState("");
  const [schemaId, setSchemaId] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="p-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="appid"
        >
          App ID
        </label>
        <input
          id="appid"
          type="text"
          value={appid}
          onChange={(e) => setAppid(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="schemaId"
        >
          Schema ID
        </label>
        <input
          id="schemaId"
          type="text"
          value={schemaId}
          onChange={(e) => setSchemaId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={() => verify(appid, schemaId, setOutput, setError)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        test
      </button>
      {output && <pre className="mt-4 p-4 text-white rounded">{output}</pre>}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
}
