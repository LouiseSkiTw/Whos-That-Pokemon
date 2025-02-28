export const getRandomNumber = () => Math.floor(Math.random() * (50 - 1 + 1)) + 1;
export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);