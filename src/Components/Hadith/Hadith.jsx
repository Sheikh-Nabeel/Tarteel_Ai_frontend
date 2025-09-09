import React from "react";
import { FiBook, FiBookOpen, FiHeart, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";


const Hadith = () => {
  const hadithCollections = [
    {
      title: "Sahih Bukhari",
      description: "The most authentic collection of Hadith",
      count: "7,563",
      icon: FiBook,
      color: "text-[#25D162] bg-[#25D162]/10 border-[#25D162]",
    },
    {
      title: "Sahih Muslim",
      description: "Second most authentic collection of Hadith",
      count: "7,190",
      icon: FiBookOpen,
      color: "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]",
    },
    {
      title: "Sunan Abu Dawood",
      description: "Collection focusing on legal matters",
      count: "5,274",
      icon: FiHeart,
      color: "text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]",
    },
    {
      title: "Jami at-Tirmidhi",
      description: "Collection with detailed commentary",
      count: "3,956",
      icon: FiStar,
      color: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]",
    },
  ];

  return (
    <div className="min-h-screen mt-4 pb-20 px-4 bg-light-bg dark:bg-dark-bg transition-colors">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl p-8 mb-8 shadow-md bg-gradient-to-b from-[#25d162] to-[#1d1d1d] dark:from-[#1d1d1d] dark:to-[#25d162] transition-colors text-center"
        >
          <h1 className="text-3xl  mb-3 text-white tracking-wide drop-shadow-md">
            📚 <span className="text-4xl font-bold">Hadith Collections</span>
          </h1>
          <p className="text-gray-100 text-sm max-w-sm mx-auto">
            Explore authentic sayings and teachings of Prophet Muhammad (PBUH)
          </p>
        </motion.div>

        {/* Hadith Collections Grid */}
        <div className="grid grid-cols-1 gap-6">
          {hadithCollections.map((collection, index) => {
            const IconComponent = collection.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.04 }}
                key={index}
                className={`group rounded-xl p-6 shadow-sm hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 cursor-pointer border-l-4 ${collection.color} bg-white dark:bg-custom-black`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                      collection.color.split(" ")[1]
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      size={26}
                      className={`${
                        collection.color.split(" ")[0]
                      } drop-shadow-sm`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {collection.count} Hadiths
                      </span>
                      <button className="px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md bg-primary text-white hover:bg-green-600">
                        Read →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hadith;
