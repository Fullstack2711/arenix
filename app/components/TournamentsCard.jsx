"use client";
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const TournamentsCard = () => {
  return (
    <StyledWrapper>
      <div className="parent ">
        <div className="card">
          <div className="logo">
            <span className="circle circle1" />
            <span className="circle circle2" />
            <span className="circle circle3" />
            <span className="circle circle4" />
            <span className="circle circle5">
               <Image src="/logo/logo-removebg-preview.png" alt="logo" width={50} height={50} />
            </span>
          </div>
          <div className="glass" />
          <div className="content">
            <span className="title">ARENIX </span>
            <span className="text">Turnir jadvallari</span>
          </div>
          <div className="bottom">
            
             
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .parent {
    width: 100%;
    max-width: 680px;
    height: 160px;
    perspective: 1000px;
    opacity: 100;
    
    @media (min-width: 640px) {
      height: 180px;
    }
    
    @media (min-width: 1024px) {
      height: 200px;
    }
  }

  .card {
    height: 100%;
    border-radius: 30px;
    background: linear-gradient(135deg, rgb(0, 255, 214) 0%, rgb(8, 226, 96) 100%);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: rgba(5, 71, 17, 0) 40px 50px 25px -40px, rgba(5, 71, 17, 0.2) 0px 25px 25px -5px;
    
    @media (min-width: 640px) {
      border-radius: 40px;
    }
    
    @media (min-width: 1024px) {
      border-radius: 50px;
    }
  }

  .glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 6px;
    border-radius: 35px;
    border-top-right-radius: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.349) 0%, rgba(255, 255, 255, 0.815) 100%);
    /* -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px); */
    transform: translate3d(0px, 0px, 25px);
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    transition: all 0.5s ease-in-out;
    
    @media (min-width: 640px) {
      inset: 7px;
      border-radius: 45px;
    }
    
    @media (min-width: 1024px) {
      inset: 8px;
      border-radius: 55px;
    }
  }

  .content {
    padding: 60px 20px 0px 20px;
    transform: translate3d(0, 0, 26px);
    
    @media (min-width: 640px) {
      padding: 80px 40px 0px 25px;
    }
    
    @media (min-width: 1024px) {
      padding: 100px 60px 0px 30px;
    }
  }

  .content .title {
    display: block;
    color: #00894d;
    font-weight: 900;
    font-size: 16px;
    
    @media (min-width: 640px) {
      font-size: 18px;
    }
    
    @media (min-width: 1024px) {
      font-size: 20px;
    }
  }

  .content .text {
    display: block;
    color: rgba(0, 137, 78, 0.7647058824);
    font-size: 12px;
    margin-top: 15px;
    
    @media (min-width: 640px) {
      font-size: 13px;
      margin-top: 18px;
    }
    
    @media (min-width: 1024px) {
      font-size: 15px;
      margin-top: 20px;
    }
  }

  .bottom {
    padding: 10px 12px;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translate3d(0, 0, 26px);
  }

  .bottom .view-more {
    display: flex;
    align-items: center;
    width: 40%;
    justify-content: flex-end;
    transition: all 0.2s ease-in-out;
  }

  .bottom .view-more:hover {
    transform: translate3d(0, 0, 10px);
  }

  .bottom .view-more .view-more-button {
    background: none;
    border: none;
    color: #00c37b;
    font-weight: bolder;
    font-size: 12px;
  }

  .bottom .view-more .svg {
    fill: none;
    stroke: #00c37b;
    stroke-width: 3px;
    max-height: 15px;
  }

  .bottom .social-buttons-container {
    display: flex;
    gap: 10px;
    transform-style: preserve-3d;
  }

  .bottom .social-buttons-container .social-button {
    width: 30px;
    aspect-ratio: 1;
    padding: 5px;
    background: rgb(255, 255, 255);
    border-radius: 50%;
    border: none;
    display: grid;
    place-content: center;
    box-shadow: rgba(5, 71, 17, 0.5) 0px 7px 5px -5px;
  }

  .bottom .social-buttons-container .social-button:first-child {
    transition: transform 0.2s ease-in-out 0.4s, box-shadow 0.2s ease-in-out 0.4s;
  }

  .bottom .social-buttons-container .social-button:nth-child(2) {
    transition: transform 0.2s ease-in-out 0.6s, box-shadow 0.2s ease-in-out 0.6s;
  }

  .bottom .social-buttons-container .social-button:nth-child(3) {
    transition: transform 0.2s ease-in-out 0.8s, box-shadow 0.2s ease-in-out 0.8s;
  }

  .bottom .social-buttons-container .social-button .svg {
    width: 15px;
    fill: #00894d;
  }

  .bottom .social-buttons-container .social-button:hover {
    background: black;
  }

  .bottom .social-buttons-container .social-button:hover .svg {
    fill: white;
  }

  .bottom .social-buttons-container .social-button:active {
    background: rgb(255, 234, 0);
  }

  .bottom .social-buttons-container .social-button:active .svg {
    fill: black;
  }

  .logo {
    position: absolute;
    right: 0;
    top: 0;
    transform-style: preserve-3d;
  }

  .logo .circle {
    display: block;
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 0;
    right: 0;
    box-shadow: rgba(100, 100, 111, 0.2) -10px 10px 20px 0px;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background: rgba(0, 249, 203, 0.2);
    transition: all 0.5s ease-in-out;
  }

  .logo .circle1 {
    width: 120px;
    transform: translate3d(0, 0, 20px);
    top: 8px;
    right: 8px;
    
    @media (min-width: 640px) {
      width: 140px;
    }
    
    @media (min-width: 1024px) {
      width: 170px;
    }
  }

  .logo .circle2 {
    width: 100px;
    transform: translate3d(0, 0, 40px);
    top: 10px;
    right: 10px;
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    transition-delay: 0.4s;
    
    @media (min-width: 640px) {
      width: 120px;
    }
    
    @media (min-width: 1024px) {
      width: 140px;
    }
  }

  .logo .circle3 {
    width: 80px;
    transform: translate3d(0, 0, 60px);
    top: 17px;
    right: 17px;
    transition-delay: 0.8s;
    
    @media (min-width: 640px) {
      width: 95px;
    }
    
    @media (min-width: 1024px) {
      width: 110px;
    }
  }

  .logo .circle4 {
    width: 60px;
    transform: translate3d(0, 0, 80px);
    top: 23px;
    right: 23px;
    transition-delay: 1.2s;
    
    @media (min-width: 640px) {
      width: 70px;
    }
    
    @media (min-width: 1024px) {
      width: 80px;
    }
  }

  .logo .circle5 {
    width: 40px;
    transform: translate3d(0, 0, 100px);
    top: 30px;
    right: 30px;
    display: grid;
    place-content: center;
    transition-delay: 1.6s;
    
    @media (min-width: 640px) {
      width: 45px;
    }
    
    @media (min-width: 1024px) {
      width: 50px;
    }
  }

  .logo .circle5 .svg {
    width: 20px;
    fill: white;
  }

  .parent:hover .card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow: rgba(5, 71, 17, 0.3) 30px 50px 25px -40px, rgba(5, 71, 17, 0.1) 0px 25px 30px 0px;
  }

  .parent:hover .card .bottom .social-buttons-container .social-button {
    transform: translate3d(0, 0, 50px);
    box-shadow: rgba(5, 71, 17, 0.2) -5px 20px 10px 0px;
  }

  .parent:hover .card .logo .circle2 {
    transform: translate3d(0, 0, 60px);
  }

  .parent:hover .card .logo .circle3 {
    transform: translate3d(0, 0, 80px);
  }

  .parent:hover .card .logo .circle4 {
    transform: translate3d(0, 0, 100px);
  }

  .parent:hover .card .logo .circle5 {
    transform: translate3d(0, 0, 120px);
  }`;

export default TournamentsCard;
