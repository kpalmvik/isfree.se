import * as uts46 from "idna-uts46-hx";

type FreeResponseValues = "free" | "not_valid" | "occupied";
type Status = "FREE" | "NOT_VALID" | "OCCUPIED";

const returnValues: Record<FreeResponseValues, Status> = {
  free: "FREE",
  not_valid: "NOT_VALID",
  occupied: "OCCUPIED",
};

const seFreeLocal = async (domain: string): Promise<Status> => {
  const idnEncodedDomain = uts46.toAscii(domain);

  const requestUrl = `http://free.iis.se/free?q=${idnEncodedDomain}`;

  const response = await fetch(requestUrl);

  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }

  const body = await response.text();

  const domainAvailability = body.split(" ")[0] as FreeResponseValues;
  const result = returnValues[domainAvailability];

  if (result) {
    return result;
  }

  return Promise.reject(new Error("Unknown error"));
};

export default seFreeLocal;
