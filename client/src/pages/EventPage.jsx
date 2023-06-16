/* eslint-disable indent */
import React, { useEffect, useState } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useLoginState } from "../state/slices/loginSlice"
import { DateTime } from "luxon"

const EventPage = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [eventDetails, setEventDetails] = useState(null)
  const [showPrize, setShowPrize] = useState(false)

  const clubAdmins = eventDetails?.club ? eventDetails?.club.admins : []
  const { user } = useLoginState()
  const isParticipant = eventDetails?.participants?.includes(user?._id)

  const isClubAdmin = clubAdmins.includes(user?._id) || user?.superAdmin
  const clubId = eventDetails?.club._id

  const today = DateTime.now()
  const eventStart = DateTime.fromJSDate(new Date(eventDetails?.dates?.start))
  const eventEnd = DateTime.fromJSDate(new Date(eventDetails?.dates?.end))

  const registrationStart = DateTime.fromJSDate(
    new Date(eventDetails?.dates?.registrationStart)
  )

  const registrationStarted = today >= registrationStart
  const eventStarted = today >= eventStart
  const eventEnded = today > eventEnd

  const handleUpdate = () => {
    navigate(`/event/${eventId}/update`)
  }

  const handleDelete = async () => {
    const response = await fetcher(`api/event/${eventId}`, {
      method: "DELETE",
    })

    if (response.status === 200) {
      alert("Successfully deleted")
    }
    navigate(`/club/${clubId}`)
  }

  const getEventDetails = async () => {
    const response = await fetcher(`api/event/${eventId}`, {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setEventDetails(data)
    }
  }

  const handleRegister = async () => {
    const response = await fetcher(`api/event/${eventId}/register`, {
      method: "POST",
    })
    if (response.status === 200) {
      alert("You have Successfully registered for the event")
      getEventDetails()
    }
  }

  const handleLeave = async (user) => {
    const response = await fetcher(`api/event/${eventId}/participants`, {
      method: "DELETE",
      body: JSON.stringify({ participant: user._id }),
    })

    if (response.status === 200) {
      alert("You have withdrawn from this event")
      getEventDetails()
    }
  }

  const handleViewParticipants = async () => {
    navigate(`/event/${eventId}/participants`)
  }

  useEffect(() => {
    getEventDetails()
  }, [])

  return (
    eventDetails && (
      <div className="min-h-screen flex w-full justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-3/4 max-w-5xl">
          <div className="font-medium text-4xl text-gray-800 pl-6">
            {eventDetails.name}
          </div>
          <div className=" rounded-xl p-2 flex mt-4 ">
            <div className=" rounded-xl px-4 flex-1 flex-col mt-4  ">
              <div className=" capitalize text-lg  text-gray-600">
                {eventDetails.description}
              </div>
              <div className="mt-2 font-medium text-xl text-gray-700 mt-2">
                <span>Date : </span>
                <span>{eventDetails.dates.start.split("T")[0]} </span>
                {eventDetails.dates.start.split("T")[0] !=
                  eventDetails.dates.end.split("T")[0] && (
                  <>
                    <span> to </span>
                    <span>{eventDetails.dates.end.split("T")[0]}</span>
                  </>
                )}
                <div className="font-medium text-gray-500 text-sm ">
                  {!eventEnded && eventStarted
                    ? "Active"
                    : eventEnded
                    ? "Ended"
                    : "Starting Soon"}
                </div>
              </div>
              <div className="flex my-2">
                <span className="text-sm mr-2 font-medium text-gray-500">
                  Result
                </span>

                <span className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {eventDetails.dates.result
                    ? eventDetails.dates.result.split("T")[0]
                    : "Not declared"}
                </span>
              </div>
              <div className="flex">
                <div>
                  <div className="mt-4 capitalize self-center text-sm  text-gray-600">
                    <span>Registration Fee : </span>
                    <span>
                      {eventDetails.details.registrationFee != 0
                        ? eventDetails.details.registrationFee
                        : "Free"}
                    </span>
                  </div>
                  <div className="capitalize self-center text-lg  text-gray-600">
                    <span>Registration : </span>
                    <span>
                      {registrationStarted && !eventEnded
                        ? "Opened"
                        : !registrationStarted && !eventStarted && eventEnded
                        ? "Starting soon"
                        : "Closed"}
                    </span>
                  </div>
                  <div className="mt-4 flex">
                    {registrationStart &&
                      !eventEnded &&
                      (isParticipant ? (
                        <div>
                          <button
                            className="uppercase rounded-lg py-2 px-4 bg-gray-500 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-500"
                            disabled
                          >
                            Registered
                          </button>
                          {/* <span className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                            Registered
                          </span>{" "} */}
                          <button
                            className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                            onClick={() => handleLeave(user)}
                          >
                            Leave
                          </button>
                        </div>
                      ) : (
                        <button
                          className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className=" rounded-xl p-2 flex my-4">
              <img
                alt="event photo"
                src="/images/event.svg"
                className="max-h-48 w-full object-cover "
              />
            </div>
          </div>
          <div className=" rounded-xl p-2 flex flex-col ">
            {/* <button onClick={setShowPrize(true)}>View Prizes</button> */}
            {eventDetails.prizes.length > 0 && (
              <div className="flex flex-col w-full ">
                <div className="  text-2xl text-gray-700 px-4">Prizes</div>
                <div className="flex flex-wrap justify-start">
                  {eventDetails.prizes.map((prize, idx) => (
                    <div
                      key={idx}
                      className=" flex-col bg-gray-50 shadow-md px-4 py-2 min-w-[250px] m-2 mt-4 rounded-xl "
                    >
                      <div className="font-medium capitalize text-xl  text-gray-600">
                        {prize.type}
                      </div>
                      <div className="font-medium  text-base  text-gray-600">
                        Rs: {prize.amount}
                      </div>
                      <div className="font-medium  text-sm text-gray-500">
                        {prize?.winner?.name
                          ? prize?.winner?.name
                          : "rishikeshkaroth@gmail.com"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-5 w-1/4 m-auto">
          <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl ">
            <div className="font-medium  text-xl sm:text-3xl text-gray-800">
              Team {eventDetails.club.name}
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500">
                Event Type{"  "}
              </span>
              <span className="capitalize mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                {eventDetails.details.type}
              </span>
            </div>

            <div className="flex flex-col mt-2">
              <button
                className="uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                onClick={handleViewParticipants}
              >
                View Participants
              </button>
              <button
                className="uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                onClick={() => navigate(`/club/${eventDetails.club._id}`)}
              >
                More Events
              </button>
            </div>
          </div>

          {isClubAdmin && (
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 mt-4 rounded-3xl ">
              <div className="text-2xl  text-gray-800">Admin Section</div>
              <div className="flex flex-col mt-2">
                <button
                  className=" uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  onClick={handleUpdate}
                >
                  Update Details
                </button>

                <button
                  className="uppercase my-2 rounded-lg py-2 px-4 bg-red-800 border-2 border-transparent text-white text-base mr-4 hover:bg-red-900"
                  onClick={handleDelete}
                >
                  Delete Event
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default EventPage
