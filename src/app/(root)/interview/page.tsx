import Agent from '@/components/agent';
import { getCurrentUser } from '@/lib/actions/auth.action';

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user.name}
        userId={user?.id}
        profileImage={''}
        type='generate'
      />
    </>
  );
};

export default Page;
