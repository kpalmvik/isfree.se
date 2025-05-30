import * as uts46 from "idna-uts46-hx";

type FreeResponseValues = "free" | "not_valid" | "occupied";

const returnValues: Record<FreeResponseValues, Status> = {
  free: "FREE",
  not_valid: "NOT_VALID",
  occupied: "OCCUPIED",
};

const seFreeLocal = async (domain: string): Promise<Status> => {
  const idnEncodedDomain = uts46.toAscii(domain);

  const requestUrl = `http://free.iis.se/free?q=${encodeURIComponent(idnEncodedDomain)}`;

  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const body = await response.text();

  const domainAvailability = body.split(" ")[0];
  const result = returnValues[domainAvailability as FreeResponseValues];

  if (!(domainAvailability in returnValues)) {
    throw new Error(
      `Invalid response "${domainAvailability}" from ${requestUrl}`,
    );
  }

  return result;
};

export default seFreeLocal;
