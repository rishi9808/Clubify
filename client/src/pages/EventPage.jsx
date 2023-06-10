import React, { useEffect, useState } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"
import { useLoginState } from "../state/slices/loginSlice"

const EventPage = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [eventDetails, setEventDetails] = useState(null)
  const [clubDetails, setClubDetails] = useState(null)

  const clubAdmins = clubDetails ? clubDetails.admins : []
  const { user } = useLoginState()

  const isClubAdmin = clubAdmins.includes(user?._id) || user?.superAdmin
  const clubId = eventDetails?.club._id

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
      setClubDetails(data.club)
    }
  }

  useEffect(() => {
    getEventDetails()
  }, [])

  return eventDetails ? (
    <div className="flex flex-col justify-center items-center bg-blue-100 m-2">
      <h1 className="text-xl uppercase  text-2xl m-2 p-2 ">
        {eventDetails.name}
      </h1>

      {isClubAdmin ? (
        <div>
          <button
            className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
            onClick={handleUpdate}
          >
            Update Details
          </button>

          <button
            className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
            onClick={handleDelete}
          >
            Delete Event
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div></div>
  )
}

export default EventPage
