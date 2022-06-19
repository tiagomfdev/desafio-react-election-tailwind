import React, { useEffect, useState } from "react";

import {
  ElectionCandidate,
  ElectionCandidates,
  ElectionInfo,
  Header,
  Main,
  Select,
} from "../components";

import {
  apiGetCandidates,
  apiGetCities,
  apiGetElection,
} from "../services/apiService";

function getPercentVotes(totalVotes = 0, candidateVotes = 0) {
  return (candidateVotes * 100) / totalVotes;
}

export default function ElectionPage() {
  const [cities, setCities] = useState([]);
  const [candidates, setCandidates] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCityElectionInfo, setSelectedCityElectionInfo] =
    useState(null);
  const [selectedCityElectionCandidates, setSelectedCityElectionCandidates] =
    useState(null);

  //first load get all cities, candidates and set first state for select
  useEffect(() => {
    async function getCities() {
      const cities = await apiGetCities();
      setCities(cities);
      setSelectedCity(cities[0]);
    }

    async function getCandidates() {
      const candidates = await apiGetCandidates();
      setCandidates(candidates);
    }

    getCities();
    getCandidates();
  }, []);

  //when change city in <SELECT>
  useEffect(() => {
    async function setCityElection(selectedCity = null) {
      if (!selectedCity) return;

      const newSelectedCityElectionCandidates = await apiGetElection(
        selectedCity.id
      );
      setSelectedCityElectionCandidates(newSelectedCityElectionCandidates);

      setSelectedCityElectionInfo({
        votingPopulation: selectedCity.votingPopulation,
        absence: selectedCity.absence,
        presence: selectedCity.presence,
        candidatesCount: newSelectedCityElectionCandidates.length,
      });
    }

    setCityElection(selectedCity);
  }, [selectedCity]);

  async function handleSelectCity(cityId) {
    const newSelectedCity = cities.filter(({ id }) => id === cityId);

    const newSelectedCityElectionCandidates = await apiGetElection(cityId);
    setSelectedCityElectionCandidates(newSelectedCityElectionCandidates);

    setSelectedCity(newSelectedCity[0]);
  }

  return (
    <>
      <Header>react-elections</Header>
      <Main>
        <div className="flex flex-row justify-center">
          <Select
            labelDescription="Escolha o município"
            options={cities}
            onSelectChange={handleSelectCity}
          />
        </div>
        <div className="border p-2">
          <ElectionInfo
            title={`Eleição em ${selectedCity.name}`}
            votingPopulation={selectedCityElectionInfo?.votingPopulation}
            absence={selectedCityElectionInfo?.absence}
            presence={selectedCityElectionInfo?.presence}
            candidatesCount={selectedCityElectionInfo?.candidatesCount}
          />
          <ElectionCandidates>
            {selectedCityElectionCandidates?.map((candidate) => {
              const myCandidate = candidates.filter(
                ({ id }) => id === candidate.candidateId
              )[0];

              return (
                <ElectionCandidate
                  key={candidate.id}
                  name={myCandidate.name}
                  picture={myCandidate.name}
                  totalVotes={candidate.votes}
                  percentVotes={getPercentVotes(
                    selectedCityElectionInfo?.presence,
                    candidate.votes
                  ).toFixed(2)}
                  isElected={candidate.isElected}
                />
              );
            })}
          </ElectionCandidates>
        </div>
      </Main>
    </>
  );
}
