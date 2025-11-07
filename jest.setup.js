import '@testing-library/jest-dom';


jest.mock('next/image', () => {
  return function Image({ src, alt, ...props }) {
    // return plain img to avoid next/image's runtime checks
    return <img src={src} alt={alt} {...props} />;
  };
});