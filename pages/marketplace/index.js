import { CourseCard, CourseList } from "@components/ui/course";
import { Layout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { useWeb3 } from "@components/providers";
import { Walletbar } from "@components/ui/web3";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useNetwork } from "@components/hooks/web3/useNetwork";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <div className="py-4">
      <Walletbar
        address={account.data}
        network={{
          data: network.data,
          target: network.target,
          isSuported: network.isSuported,
          isLoading: network.isLoading,
        }}
      />
      <CourseList courses={courses}>
        {(course) => <CourseCard course={course} key={course.id} />}
      </CourseList>
    </div>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = Layout;
