import Users from "../models/Users";
import appAssert from "../utils/appAssert";
import catchErrorsAsynchronously from "../utils/catchErrorsAsynchonously";

const userHandler = catchErrorsAsynchronously(
    async (req, res) => {
        // get the user from the database, assume it's already verified and all that
        const user = await Users.findById(req.userId);
        appAssert(user, 404, "User not found.");
        return res.status(200).json(user.omitPassword());
    }
)

export default userHandler;