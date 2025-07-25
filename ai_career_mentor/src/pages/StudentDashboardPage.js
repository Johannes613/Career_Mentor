import React from "react";
import { useAuth } from "../contexts/AuthContext";
import StudentStatCard from "../components/student/StudentStatCard";
import SkillsChart from "../components/student/SkillsChart";
import RecommendedCourses from "../components/student/RecommendedCourses";
import ProfileCompletion from "../components/student/ProfileCompletion";
import TopCompanies from "../components/student/TopCompanies";
import FeaturedOpportunity from "../components/student/FeaturedOpportunity";
import SkillProgress from "../components/student/SkillProgress";
import { CheckCircle, Bot, Target } from "lucide-react";

const StudentDashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <h5 className="fw-bold mb-1">Welcome back, {user?.displayName || 'User'}</h5>
      <p className="text-muted mb-4">
        {user.isGuest?"Here the data displayed in all sections are mock please login to save your own data": "You've made great progress this week, keep up the excellent work"}
      </p>

      <div className="row g-4">
        <div className="col-12 col-md-4">
          <StudentStatCard
            title="AI Sessions"
            value="34h"
            Icon={Bot}
            color="secondary"
          />
        </div>
        <div className="col-12 col-md-4">
          <StudentStatCard
            title="Avg. Resume Score"
            value="82%"
            Icon={Target}
            color="secondary"
          />
        </div>
        <div className="col-12 col-md-4 ">
          <StudentStatCard
            title="Skills Verified"
            value="14"
            Icon={CheckCircle}
            color="primary"
          />
        </div>

        <div className="col-12 col-lg-8 d-flex mt-4">
          <FeaturedOpportunity />
        </div>
        <div className="col-12 col-lg-4 d-flex mt-4">
          <ProfileCompletion />
        </div>
        <div className="col-12 col-lg-7 d-flex">
          <SkillsChart />
        </div>
        <div className="col-12 col-lg-5 d-flex">
          <RecommendedCourses />
        </div>
        <div className="col-12 col-lg-7 d-flex">
          <SkillProgress />
        </div>
        <div className="col-12 col-lg-5 d-flex">
          <TopCompanies />
        </div>
      </div>
    </>
  );
};

export default StudentDashboardPage;
