import { fetchOrGenerateTokens } from '@/utils/actions/token-actions';
import { UserButton, auth, currentUser } from '@clerk/nextjs';

async function MemberProfile() {
    const user = await currentUser();
    const { userId } = auth();

    if (userId) {
        const tokens = await fetchOrGenerateTokens(userId);
    }

    return (
        <div className='px-4 flex items-center gap-2'>
            <UserButton afterSignOutUrl='/' />
            <p>{user?.emailAddresses[0].emailAddress}</p>
        </div>
    );
}

export default MemberProfile