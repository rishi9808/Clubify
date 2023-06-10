import React from "react"

function PrizeItem({ prize, onChange, onRemove, showWinner }) {
  return (
    <div>
      <div>
        <label htmlFor="type">Type</label>
        <input
          id="type"
          className="m-1 p-1 border-2 rounded-sm"
          type="text"
          value={prize.type}
          onChange={(e) => {
            onChange({ ...prize, type: e.target.value })
          }}
        />
        <label htmlFor="amount">Amount</label>
        <input
          className="m-1 p-1 border-2 rounded-sm"
          id="amount"
          type="number"
          value={prize.amount}
          onChange={(e) => {
            onChange({ ...prize, amount: e.target.valueAsNumber })
          }}
        />
      </div>
      <div>
        {showWinner && (
          <>
            <label htmlFor="winnerEmail">Winner</label>
            <input
              className="m-1 p-1 border-2 rounded-sm"
              type="email"
              id="winnerEmail"
              value={prize.winnerEmail}
              onChange={(e) => {
                onChange({ ...prize, winnerEmail: e.target.value })
              }}
            />
          </>
        )}{" "}
        <button
          className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-300"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default function PrizesInput({ prizes, onChange, showWinner }) {
  const addPrize = (event) => {
    event.preventDefault()
    onChange([...prizes, { type: "", amount: 0, winnerEmail: "" }])
  }

  const onPrizeUpdate = (idx, newPrize) => {
    const _prizes = [...prizes]
    _prizes[idx] = newPrize
    onChange(_prizes)
  }

  const onPrizeRemove = (idx) => {
    const _prizes = [...prizes]
    _prizes.splice(idx, 1)
    onChange(_prizes)
  }

  return (
    <div className="flex flex-col ">
      {prizes.map((prize, idx) => (
        <PrizeItem
          showWinner={showWinner}
          prize={prize}
          onChange={(newPrize) => onPrizeUpdate(idx, newPrize)}
          onRemove={() => onPrizeRemove(idx)}
          key={idx}
        />
      ))}

      <button
        className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-300"
        onClick={addPrize}
      >
        Add prize
      </button>
    </div>
  )
}
