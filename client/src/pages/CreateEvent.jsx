import React, { useEffect, useState } from "react"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"

const createEventInputs = [
  { name: "name", type: "text", label: "Event name" },
  {
    name: "description",
    type: "text",
    label: "Description",
  },
  {
    name: "eventType",
    type: "text",
    label: "Event Type",
  },
  {
    name: "registrationFee",
    type: "number",
    label: "Registration Fee",
    defaultValue: 0,
  },
  // {
  //   name: "participationType",
  //   type: "number",
  //   label: "Participants Number",
  //   defaultValue: 1,
  // },
  {
    name: "registrationStart",
    type: "date",
    label: "Registration Start Date",
    defaultValue: new Date(),
  },
  {
    name: "start",
    type: "date",
    label: "Start Date",
  },
  {
    name: "end",
    type: "date",
    label: "End Date",
  },
  {
    name: "result",
    type: "date",
    label: "Result Date",
  },
]

const CreateEvent = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  async function registerEvent(formData) {
    const transformedData = transformFomData(formData)

    const response = await fetcher("api/event/", {
      method: "POST",
      body: JSON.stringify({ ...transformedData, club: id }),
    })

    const data = await response.json()
    console.log(data)
    if (response.status === 200) {
      alert("Successfully registered Event")
      navigate(`/event/${data._id}`)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-xl uppercase">Event Register </h1>
      <Forms inputs={createEventInputs} onSubmit={registerEvent} />
    </div>
  )
}

export default CreateEvent

/**
 * Transform create event form data into the format apis accepts
 * @param {{}} formData The form data object that you get on onSubmit of form
 * @returns An object you can pass to the api
 */
const transformFomData = ({
  name,
  description,
  start,
  end,
  registrationStart,
  result,
  type,
  isFreeEvent,
  participationType,
  prizes,
  participants,
}) => {
  return {
    name,
    description,
    details: {
      type,
      isFreeEvent,
      participationType,
    },
    dates: {
      start,
      end,
      registrationStart,
      result,
    },
    prizes: prizes || [],
    participants: participants || [],
  }
}
