"use client";

import TransgateConnect from "@zkpass/transgate-js-sdk";

const verify = async () => {
  try {
    // The appid of the project created in dev center
    const appid = "32e0d9c1-6a04-4410-9d3b-7f618d7563c9";

    // Create the connector instance
    const connector = new TransgateConnect(appid);

    // Check if the TransGate extension is installed
    // If it returns false, please prompt to install it from chrome web store
    const isAvailable = await connector.isTransgateAvailable();

    if (isAvailable) {
      // The schema id of the project
      const schemaId = "58dac30be50849728428c6ff04aa2a6d";

      // Launch the process of verification
      // This method can be invoked in a loop when dealing with multiple schemas
      const res = await connector.launch(schemaId);
      console.log(res);
      // verifiy the res onchain/offchain based on the requirement
    } else {
      console.log("Please install TransGate");
    }
  } catch (error) {
    console.log("transgate error", error);
  }
};

export default function Zkschema() {
  return <button onClick={verify}>Zkschema</button>;
}
