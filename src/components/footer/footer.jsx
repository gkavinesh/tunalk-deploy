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
            <img className="w-auto h-9 image" src={assets.tuna} alt="" />

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
                <a href="#about" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> About </a>
              </li>
              <li>
                <a href="#Category" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Products </a>
              </li>
              <li>
                <a href="#why" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Why Tuna LK </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Help</p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/delivery-area" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Delivery Areas </Link>
              </li>
              <li>
                <Link to="/faq" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> FAQ </Link>
              </li>
              <li>
                <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600" onClick={() => setOpen(true)}> Privacy Policy </a>
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
              <a href="tel:077-529-1291">Contact us now at 077-529-1291</a>
            </button>
          </div>

        </div>
        <hr className="mt-16 mb-10 border-gray-200" />
        <p className="text-sm text-center text-gray-600 end">© Copyright 2024, All Rights Reserved by <b>TunaLK</b> | Designed by <a href="#">12BK Pvt Ltd</a></p>
      </div>
      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="mx-auto max-w-5xl space-y-4 text-neutral-400">
          <br></br>
          <h2 className="text-4xl font-bold text-teal-400">
            Privacy Policy & Terms of Condition
          </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
            laboriosam quos deleniti veniam est culpa quis nihil enim suscipit
            nulla aliquid iure optio quaerat deserunt, molestias quasi facere
            aut quidem reprehenderit maiores.
          </p>
          <p>
            Laudantium corrupti neque rerum labore tempore sapiente. Quos, nobis
            dolores. Esse fuga, cupiditate rerum soluta magni numquam nemo
            aliquid voluptate similique deserunt!
          </p>
          <p>
            Rerum inventore provident laboriosam quo facilis nisi voluptatem
            quam maxime pariatur. Velit reiciendis quasi sit magni numquam quos
            itaque ratione, fugit adipisci atque est, tenetur officiis explicabo
            id molestiae aperiam? Expedita quidem inventore magni? Doloremque
            architecto mollitia, dicta, fugit minima velit explicabo sapiente
            beatae fugiat accusamus voluptatum, error voluptatem ab asperiores
            quo modi possimus.
          </p>
          <p>
            Sit laborum molestias ex quisquam molestiae cum fugiat praesentium!
            Consequatur excepturi quod nemo harum laudantium accusantium nisi
            odio?
          </p>
          <p>
            Deleniti, animi maiores officiis quos eaque neque voluptas omnis
            quia error a dolores, pariatur ad obcaecati, vitae nisi perspiciatis
            fugiat sapiente accusantium. Magnam, a nihil soluta eos vero illo ab
            sequi, dolores culpa, quia hic?
          </p>
          <p>
            Eos in saepe dignissimos tempore. Laudantium cumque eius, et
            distinctio illum magnam molestiae doloribus. Fugiat voluptatum
            necessitatibus vero eligendi quae, similique non debitis qui veniam
            praesentium rerum labore libero architecto tempore nesciunt est
            atque animi voluptatibus. Aliquam repellendus provident tempora
            sequi officia sint voluptates eaque minima suscipit, cum maiores
            quos possimus. Vero ex porro asperiores voluptas voluptatibus?
          </p>
          <p>
            Debitis eos aut ullam odit fuga. Numquam deleniti libero quas sunt?
            Exercitationem earum odio aliquam necessitatibus est accusamus
            consequuntur nisi natus dolore libero voluptatibus odit doloribus
            laudantium iure, dicta placeat molestias porro quasi amet? Sint,
            reiciendis tenetur distinctio eaque delectus, maiores, nihil
            voluptas dolorem necessitatibus consequatur aliquid?
          </p>
          <p>
            Sunt ex, cum culpa vel odio dicta expedita omnis amet debitis
            inventore necessitatibus quaerat est molestias delectus. Dolorem,
            eius? Quae, itaque ipsa incidunt nobis repellendus, sunt dolorum
            aliquam ad culpa repudiandae impedit omnis, expedita illum voluptas
            delectus similique ducimus saepe pariatur. Molestias similique quam
            dolore provident doloremque maiores autem ab blanditiis voluptatum
            dignissimos culpa sed nesciunt laboriosam, in dicta consectetur.
          </p>
          <p>
            Voluptates ea, aspernatur possimus, iusto temporibus non laudantium
            neque molestias rem tempore eligendi earum nisi dolorum asperiores
            at rerum!
          </p>
          <p>
            Eaque totam error quia, ut eius perspiciatis unde velit temporibus
            mollitia. Aperiam ad tempora aliquam est molestias commodi
            cupiditate quos impedit nostrum accusantium quo fugit eveniet
            temporibus quam cumque autem porro, id ut debitis itaque et nemo
            exercitationem voluptatibus? Aspernatur corrupti quas iusto dolores
            nemo pariatur debitis quae dolorem! Nemo, eius? Dolorem quam nemo
            magnam ratione deserunt aperiam. Voluptatum ipsa, molestias
            aspernatur quas distinctio numquam qui laboriosam id ab totam
            commodi laborum tempora error natus vitae eligendi reiciendis
            maiores ex illo? Tempore at animi earum vitae enim sunt,
            dignissimos, mollitia corrupti officia obcaecati error iure vero
            repudiandae nihil magni molestias quibusdam dolorem aperiam modi.
            Harum, fugit.
          </p>
        </div>
      </DragCloseDrawer>
    </section>
  );
};

export default Footer;


