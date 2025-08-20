const ApiKey = "HRqi4KQMtZKUCXnsBqBH2r3tWaUYKsy2au25ahIpMkmPi4WgIpsMmwKob7OWBbBi";

export const GetUserApiKey = async () => {
  const config = {
    method: "get",
    headers: {
      Authorization: `Bearer ${ApiKey}`,
    },
  };
  const res = await fetch("https://public-api.desk360.com/v1/integrations", config);
  console.log("🚀 ~ GetUserApiKey ~ res:", res);
};
