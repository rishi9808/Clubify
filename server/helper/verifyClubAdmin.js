const verifyClubAdmin = (club , user) => {
    if (!user) {
        throw new Error("User not logged in");
    }

    const allowed = user.superAdmin || club.admins.find((id) => id === user._id)
    if (!allowed) {
        throw new Error("User is not a club admin");
    }
}

module.exports = verifyClubAdmin;