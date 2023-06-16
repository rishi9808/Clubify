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
  const eventEnded = today >= eventEnd

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
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-3/4 max-w-4xl">
          <div>
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              {eventDetails.name}
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              {eventDetails.description}
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl p-2 flex flex-col my-4 shadow-md">
            <div className="flex">
              <div className="my-2 px-4  ">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Club Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {eventDetails.club.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Event Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {eventDetails.details.type}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Registration Fee
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {eventDetails.details.registrationFee != 0
                        ? eventDetails.details.registrationFee
                        : "Free"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="my-2 px-4  ">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Registration
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {registrationStarted && !eventStarted && !eventEnded
                        ? "Opened"
                          ? !registrationStarted
                          : "Starting soon"
                        : "Closed"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {!eventEnded && eventStarted
                        ? "Active"
                        : eventEnded
                        ? "Ended"
                        : "Starting Soon"}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Result
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {eventDetails.dates.result
                        ? eventDetails.dates.result.split("T")[0]
                        : "Not declared"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div>
              {/* <button onClick={setShowPrize(true)}>View Prizes</button> */}
              {eventDetails.prizes.length > 0 && (
                <div className="flex flex-col w-full ">
                  <div className="mt-4  text-sm sm:text-lg text-gray-800 px-6">
                    Prizes
                  </div>
                  <div className="flex">
                    {eventDetails.prizes.map((prize, idx) => (
                      <div key={idx} className="my-2 px-4  ">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Type
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {prize.type}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Amount
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {prize.amount}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Winner
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {prize?.winner?.name ? prize?.winner?.name : "-"}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-1/4">
          <div className="font-medium  text-xl sm:text-3xl text-gray-800">
            Team {eventDetails.club.name}
          </div>
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            {eventEnded ? (
              <span className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                Event has ended
              </span>
            ) : eventStarted ? (
              <span className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                Event has started
              </span>
            ) : registrationStarted ? (
              isParticipant ? (
                <div>
                  <span className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                    You are already registered
                  </span>{" "}
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
              )
            ) : (
              <span className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                Registration not open yet, come back later
              </span>
            )}
            <button
              className="uppercase my-4 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
              onClick={handleViewParticipants}
            >
              Show Participants
            </button>
          </div>
          <div className="flex flex-col items-start font-medium  text-xl sm:text-3xl text-gray-800">
            <div className="mt-4 text-xl sm:text-lg text-gray-800">
              Admin Section
            </div>
            {isClubAdmin && (
              <div className="flex flex-col ">
                <button
                  className="uppercase my-4 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  onClick={handleUpdate}
                >
                  Update Details
                </button>

                <button
                  className="uppercase my-4 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  onClick={handleDelete}
                >
                  Delete Event
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default EventPage
