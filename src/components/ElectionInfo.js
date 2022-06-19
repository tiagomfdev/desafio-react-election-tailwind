import React from "react";

/*
            title="Eleição em Asgard"
            votingPopulation={100000000}
            absence={123123}
            presence={9871239}
            candidatesCount={6}

*/

function ElectionInfo({
  title = "Titulo",
  votingPopulation = 0,
  absence = 0,
  presence = 0,
  candidatesCount = 0,
}) {
  return (
    <div>
      <h2 className="flex flex-row text-center justify-center p-2 font-bold text-lg">
        {title}
      </h2>
      <div className="flex flex-row text-center justify-center space-x-4 text-sm ">
        <span>
          <span className="font-semibold">Total de eleitores: </span>
          {votingPopulation}
        </span>
        <span>
          <span className="font-semibold">Abstenção: </span>
          {absence}
        </span>
        <span>
          <span className="font-semibold">Comparecimento: </span>
          {presence}
        </span>
      </div>
      <div className="flex flex-row text-center justify-center text-sm font-semibold p-4">
        {candidatesCount} candidatos
      </div>
    </div>
  );
}

export { ElectionInfo };
