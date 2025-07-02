import { cookies } from "next/headers";
import { axiosBaseInstance } from "../axios/config";
import { UserWithSession } from "./auth-types";

const getServerSession = async (): Promise<UserWithSession | null> => {
    try {
        const cookieHeader = (await cookies()).toString();
        console.log("Cookie header:", cookieHeader); // Debug log

        if (!cookieHeader) {
            console.log("No cookies found");
            return null;
        }
        const res = await axiosBaseInstance.get<Promise<UserWithSession>>(
            `/user/session`,
            {
                headers: {
                    Cookie: cookieHeader,
                },
            }
        );

        return res.data;
    } catch (err) {
        console.log("Error in getting session: ", err);

        return null;
    }
};

export default getServerSession;
