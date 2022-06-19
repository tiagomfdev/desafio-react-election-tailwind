import React from "react";

function CandidatePicture({ img }) {
  return (
    <div className="p-2">
      <img
        src={`img/${img}.png`}
        alt={`${img}`}
        className="rounded-full w-10 m-2"
      />
    </div>
  );
}

function VotesInfo({ isElected, totalVotes, percentVotes }) {
  const textColorElected = isElected ? "text-red-600" : "text-green-500";
  return (
    <div className="flex flex-col text-center justify-center p-2">
      <span className={`font-semibold text-sm ${textColorElected}`}>
        {percentVotes}%
      </span>
      <span className="text-xs">{totalVotes} votos</span>
    </div>
  );
}

function CandidateElect({ isElected }) {
  const textColorElected = isElected ? "" : "text-yellow-500";
  return (
    <div
      className={`flex flex-row text-xs text-center justify-center pb-4 ${textColorElected} font-semibold`}
    >
      {isElected ? "Eleito" : "Não Eleito"}
    </div>
  );
}

function ElectionCandidate({
  picture = "",
  totalVotes = 0,
  percentVotes = 0,
  name = "",
  isElected = false,
}) {
  return (
    <div className="shadow-xl rounded-md w-48 p-2 m-2">
      <div className="flex flex-row justify-between">
        <CandidatePicture img={picture} />
        <VotesInfo
          totalVotes={totalVotes}
          percentVotes={percentVotes}
          isElected={isElected}
        />
      </div>
      <div className="flex flex-row text-center justify-center p-4 font-semibold">
        {name}
      </div>
      <CandidateElect isElected={isElected} />
    </div>
  );
}

export { ElectionCandidate };
