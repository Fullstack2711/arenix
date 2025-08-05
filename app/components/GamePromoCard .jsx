import React from "react";

const GamePromoCard = () => {
  return (
    <div className="relative flex items-center justify-between p-4 mx-46 mt-24 h-110 bg-gradient-to-r from-blue-400 to-orange-500 text-white rounded-2xl">
      {/* 3D Character Image */}
      <div className="absolute left-4 -top-20 h-110 w-120 transform hover:scale-105 transition-transform duration-300  z-20">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2ec970f4-1706-4915-9a93-41f3d9c8202c/dh3f2fv-d27cc5cd-2599-4bbb-98bc-a3d2dee84647.png/v1/fill/w_966,h_828/blood_strike_ethan_png_by_divoras_dh3f2fv-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA5NyIsInBhdGgiOiJcL2ZcLzJlYzk3MGY0LTE3MDYtNDkxNS05YTkzLTQxZjNkOWM4MjAyY1wvZGgzZjJmdi1kMjdjYzVjZC0yNTk5LTRiYmItOThiYy1hM2QyZGVlODQ2NDcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.OMiqx6PxVYldm569bGZ7_nWlkE-HdtDW6sg8bSjzOPE"
          alt="Game character"
          className="h-full w-full object-contain object-top drop-shadow-2xl filter brightness-110 contrast-110 scale-125 mt-[60px]"
          style={{
            filter: 'drop-shadow(0 35px 35px rgba(0, 0, 0, 0.5)) drop-shadow(0 55px 75px rgba(0, 0, 0, 0.4))'
          }}
        />
        {/* 3D Shadow effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-black/30 rounded-full blur-xl z-10"></div>
      </div>
      <div className="ml-auto max-w-md z-30 text-right pr-4">
        <h1 className="text-2xl lg:text-3xl font-bold mb-3">
          Остановить прокрутку,
          <br />
          Начать играть
        </h1>
        <p className="mb-4 text-sm lg:text-base">
          Создайте свой аккаунт сейчас и зарабатывайте 2,000 монеты
        </p>
        <button className="bg-black text-white py-2 px-4 text-sm lg:text-base rounded-lg hover:bg-gray-800">
          Присоединяйся сейчас
        </button>
      </div>
    </div>
  );
};

export default GamePromoCard;
