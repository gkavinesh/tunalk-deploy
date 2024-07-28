import React, { useState } from 'react';
import { useMeasure } from '@react-hookz/web';
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import './footer.css';


const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70" // Ensure no shadow properties are added here
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-white"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-white p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};



const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24 w-full" id='footer'>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Link to="/"><img className="w-auto h-9 image" src={assets.tuna} alt="" /></Link>

            <p className="text-base leading-relaxed text-gray-600 mt-7 cub">Tunalk provides the finest fresh seafood, sourced daily for unmatched freshness and taste. From shrimp to fish fillets, trust Tunalk for quality and excellence in every bite.</p>

            <ul className="flex items-center space-x-3 mt-9 social">
              <li>
                <a href="https://www.facebook.com/people/Tunalk/61560281252638/" title="Facebook" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-teal-600 focus:bg-teal-600" target="_blank" rel="noopener noreferrer">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/tuna.lk?igsh=MXNtYmc4aTF1Ymdveg==" title="Instagram" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-teal-600 focus:bg-teal-600" target="_blank" rel="noopener noreferrer">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" title="Twitter" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-teal-600 focus:bg-teal-600" target="_blank" rel="noopener noreferrer">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.5 10.5 0 0 1-3.036.832A5.28 5.28 0 0 0 22.36 2.146a10.63 10.63 0 0 1-3.317 1.266A5.187 5.187 0 0 0 16.872.5a5.186 5.186 0 0 0-5.184 5.185c0 .406.046.8.13 1.183A14.678 14.678 0 0 1 1.64 1.647a5.16 5.16 0 0 0-.693 2.611 5.186 5.186 0 0 0 2.296 4.315A5.13 5.13 0 0 1 .967 8.94a5.21 5.21 0 0 0 4.157 4.083A5.267 5.267 0 0 1 3.5 13.16a5.189 5.189 0 0 0 5.3 3.876A10.47 10.47 0 0 1 0 19.546a14.53 14.53 0 0 0 7.899 2.317c9.462 0 14.634-7.846 14.634-14.634 0-.224-.006-.447-.017-.67A10.482 10.482 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </li>

            </ul>

          </div>
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Shop</p>
            <ul className="mt-6 space-y-4">
              <li>
                <a href="#about" title="" className="flex text-base text-black transition-all duration-200 hover:text-teal-600 focus:text-blue-600"> About </a>
              </li>
              <li>
                <a href="#Category" title="" className="flex text-base text-black transition-all duration-200 hover:text-teal-600 focus:text-blue-600"> Products </a>
              </li>
              <li>
                <a href="#why" title="" className="flex text-base text-black transition-all duration-200 hover:text-teal-600 focus:text-blue-600"> Why Tuna LK </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Help</p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/delivery-area" className="flex text-base text-black transition-all duration-200 hover:text-teal-600 focus:text-blue-600"> Delivery Areas </Link>
              </li>
              <li>
                <Link to="/faq" className="flex text-base text-black transition-all duration-200 hover:text-teal-600 focus:text-blue-600"> FAQ </Link>
              </li>
              <li>
                <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-teal-600 focus:text-blue-600" onClick={() => setOpen(true)}> Privacy Policy </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Accepted Payment Methods</p>

            <ul className="flex items-center space-x-3 mt-6">
              <li>
                <img src={assets.card2} alt="Visa" className="w-12 h-auto" />
              </li>
              <li>
                <img src={assets.card3} alt="MasterCard" className="w-12 h-auto" />
              </li>
              <li>
                <img src={assets.card1} alt="American Express" className="w-12 h-auto" />
              </li>
              <li>
                <img src={assets.cod} alt="Cash on Delivery" className="w-12 h-auto" />
              </li>
              <li>
                <img src={assets.bank} alt="Bank Transfer" className="w-12 h-auto" />
              </li>
            </ul>

            <button
              onClick={() => setOpen(true)}
              title=""
              className="inline-flex items-center text-base font-semibold text-gray-600 transition-all duration-200 hover:text-blue-600 focus:text-blue-600 mt-7"
            >
            </button>
          </div>

        </div>
        <hr className="mt-16 mb-10 border-gray-200" />
        <p className="text-sm text-center text-gray-600 end">© Copyright 2024, All Rights Reserved by <b>TunaLK</b> | Designed by <a href="#">12BK Pvt Ltd</a></p>
      </div>
      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="mx-auto max-w-5xl space-y-4 text-neutral-400">
          <br />
          <h2 className="text-4xl font-bold text-teal-400">
            Privacy Policy & Terms of Condition
          </h2>
          <h3 className="text-2xl font-bold text-teal-400 mt-6">Terms and Conditions</h3>
          <p>
            <strong>Introduction</strong><br />
            Welcome to TunaLK. By using our website, you agree to the following terms and conditions. Please read them carefully.
          </p>
          <p>
            <strong>Products and Services</strong><br />
            We provide high-quality seafood products. All product descriptions, prices, and availability are subject to change without notice.
          </p>
          <p>
            <strong>Orders and Payments</strong><br />
            Orders are processed once payment is confirmed. We accept various payment methods including credit/debit cards and cash on delivery.
          </p>
          <p>
            <strong>Shipping and Delivery</strong><br />
            We strive to deliver your products as quickly as possible. Delivery times may vary depending on your location.
          </p>
          <p>
            <strong>Returns and Refunds</strong><br />
            If you are not satisfied with your purchase, please contact us within 1 days for a refund or exchange. The product must be returned in its original condition.
          </p>
          <p>
            <strong>Liability</strong><br />
            TunaLK is not liable for any damages or losses resulting from the use of our website or products.
          </p>
          <p>
            <strong>Governing Law</strong><br />
            These terms are governed by the laws of Sri Lanka. Any disputes will be resolved in the courts of Sri Lanka.
          </p>
          <p>
            <strong>Changes to Terms</strong><br />
            We may update these terms from time to time. Your continued use of our website constitutes acceptance of any changes.
          </p>
          <p>
            <strong>Contact Us</strong><br />
            For any questions, please contact us at 077-529-1291.
          </p>
          <h3 className="text-2xl font-bold text-teal-400 mt-6">Privacy Policy</h3>
          <p>
            <strong>Introduction</strong><br />
            At TunaLK, we value your privacy. This policy outlines how we collect, use, and protect your personal information.
          </p>
          <p>
            <strong>Information Collection</strong><br />
            We collect information you provide directly, such as your name, email address, and payment details. We also collect information about your interactions with our website.
          </p>
          <p>
            <strong>Use of Information</strong><br />
            We use your information to process orders, communicate with you, and improve our services. We may also use your information for marketing purposes with your consent.
          </p>
          <p>
            <strong>Data Protection</strong><br />
            We implement security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>
          <p>
            <strong>Cookies</strong><br />
            Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser.
          </p>
          <p>
            <strong>Third-Party Services</strong><br />
            We may share your information with third-party service providers to perform functions on our behalf, such as payment processing and delivery.
          </p>
          <p>
            <strong>Your Rights</strong><br />
            You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
          </p>
          <p>
            <strong>Changes to Privacy Policy</strong><br />
            We may update this policy from time to time. Your continued use of our website constitutes acceptance of any changes.
          </p>
          <p>
            <strong>Contact Us</strong><br />
            If you have any questions about this policy, please contact us at 077-529-1291.
          </p>
        </div>
      </DragCloseDrawer>
    </section>
  );
};

export default Footer;


