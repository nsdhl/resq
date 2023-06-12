import User from "../models/user.model"

export const getNearestUsers = async (location: number[]) => {
  return await User.find(
    {
      location:
      {
        $near:
        {
          $geometry: { type: "Point", coordinates: location },
          $minDistance: 10,
          $maxDistance: 1000
        }
      }
    }
  ).select("-password")
}
