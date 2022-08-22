import React from 'react';

const Footer = () => {
    return (
        <div className='py-12 bg-secondColor'>
            <div className='flex items-center flex-col justify-center w-full mx-auto md:max-w-[1000px]'>
                <div className='flex items-center mb-10 gap-x-5'>
                    <img className="w-10 h-10" src="/Img/logo.png" alt="" />
                    <h3 className='text-xl'>AN_HOMEMADE</h3>
                </div>
                <div className='flex items-center justify-center mb-5 gap-x-3'>
                    <img className='w-5 h-5' src="https://static.wixstatic.com/media/4057345bcf57474b96976284050c00df.png/v1/fill/w_27,h_27,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/4057345bcf57474b96976284050c00df.png" alt="" />
                    <img className='w-5 h-5' src="https://static.wixstatic.com/media/45bce1d726f64f1999c49feae57f6298.png/v1/fill/w_27,h_27,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/45bce1d726f64f1999c49feae57f6298.png" alt="" />
                    <img className='w-5 h-5' src="https://static.wixstatic.com/media/e1aa082f7c0747168d9cf43e77046142.png/v1/fill/w_27,h_27,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e1aa082f7c0747168d9cf43e77046142.png" alt="" />
                </div>
                <div className='text-center max-w-[550px]'>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium suscipit,
                     tempore architecto inventore reiciendis laboriosam maxime esse doloribus exercitationem iusto, 
                    mollitia repellat atque. Iure laborum reiciendis veritatis ducimus doloremque eum!</p>
                </div>
            </div>
        </div>
        
    );
};

export default Footer;