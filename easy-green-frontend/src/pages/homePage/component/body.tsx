import SwipableTestimonials from './swipableBoxes';


const steps = [
  {
    step: "Step 1: Sign Up",
    description: "Create an account and get verified.",
  },
  {
    step: "Step 2: Apply for Loan",
    description: "Get loans with personalized terms.",
  },
  {
    step: "Step 3: Track Payments",
    description: "Stay updated on loan repayments.",
  },
  { step: "Step 4: Achieve Success", description: "Securely manage finances." },
];

const testimonials = [
  { name: "Samantha", review: "This platform helped me a lot with my loan process.", rating: 5 },
  { name: "John", review: "Managing loans has never been easier.", rating: 4 },
  { name: "Alice", review: "Achieved financial success thanks to this platform.", rating: 5 },
  { name: "Michael", review: "The loan repayment system is excellent.", rating: 4 },
  { name: "Lisa", review: "Highly recommend this to everyone.", rating: 5 },
];


const CoreFunctionalities = () => {
  return (
    <div className="py-24 w-[99vw] bg-gray-50 sm:py-32">
      <div className="max-w-2xl px-6 mx-auto lg:max-w-7xl lg:px-8">
        <h2 className="text-base font-semibold tracking-wide text-center text-green-900">
          Unlock the Benefits of Our Loan Application System
        </h2>
        <p className="mx-auto mt-2 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl">
          Core Features for Smarter Loan Management
        </p>
        <div className="grid gap-8 mt-10 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Dashboard */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="text-lg font-medium tracking-tight text-gray-900 max-lg:text-center">
                  Loan Dashboard
                </p>
                <p className="max-w-lg mt-2 text-sm text-gray-600 max-lg:text-center">
                  A comprehensive view of your loans, repayments, and transaction history.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>

          {/* Credit Analysis */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] pb-8">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="text-lg font-medium tracking-tight text-gray-900 max-lg:text-center">
                  Credit Analysis
                </p>
                <p className="max-w-lg mt-2 text-sm text-gray-600 max-lg:text-center">
                  Gain insights into your creditworthiness and potential borrowing limits.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>

          {/* Loan Application */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute bg-white rounded-lg inset-px"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] pb-8">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="text-lg font-medium tracking-tight text-gray-900 max-lg:text-center">
                  Apply for a Loan
                </p>
                <p className="max-w-lg mt-2 text-sm text-gray-600 max-lg:text-center">
                  Easily submit loan applications with automated processing and quick feedback.
                </p>
              </div>
            </div>
            <div className="absolute rounded-lg shadow pointer-events-none inset-px ring-1 ring-black/5"></div>
          </div>

          {/* Loan Repayment */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="text-lg font-medium tracking-tight text-gray-900 max-lg:text-center">
                  Manage Repayments
                </p>
                <p className="max-w-lg mt-2 text-sm text-gray-600 max-lg:text-center">
                  Track and pay your loans on time with automated reminders.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="mt-10 bg-white text-[#114411]">
      <h2 className="max-w-lg mx-auto mt-2 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl">
        How It Works
      </h2>
      <div className="w-[90%] mt-10 h-40 px-6 mx-auto overflow-x-auto">
        {/* Horizontal Scrollable Container */}
        <div className="flex gap-8 w-max"> {/* w-max to make the content wider than the container */}
          {steps.map((item, index) => (
            <div
              key={index}
              className="p-6 transition-transform transform bg-white shadow-lg hover:scale-105 rounded-xl hover:shadow-2xl w-80" // Fixed width for horizontal scroll
            >
              <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-start">
              
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{item.step}</h3>
                  <p className="mt-3 text-base text-gray-700">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




const Testimonials = () => {
  return (
<SwipableTestimonials testimonials={testimonials}/>
  );
};
const Body = () => {
    return (
      <div className="w-full">
        <CoreFunctionalities />
        <div className="">
          <HowItWorks />
        </div>
        <div className="mt-10">
          <Testimonials />
        </div>
      </div>
    );
};

export default Body;
