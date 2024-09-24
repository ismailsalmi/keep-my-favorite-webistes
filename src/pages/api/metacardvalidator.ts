import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

async function fetchAPI(url: string) {
  try {
    const { data } = await axios.get(url);
    return { data };
  } catch (error) {
    return { error: "Failed to load data" };
  }
}

interface ResponseData {
  response?: string[];
  error?: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { url } = req.body;
  if (req.method === "POST") {
    const { data, error } = await fetchAPI(url);
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
      return;
    }
    res.status(StatusCodes.OK).send({ response: data });
    return;
  }
  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ error: "Method not allwed" });
}
