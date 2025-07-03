import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { dummyInterviews } from "@/constants";
import InterViewCard from "@/components/InterViewCard";
import { getCurrentUser} from "@/lib/actions/auth.action";
import { getInterviewByUserId,getLatestInterviews } from "@/lib/actions/general.action";

export default async function HomePage() {

const user = await getCurrentUser();

const [userInterviews, latestInterviews] = await Promise.all([
  await getInterviewByUserId(user?.id!),
  await getLatestInterviews({ userId: user?.id! })
]);

//@ts-ignore
const hasPastInterviews = userInterviews?.length > 0;
//@ts-ignore
const hasUpcomingInterviews = latestInterviews?.length > 0;



  return (
   <>
   <section  className="card-cta">
<div className="flex flex-col gap-6 max-w-lg">
<h2>
Get Interview ready with AI powered Practice & Feedback
</h2>
<p className="text-lg">
Practice on real interview questions and get instant feedback
</p>

<Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
</Button>

</div>

<Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden"/>

   </section>

   <section className="flex flex-col gap-6 mt-8"> 
   <h2>Your Interviews</h2>


   <div className="interviews-section">
 
{
  hasPastInterviews ? (
    userInterviews?.map((interview) => (
      <InterViewCard {...interview} key={interview.id} />
    ))
  ) : (
    <p>You haven't taken any interviews yet</p>
  )
}
   </div>
   </section>

   <section className="flex flex-col gap-6 mt-8">

<h2>
  Take an Interview 
</h2>

<div className="interviews-section">
{hasUpcomingInterviews ? (
  latestInterviews?.map((interview) => (
    <InterViewCard {...interview} key={interview.id} />
  ))
) : (
  <p>There are no new interviews available</p>
)}
</div>


   </section>

   </>
  );
}
