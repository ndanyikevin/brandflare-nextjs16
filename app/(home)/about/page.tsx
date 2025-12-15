import React from 'react'
import QuoteText from '@/components/QuoteText'
import Facebook from '@/components/icons/facebook'
import Twitter from '@/components/icons/twitter'
import Linkedin from '@/components/icons/linkedin'
import Instagram from '@/components/icons/instagram'

import Link from 'next/link'
import Image from 'next/image'

function AboutPage() {
  return (
    <>
      <section className="w-full bg-about h-[50vh] flex justify-center items-end">
        <div className="py-[30px] lg:py-[41px] px-[60px] lg:px-[152px] flex flex-col justify-center items-center bg-white rounded-tl-[37px] rounded-tr-[37px] gap-2.5" >
          <h1 className="text-[30px] leading-[40px] lg:text-[50px] lg:leading-[62px] font-dm capitalize text-primary-200 ">About Us</h1>
          
        </div>
      </section>

  <section className="w-full px-12 lg:px-0 pt-[100px] lg:pt-[200px] lg:max-w-[1200px] mx-auto flex items-center justify-center">
    <QuoteText text="I like an interior that defies labeling. I don't really want someone to walk into a room and know that I did it" name="BUNNY WILLIAMS"/>
  </section>



  <section className="w-full pt-[100px] lg:pt-[150px] px-12 lg:px-0 mx-auto lg:max-w-[1200px] ">
    <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-10 items-center">
      <div className="flex flex-col gap-6">
        <h2 className="text-[30px] text-center lg:text-left font-dm tracking-wide capitalize leading-8 md:leading-[62.50px] md:text-[50px] text-text-blue ">We what we do</h2>
        <p className="text-base md:text-[22px] lg:max-w-[85%] text-center lg:text-left tracking-tight font-jost text-text-gray leading-[33px]">Brandflare Woodworks specializes in crafting exquisite homes through expert construction, finishing, and interior design.
        From foundation to finish, we deliver exceptional residential solutions tailored to your vision.</p>
      </div>
      <img src="/sample/about1.png" alt="" />
    </div>
  </section>


   <section className="w-full pt-[100px] lg:pt-[150px] px-12 lg:px-0 mx-auto lg:max-w-[1200px] ">
    <div className="w-full flex flex-col-reverse lg:flex-row-reverse justify-between gap-24 items-center">
      <div className="flex flex-col gap-6">
        <h2 className="text-[30px] text-center lg:text-left font-dm tracking-wide capitalize leading-8 md:leading-[62.50px] md:text-[50px] text-text-blue ">The End Result</h2>
        <p className="text-base md:text-[22px] lg:max-w-[95%] text-center lg:text-left tracking-tight font-jost text-text-gray leading-[33px]">Experience the epitome of modern living with Brandflare Woodworks.</p>
      </div>
      <img src="/sample/about2.png" alt=""  />
    </div>
  </section>


  {/* <section className="w-full py-[100px] lg:py-[185px] mt-[173px] px-12 lg:px-0 mx-auto bg-primary-300 ">
    <div className="w-full flex flex-col gap-10 lg:max-w-[1200px] mx-auto" >
		  <h2 className="font-dm tracking-wide text-center leading-[37px] lg:leading-[62.50px] text-[30px] lg:text-[50px] w-full lg:max-w-[50%] pb-9 mx-auto">What the People Thinks About Us</h2>
      <div className="flex w-full overflow-x-scroll gap-4 flex-row no-scrollbar">
        <img src="/sample/person1.png" alt="Client 1" />
        <img src="/sample/person2.png" alt="Client 2" />
        <div className="flex flex-col gap-10 w-full justify-between py-[70px] px-7 bg-white min-w-[284px] items-center rounded-[32px]">
          <p className="flex flex-col tracking-tight leading-9 text-center">
            <span className="text-primary-200 text-lg lg:text-[25px] font-dm">Nattasha Julie</span>
            <span className="text-text-gray-200 text-base lg:text-lg font-jost"> Design, Australia</span>
					</p>
          <div className="flex gap-6">
             <Link href="/">
              <Facebook />
            </Link>
            <Link href="/">
              <Twitter />
            </Link>
            <Link href="/">
              <Linkedin />
            </Link>
            <Link href="/">
              <Instagram />
            </Link>
          </div>
          <p className="flex flex-col tracking-tight leading-9 text-center">
            <span className="text-text-gray-200 text-base lg:text-lg font-jost"> +1 (378) 400-1234</span>
            <span className="text-text-gray-200 text-base lg:text-lg font-jost"> julie@email.com</span>
					</p>
        </div>
        <img src="/sample/person3.png" alt="" />
      </div>
	  </div>
  </section> */}
    </>
  )
}


export default AboutPage