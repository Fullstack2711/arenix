import React from "react";

const GamePromoCard = () => {
  return (
    <div>
      {/* Game Promo Title */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-12 mt-24 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
          Maxsus Taklif
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed opacity-90">
          O'yin hisobingizni yarating va sovg'alar oling
        </p>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 lg:p-4 mx-4 sm:mx-8 lg:mx-46 mt-8 sm:mt-16 lg:mt-24 h-auto min-h-[300px] sm:min-h-[400px] lg:h-110 bg-gradient-to-r from-blue-400 to-orange-500 text-white rounded-2xl ">
      {/* 3D Character Image */}
      <div className="relative lg:absolute lg:left-4 lg:-top-20 h-48 w-48 sm:h-64 sm:w-64 lg:h-110 lg:w-120 z-20 flex-shrink-0 mb-6 lg:mb-0">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2ec970f4-1706-4915-9a93-41f3d9c8202c/dh3f2fv-d27cc5cd-2599-4bbb-98bc-a3d2dee84647.png/v1/fill/w_966,h_828/blood_strike_ethan_png_by_divoras_dh3f2fv-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA5NyIsInBhdGgiOiJcL2ZcLzJlYzk3MGY0LTE3MDYtNDkxNS05YTkzLTQxZjNkOWM4MjAyY1wvZGgzZjJmdi1kMjdjYzVjZC0yNTk5LTRiYmItOThiYy1hM2QyZGVlODQ2NDcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.OMiqx6PxVYldm569bGZ7_nWlkE-HdtDW6sg8bSjzOPE"
          alt="Game character"
          className="h-full w-full object-contain object-top drop-shadow-2xl filter brightness-110 contrast-110 scale-110 sm:scale-125 lg:scale-125 lg:mt-[60px]"
          style={{
            filter: 'drop-shadow(0 35px 35px rgba(0, 0, 0, 0.5)) drop-shadow(0 55px 75px rgba(0, 0, 0, 0.4))'
          }}
        />
        {/* 3D Shadow effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 sm:w-40 sm:h-10 bg-black/30 rounded-full blur-xl z-10"></div>
      </div>
      <div className="w-full lg:ml-auto lg:max-w-md z-30 text-center lg:text-right lg:pr-4 px-4 lg:px-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 lg:mb-3">
          Skrollni to'xtat,
          <br />
          O'ynashni boshlang
        </h1>
        <p className="mb-4 lg:mb-4 text-sm sm:text-base lg:text-base">
          Hisobingizni hoziroq yarating va 2,000 tanga ishlab oling
        </p>
        <button className="bg-black text-white py-2 px-4 sm:py-3 sm:px-6 lg:py-2 lg:px-4 text-sm sm:text-base lg:text-base rounded-lg hover:bg-gray-800 transition-colors duration-200">
          Hoziroq qo'shiling
        </button>
      </div>
    </div>
    </div>
  );
};

export default GamePromoCard;
