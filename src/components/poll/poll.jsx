import { useState } from "react";
import { motion } from "framer-motion";
import './poll.css'
import Image2 from './line2.png'
import Image1 from './line1.png'

const BarPoll = () => {
  const [votes, setVotes] = useState([
    {
      title: "Tuna",
      votes: 1,
      color: "bg-indigo-500",
    },
    {
      title: "Salmon",
      votes: 2,
      color: "bg-fuchsia-500",
    },
    {
      title: "Lobster",
      votes: 3,
      color: "bg-violet-500",
    },
  ]);

  return (
    <section className="bg-cyan-100 px-4 py-12">
      <div className="bottom absolute text-center">
        <img src={Image2} alt="" />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="heading-1">Time to have some fun?</h1>
      <br></br>
      <br></br>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-2 md:grid-cols-[1fr_400px] md:gap-12">
        <Options votes={votes} setVotes={setVotes} />
        <Bars votes={votes} />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="up absolute text-center">
        <img src={Image1} alt="" />
      </div>
    </section>
  );
};

const Options = ({ votes, setVotes }) => {
  const totalVotes = votes.reduce((acc, cv) => (acc += cv.votes), 0);

  const handleIncrementVote = (vote) => {
    const newVote = { ...vote, votes: vote.votes + 1 };
    setVotes((pv) => pv.map((v) => (v.title === newVote.title ? newVote : v)));
  };

  return (
    <div className="col-span-1 py-16"> {/* Adjusted padding here */}
      <h3 className="heading-2">
        Which seafood is known for its delicate flavor and tender texture?
      </h3>
      <br />
      <div className="mb-6 space-y-2">
        {votes.map((vote) => (
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => handleIncrementVote(vote)}
            key={vote.title}
            className={`w-full rounded-md ${vote.color} py-2 font-medium text-white`}
          >
            {vote.title}
          </motion.button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="mb-2 italic text-slate-400">{totalVotes} votes</span>
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            setVotes((pv) => pv.map((v) => ({ ...v, votes: 0 })));
          }}
          className="rounded-sm bg-slate-700 px-2 py-1.5 text-sm font-medium text-slate-200"
        >
          Reset count
        </motion.button>
      </div>
    </div>
  );
};


const Bars = ({ votes }) => {
  const totalVotes = votes.reduce((acc, cv) => (acc += cv.votes), 0);

  return (
    <div
      className="col-span-1 grid min-h-[200px] gap-2"
      style={{
        gridTemplateColumns: `repeat(${votes.length}, minmax(0, 1fr))`,
      }}
    >
      {votes.map((vote) => {
        const height = vote.votes
          ? ((vote.votes / totalVotes) * 100).toFixed(2)
          : 0;
        return (
          <div key={vote.title} className="col-span-1">
            <div className="relative flex h-full w-full items-end overflow-hidden rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800">
              <motion.span
                animate={{ height: `${height}%` }}
                className={`relative z-0 w-full ${vote.color}`}
                transition={{ type: "spring" }}
              />
              <span className="absolute bottom-0 left-[50%] mt-2 inline-block w-full -translate-x-[50%] p-2 text-center text-sm text-slate-50">
                <b>{vote.title}</b>
                <br></br>
                <span className="text-xs text-slate-200">
                  {vote.votes} votes
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarPoll;