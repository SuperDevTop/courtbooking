const imageUrlFromPlayerName = (name) => {
  if (name === "Juan Manuel Cerundolo") {
    return "/images/players/Juan-Manuel_Cerundolo.jpg";
  } else {
    const lastname = name.split(" ");
    return "/images/players/" + lastname[lastname.length - 1] + ".jpg";
  }
};
export default imageUrlFromPlayerName;

export const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');

