import React from "react";
import Upppernavbar from "@/app/component/informationpage/uppernavbar";
import Herosection from "./component/informationpage/herosection";
import Aboutsection from "./component/informationpage/aboutsection";
import WhyExist from "./component/informationpage/exist";
import Vision from "./component/informationpage/vision.js";
import Benifits from "./component/informationpage/benifits";
import Operations from "./component/informationpage/operations";
import TrustAndGrowth from "./component/informationpage/trustandgrowth";
import Partners from "./component/informationpage/partners";
import EnquiryForm from "./component/informationpage/enquiryForm";
import Footer from "./component/informationpage/footer";

const page = () => {
  return (
    < >
      <Upppernavbar />

      {/* HOME */}
      <section id="home">
        <Herosection />
      </section>

      {/* ABOUT */}
      <section id="about">
        <Aboutsection />
      </section>

      <div className="lg:px-[120px] md:px-[100px] sm:px-5 px-5 flex flex-col gap-8 mt-8">
        {/* WHY EXIST */}
        <section id="why-exist">
          <WhyExist />
        </section>

        {/* VISION */}
        <section id="vision">
          <Vision />
        </section>

        {/* BENEFITS */}
        <section id="benefits">
          <Benifits />
        </section>

        {/* OPERATIONS */}
        <section id="operations">
          <Operations />
        </section>

        {/* TRUST */}
        <section id="trust">
          <TrustAndGrowth />
        </section>
      </div>

      {/* PARTNERS */}
      <section id="partners">
        <Partners />
      </section>

      {/* ENQUIRY */}
      <section id="enquiry">
        <EnquiryForm />
      </section>

      <Footer />
    </>
  );
};

export default page;
