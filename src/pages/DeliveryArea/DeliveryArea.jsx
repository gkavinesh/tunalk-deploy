import { TruckIcon, MapIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { assets } from '../../assets/assets'

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-teal-400">Delivery Areas</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">Delivering to Your Doorstep</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                We are committed to providing timely and efficient delivery services to our customers. Here are some of the areas in Colombo where we deliver.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Map showing delivery areas in Colombo"
            src={assets.map}
            className=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                We deliver to various parts of Colombo, ensuring that you get your products fresh and on time. Here are some of the areas we cover:
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 1 - Fort</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 2 - Slave Island</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 3 - Kollupitiya</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 4 - Bambalapitiya</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 5 - Havelock Town</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 6 - Wellawatte</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 7 - Cinnamon Gardens</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 8 - Borella</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 9 - Dematagoda</strong>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-400" />
                  <span>
                    <strong className="font-semibold text-gray-900">Colombo 10 - Maradana</strong>
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Whether you are in the heart of Colombo or in the surrounding areas, we have got you covered. Our delivery network is designed to ensure that your orders reach you promptly and in perfect condition.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-teal-400">Efficient and Reliable Delivery</h2>
              <p className="mt-6">
                Our delivery system is streamlined to ensure efficiency and reliability. From the moment you place your order to the time it reaches your doorstep, we handle every step with the utmost care. Experience hassle-free delivery with us.
              </p>
              <p className="mt-6">
                For any queries or support, feel free to reach out to our customer service team. We are here to help you with any questions you might have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

