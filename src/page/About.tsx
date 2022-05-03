import React from 'react'
import Container from '../component/Container'
import Heading from '../component/Heading'

const About = () => {
  return (
    <div>
      <Container>
      <div className='mt-5'>
        <Heading>আমাদের উদ্দেশ্যঃ</Heading>
          <p className='mb-3 lg:text-lg'>আমাদের উদ্দেশ্য হলো অনলাইন মাধ্যমকে কাজে লাগিয়ে অসহায় পশু-পাখিদের সাহায্য করা।
            যে পশু পাখিগুলো রাস্তায় অ্যাকসিডেন্ট অথবা অসুখে কষ্ট পায় তাদের সাহায্য করাটাই আমাদের মুখ্য উদ্দেশ্য।
            বর্তমানে আমাদের সাইটের কাজ চলছে। আলহামদুলিল্লাহ আমাদের সাইটের প্রায় ৮০% কাজ সম্পন্ন হয়েছে।
            আমাদের সাইটটি সঠিকভাবে কাজ করছে কীনা, তা জানার জন্য আপনাদের সাহায্য দরকার। আপনারা দয়া করে আমাদের জানাবেন যদি
            সাইটে কোন ত্রুটির সম্মুখীন হোন।
          </p>

          <p className='text-lg lg:text-xl'>সাইটের নিয়মিত আপডেট পেতে আমাদের Facebook Group-এ জয়েন হয়ে যান এক্ষুনিঃ <a target='_blank' className='text-blue-600' href="https://web.facebook.com/groups/354102783367196/">আমাদের ফেসবুক গ্রুপ</a></p>
      </div>
    </Container>
    </div>
  )
}

export default About
