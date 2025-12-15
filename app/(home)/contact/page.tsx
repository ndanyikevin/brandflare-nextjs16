"use client"

// app/contact/page.tsx
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export default function Contact() {
    const handleFormSubmit = (formData: { name: string; email: string; message: string }) => {
        console.log('Form submitted:', formData);
        // You can add your form submission logic here, e.g., sending the data to an API.
      };
  return (
    <>
      <section className="w-full bg-contact h-[50vh] flex justify-center items-end">
    <div className="py-[30px] lg:py-[41px] px-[60px] lg:px-[152px] flex flex-col justify-center items-center bg-white rounded-tl-[37px] rounded-tr-[37px] gap-2.5">
      <h1 className="text-[30px] leading-[40px] lg:text-[50px] lg:leading-[62px] font-dm capitalize text-primary-200 ">Contact Us</h1>
      
    </div>
  </section>


	<section className="lg:max-w-[1200px] flex flex-col gap-8 lg:gap-10 px-12 xl:px-0 w-full mx-auto pt-[100px] lg:pt-[200px]">
		<h2 className="text-[30px] text-center capitalize font-dm tracking-wide lg:max-w-[60%] leading-8 md:leading-[62.50px] md:text-[50px] mx-auto text-text-blue ">We love meeting new people and helping them.</h2>

  
    <div className="grid grid-cols-1 gap-[55px] pt-20 lg:grid-cols-3 place-content-center">
      <ContactInfo />
      <ContactForm/>
    </div>
	</section>
    </>
  );
}
