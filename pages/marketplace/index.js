import { useState } from "react";
import { CourseCard, CourseList } from "@components/ui/course";
import { Layout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { EthRates, Walletbar } from "@components/ui/web3";
import { useWalletInfo } from "@components/hooks/web3";
import { Breadcrumbs, Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useEthPrice } from "@components/hooks/useEthPrice";
import { MarketHeader } from "@components/ui/marketplace";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <div className="pt-4">
        <MarketHeader />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            // disabled={!canPurchaseCourse === true && false}
            Footer={() => (
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  // disabled={!canPurchaseCourse}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
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
