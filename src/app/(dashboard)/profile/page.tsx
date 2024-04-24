import { fetchUserTokensById } from "@/utils/actions/token-actions";
import { UserProfile, auth } from "@clerk/nextjs";

async function ProfilePage() {
    const { userId } = auth();
    let currentTokens;

    if (userId) currentTokens = await fetchUserTokensById(userId);

    return (
        <div>
            <h2 className="mb-8 ml-8 text-xl font-extrabold">
                Token Amount: {currentTokens}
            </h2>
            <UserProfile />
        </div>
    )
}

export default ProfilePage;