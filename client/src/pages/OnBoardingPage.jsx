// import React, { useState } from "react";
// import { RefreshCw, MapPin } from "lucide-react";

// function OnboardingPage() {
//   const [avatar, setAvatar] = useState(
//     "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
//   );

//   const generateAvatar = () => {
//     const seed = Math.random().toString(36).substring(7);
//     setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
//   };

  
//   const handleSubmit = (e) =>{
//     e.preventDefault();
//     onboardingMutation(formState);
//   };


//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg p-8">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Complete your Profile
//         </h1>

//         {/* Avatar */}
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={avatar}
//             alt="avatar"
//             className="w-28 h-28 rounded-full border shadow-sm"
//           />
//           <button
//             type="button"
//             onClick={generateAvatar}
//             className="mt-3 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Generate Random Avatar
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm  text-white font-bold">
//               Full Name
//             </label>
//             <input
//               type="text"
//               placeholder="John Doe"
//               className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm  text-white font-bold">Bio</label>
//             <textarea
//               placeholder="Tell us something about yourself..."
//               rows={3}
//               className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             ></textarea>
//           </div>

//           {/* Language fields side by side */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm  text-white font-bold">
//                 Native Language
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Hindi"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm  text-white font-bold">
//                 Learning Language
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. English"
//                 className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm  text-white font-bold">
//               Location
//             </label>
//             <div className="flex items-center gap-2 mt-1">
//               <MapPin className="text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Enter your city"
//                 className="flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition"
//           >
//             Complete Onboarding
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default OnboardingPage;



import { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import { CameraIcon, Loader, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast
import { LANGUAGES } from '../constants';

function OnBoardingPage() {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile onboarded successfully');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to complete onboarding');
    },
  });

  const handleRandomAvatar = () => {
    const inx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${inx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success('Random Profile picture Generated!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  return (
    <div className='flex min-h-screen max-w-[calc(100vw-20px)] items-center justify-center p-4 bg-black overflow-x-hidden'>
      <div className=' bg-black  p-8 rounded-lg shadow-lg'>
        <div className='flex flex-col items-center mb-6 text-white'>
          <div className='flex items-center gap-2 mb-4 text-blue-600'>
            <ShipWheelIcon size={32} />
            <h1 className='text-3xl font-bold text-gray-400'>Complete your Profile</h1>
          </div>
          <p className='text-white text-center'>
            Just a few more steps to start your language journey.
          </p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Profile Picture Section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200'>
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt='profile preview'
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center bg-gray-200 text-gray-500'>
                  <CameraIcon size={48} />
                </div>
              )}
            </div>
            {/* Generate Random Avatar Button */}
            <button
              type='button'
              onClick={handleRandomAvatar}
              className='flex items-center gap-2 text-sm text-white hover:text-blue-500  transition-colors'
            >
              <ShuffleIcon size={16} />
              <span>Generate Random Avatar</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Full Name */}
            <div>
              <label htmlFor='fullName' className='block text-sm text-white font-bold'>
                Full Name
              </label>
              <input
                id='fullName'
                type='text'
                name='fullName'
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                placeholder='John Doe'
                className='mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            {/* Bio */}
            <div className='col-span-1 md:col-span-2'>
              <label htmlFor='bio' className='block text-sm  text-white font-bold'>
                Bio
              </label>
              <textarea
                id='bio'
                name='bio'
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                placeholder='Tell us something about yourself...'
                rows={3}
                className='mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            {/* Native Language */}
            <div>
              <label htmlFor='nativeLanguage' className='block text-sm  text-white font-bold'>
                Native Language
              </label>
              <select
                id='nativeLanguage'
                name='nativeLanguage'
                value={formState.nativeLanguage}
                onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                className='mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-black'
              >
                <option value=''>Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Learning Language */}
            <div>
              <label htmlFor='learningLanguage' className='block text-sm  text-white font-bold'>
                Learning Language
              </label>
              <select
                id='learningLanguage'
                name='learningLanguage'
                value={formState.learningLanguage}
                onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                className='mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-black'
              >
                <option value=''>Select language you're learning</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className='col-span-1 md:col-span-2'>
              <label htmlFor='location' className='block text-sm  text-white font-bold'>
                Location
              </label>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-500 bg-black text-gray-5 sm:text-sm'>
                  <MapPinIcon size={16} />
                </span>
                <input
                  id='location'
                  type='text'
                  name='location'
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  placeholder='e.g., New York, USA'
                  className='flex-1 block w-full rounded-none rounded-r-md px-3 py-2 border border-gray-500 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              disabled={isPending}
              className='w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors'
            >
              {isPending ? (
                <>
                  <LoaderIcon className='animate-spin mr-2' size={18} />
                  Onboarding...
                </>
              ) : (
                <>
                  <ShipWheelIcon className='mr-2' size={18} />
                  Complete Onboarding
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OnBoardingPage;