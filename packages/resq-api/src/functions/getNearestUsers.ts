import User from "../models/user.model"

export const getNearestUsers = async (location: number[]) => {
  try {
    let user = await User.find(
      {
        location:
        {
          $near:
          {
            $geometry: { type: "Point", coordinates: location },
            $minDistance: 10,
            $maxDistance: 10000
          }
        }
      }
    ).select("-password")
    console.log("i should run!")

    return user;
  } catch (e) {
    console.log("ERROR", e)
  }
}
