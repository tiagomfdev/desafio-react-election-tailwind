import { read } from "./httpService";
import _ from "lodash";

export async function apiGetCities() {
  const cities = await read("/cities");
  return cities;
}

export async function apiGetCandidates() {
  const candidates = await read("/candidates");
  return candidates;
}

export async function apiGetElection(cityId = "") {
  if (cityId) {
    let election = await read(`/election?cityId=${cityId}`);

    election = _.orderBy(election, "votes", "desc");
    election[0] = { ...election[0], isElected: true };

    return election;
  }

  return null;
}
