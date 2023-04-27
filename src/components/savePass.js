import myPassData from "../data/myPassData";

const savePass = (event, paymentType, numAdults, numChildren) => {
  const min = 100;
  const max = 10000;
  const newPass = {
    id: Math.floor(Math.random() * (max - min + 1)) + min,
    event,
    eventTitle: event.name,
    paymentType,
    numAdults,
    numChildren,
    status: 'active'
  };

  myPassData.push(newPass);
  return newPass;
};

export default savePass;
