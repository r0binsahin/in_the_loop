export const Spinner = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='30'
      height='30'
      viewBox='0 0 60 60'
      fill='none'
    >
      <path
        d='M48.3134 45.5119C52.3307 40.7691 54.3513 34.6527 53.9499 28.4502C53.5485 22.2476 50.7565 16.4427 46.1615 12.2572C41.5664 8.07171 35.5268 5.83212 29.3138 6.00982C23.1009 6.18752 17.1991 8.76865 12.8508 13.2099C8.50256 17.6512 6.04687 23.6062 6.00066 29.8216C5.95446 36.0369 8.32133 42.0278 12.6031 46.5332C16.8849 51.0387 22.7476 53.7073 28.9572 53.9773'
        stroke='url(#spinner-gradient)'
        stroke-width='8'
        stroke-linecap='round'
        stroke-linejoin='round'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 30 30'
          to='360 30 30'
          dur='2s'
          repeatCount='indefinite'
        />
      </path>
      <defs>
        <linearGradient id='spinner-gradient' x1='0' x2='0' y1='0.3' y2='1'>
          <stop offset='0%' stop-opacity='1' stop-color='#e85d58' />
          <stop offset='100%' stop-opacity='0' stop-color='#e85d58' />
        </linearGradient>
      </defs>
    </svg>
  );
};
