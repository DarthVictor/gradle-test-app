const payload = require("../../data/payload");

const payloadString = JSON.stringify(payload);
const errroPayloadString = JSON.stringify({
    error: "404",
});

export const mockedSuccessResponse = async (req: Request) =>
    req.url === "/api/repos" ? payloadString : errroPayloadString;

export const mockedNetworErrorResponse = () =>
    Promise.reject(errroPayloadString);
export const mockedLogicErrorResponse = () =>
    Promise.resolve({ body: errroPayloadString, status: 401 });
