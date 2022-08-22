import React from 'react';

const About = () => {
    return (
        <div className='flex items-center gap-x-4 max-w-[1200px] m-auto md:flex-row flex-col-reverse gap-y-5'>
            <div className='p-5 text-center md:w-[50%]'>
                <h3 className='mb-5 text-5xl text-secondColor'>About Us</h3>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia magni, 
                eum vel illo autem labore modi ab vitae, est doloribus aliquam ducimus. 
                Voluptates voluptatibus dolores id, cupiditate totam aliquid. Officiis.</p>
            </div>
            <div className='relative flex items-center justify-center w-2/4'>
                
                <div className='h-[300px] w-[300px] border-2 relative'>
                    <img src="https://static.wixstatic.com/media/651a17_c94820ecbe5c416597ffa8eb1fee1b73~mv2.jpg/v1/fill/w_625,h_938,al_c,q_85,usm_0.66_1.00_0.01/651a17_c94820ecbe5c416597ffa8eb1fee1b73~mv2.webp" alt="" className='absolute h-[300px] w-[300px] -top-[10%] -left-[15%] shadow-lg'/>
                </div>
            </div>
        </div>
    );
};

export default About;