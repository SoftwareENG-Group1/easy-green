import imgPlaceholder from '../../../assets/images/placeholder.png'


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
  {
    name: "Samantha",
    review: "This platform helped me a lot with my loan process.",
    rating: 5,
  },
  { name: "John", review: "Managing loans has never been easier.", rating: 4 },
  {
    name: "Alice",
    review: "Achieved financial success thanks to this platform.",
    rating: 5,
  },
];

const CoreFunctionalities = () => {
  return (
    <div className="py-24 w-[99vw] bg-white sm:py-32">
      <div className="max-w-2xl px-6 mx-auto lg:max-w-7xl lg:px-8">
        <h2 className="font-semibold text-center text-green-800 text-base/7">Explore the features we offer</h2>
        <p className="max-w-lg mx-auto mt-2 text-4xl font-semibold tracking-tight text-center text-balance text-gray-950 sm:text-5xl">
        Core Functionalities
        </p>
        <div className="grid gap-8 mt-10 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                Dashboard
                </p>
                <p className="max-w-lg mt-2 text-gray-600 text-sm/6 max-lg:text-center">
                Track your loan performance.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="object-cover object-top size-full"
                    src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Check Credit Score</p>
                <p className="max-w-lg mt-2 text-gray-600 text-sm/6 max-lg:text-center">
                Simple credit score tracking.
                </p>
              </div>
              <div className="flex items-center justify-center flex-1 px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute bg-white rounded-lg inset-px"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Apply for Loan</p>
                <p className="max-w-lg mt-2 text-gray-600 text-sm/6 max-lg:text-center">
                Quick and easy loan applications.
                </p>
              </div>
              <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                <img
                  className="h-[min(152px,40cqw)] object-cover"
                  src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                  alt=""
                />
              </div>
            </div>
            <div className="absolute rounded-lg shadow pointer-events-none inset-px ring-1 ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                Loan Repayment
                </p>
                <p className="max-w-lg mt-2 text-gray-600 text-sm/6 max-lg:text-center">
                Manage loan payments easily.
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute bottom-0 right-0 overflow-hidden bg-gray-900 shadow-2xl left-10 top-10 rounded-tl-xl">
                  <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div className="flex -mb-px font-medium text-gray-400 text-sm/6">
                      <div className="px-4 py-2 text-white border-b border-r border-b-white/20 border-r-white/10 bg-white/5">
                        NotificationSetting.jsx
                      </div>
                      <div className="px-4 py-2 border-r border-gray-600/10">App.jsx</div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-14">{/* Your code example */}</div>
                </div>
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
    <section className="py-8 w-[99vw] bg-white ">
      <h2 className="mb-4 text-2xl font-bold text-center">How It Works</h2>
      <div className="grid grid-cols-1 gap-6 px-6 mx-auto sm:grid-cols-2">
        {steps.map((item, index) => (
          <div
            key={index}
            className="p-4 transition rounded shadow-md hover:shadow-lg"
          >
            <div className='flex items-center gap-4'>
            <img src={imgPlaceholder} className='h-20'/>
            <span>
            <h3 className="text-lg font-semibold">{item.step}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
            </span>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-8 w-[99vw] bg-white ">
      <h2 className="mb-4 text-2xl font-bold text-center">Testimonials</h2>
      <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="p-4 transition bg-white rounded shadow-md hover:shadow-lg"
          >
            <p className="italic">"{item.review}"</p>
            <p className="mt-2 font-bold">- {item.name}</p>
            <div className="flex items-center text-yellow-500">
              {[...Array(item.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
const Body = () => {
    return (
      <div className="w-[99vw] container">
        <CoreFunctionalities />
        <div className="mt-10">
          <HowItWorks />
        </div>
        <div className="mt-10">
          <Testimonials />
        </div>
      </div>
    );
};

export default Body;
