export const LoadingSkeleton = () => {
  return (
    <div className='min-h-screen bg-[#f5e9dd] max-w-4xl  mx-auto'>
      <div className='w-full mx-auto px-4 py-8'>
        <div className='animate-pulse space-y-4 '>
          <div className='h-4 bg-gray-400 rounded w-2/3'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded w-1/2'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded w-3/4'></div>
        </div>
        <div className='animate-pulse space-y-4 mt-12'>
          <div className='h-4 bg-gray-400 rounded w-2/3'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded w-1/2'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded w-3/4'></div>
        </div>

        <div className='animate-pulse space-y-4 mt-12'>
          <div className='h-4 bg-gray-400 rounded w-2/3'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded w-1/2'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
          <div className='h-4 bg-gray-400 rounded'></div>
        </div>
      </div>
    </div>
  );
};
